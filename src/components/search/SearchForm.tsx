'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Calendar, MapPin, Users, Search, Loader2 } from 'lucide-react'
import { liteAPI } from '@/lib/lite-api'
import { useRouter } from 'next/navigation'

interface SearchFormProps {
  className?: string
  variant?: 'default' | 'compact'
}

interface DestinationSuggestion {
  name: string
  type: 'city' | 'country' | 'region' | 'airport'
  country: string
  coordinates?: {
    latitude: number
    longitude: number
  }
}

const SearchForm: React.FC<SearchFormProps> = ({ 
  className = '', 
  variant = 'default' 
}) => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    destination: '',
    checkinDate: '',
    checkoutDate: '',
    adults: 2,
    children: 0,
    rooms: 1
  })
  
  const [suggestions, setSuggestions] = useState<DestinationSuggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false)

  // Set default dates (today + 1 day for checkin, today + 2 days for checkout)
  useEffect(() => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    const dayAfter = new Date(today)
    dayAfter.setDate(dayAfter.getDate() + 2)

    setFormData(prev => ({
      ...prev,
      checkinDate: tomorrow.toISOString().split('T')[0],
      checkoutDate: dayAfter.toISOString().split('T')[0]
    }))
  }, [])

  // Debounced destination search
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (formData.destination.length >= 2) {
        setIsLoadingSuggestions(true)
        try {
          const response = await liteAPI.searchDestinations(formData.destination, 8)
          setSuggestions(response.suggestions)
          setShowSuggestions(true)
        } catch (error) {
          console.error('Error fetching destination suggestions:', error)
          setSuggestions([])
        } finally {
          setIsLoadingSuggestions(false)
        }
      } else {
        setSuggestions([])
        setShowSuggestions(false)
      }
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [formData.destination])

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleDestinationSelect = (suggestion: DestinationSuggestion) => {
    setFormData(prev => ({ ...prev, destination: suggestion.name }))
    setShowSuggestions(false)
    setSuggestions([])
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.destination || !formData.checkinDate || !formData.checkoutDate) {
      alert('Please fill in all required fields')
      return
    }

    setIsSearching(true)
    
    try {
      // Create search parameters
      const searchParams = new URLSearchParams({
        destination: formData.destination,
        checkin: formData.checkinDate,
        checkout: formData.checkoutDate,
        adults: formData.adults.toString(),
        children: formData.children.toString(),
        rooms: formData.rooms.toString()
      })

      // Navigate to search results page
      router.push(`/search?${searchParams.toString()}`)
    } catch (error) {
      console.error('Search error:', error)
      alert('An error occurred while searching. Please try again.')
    } finally {
      setIsSearching(false)
    }
  }

  const incrementGuests = (field: 'adults' | 'children' | 'rooms') => {
    const maxValues = { adults: 8, children: 6, rooms: 4 }
    setFormData(prev => ({
      ...prev,
      [field]: Math.min(prev[field], maxValues[field] - 1) + 1
    }))
  }

  const decrementGuests = (field: 'adults' | 'children' | 'rooms') => {
    const minValues = { adults: 1, children: 0, rooms: 1 }
    setFormData(prev => ({
      ...prev,
      [field]: Math.max(prev[field], minValues[field] + 1) - 1
    }))
  }

  if (variant === 'compact') {
    return (
      <Card className={`p-6 bg-gradient-to-r from-white via-brand-50/50 to-accent-sky/20 backdrop-blur-lg shadow-luxury border-2 border-white/40 ${className}`}>
        <form onSubmit={handleSearch} className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-accent-coral h-5 w-5 z-10" />
              <Input
                type="text"
                placeholder="Where are you going?"
                value={formData.destination}
                onChange={(e) => handleInputChange('destination', e.target.value)}
                className="w-full pl-12 h-12 border-2 border-brand-200 focus:border-accent-coral focus:ring-accent-coral/20 rounded-xl bg-white/80 backdrop-blur-sm font-medium text-lg"
              />
              {isLoadingSuggestions && (
                <Loader2 className="absolute right-4 top-1/2 transform -translate-y-1/2 text-accent-coral h-5 w-5 animate-spin" />
              )}
            </div>
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg border-2 border-brand-200 rounded-xl shadow-luxury z-50 mt-2 overflow-hidden">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    type="button"
                    className="w-full text-left px-4 py-3 hover:bg-gradient-to-r hover:from-brand-50 hover:to-accent-sky/10 border-b border-brand-100 last:border-b-0 transition-all duration-200 group"
                    onClick={() => handleDestinationSelect(suggestion)}
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-accent-coral to-accent-rose rounded-full flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                        <MapPin className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <span className="font-medium text-travel-700 group-hover:text-accent-coral transition-colors">{suggestion.name}, {suggestion.country}</span>
                        <div className="text-xs text-travel-500">{suggestion.type}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent-sky h-4 w-4 z-10" />
              <Input
                type="date"
                value={formData.checkinDate}
                onChange={(e) => handleInputChange('checkinDate', e.target.value)}
                className="w-36 pl-10 h-12 border-2 border-brand-200 focus:border-accent-sky focus:ring-accent-sky/20 rounded-xl bg-white/80 backdrop-blur-sm font-medium"
              />
            </div>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent-violet h-4 w-4 z-10" />
              <Input
                type="date"
                value={formData.checkoutDate}
                onChange={(e) => handleInputChange('checkoutDate', e.target.value)}
                className="w-36 pl-10 h-12 border-2 border-brand-200 focus:border-accent-violet focus:ring-accent-violet/20 rounded-xl bg-white/80 backdrop-blur-sm font-medium"
              />
            </div>
          </div>
          <Button 
            type="submit" 
            disabled={isSearching} 
            className="px-8 h-12 bg-gradient-to-r from-accent-coral via-accent-rose to-accent-violet hover:from-accent-rose hover:via-accent-violet hover:to-accent-coral shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-xl font-bold"
          >
            {isSearching ? (
              <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Searching...</>
            ) : (
              <><Search className="mr-2 h-5 w-5" />Search Hotels</>
            )}
          </Button>
        </form>
      </Card>
    )
  }

  return (
    <Card className={`p-8 bg-gradient-to-br from-white via-brand-50/30 to-accent-sky/20 backdrop-blur-lg shadow-luxury border-2 border-white/40 ${className}`}>
      {/* Search Form Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-display font-bold bg-gradient-to-r from-brand-600 via-accent-coral to-accent-violet bg-clip-text text-transparent mb-2">
          Find Your Perfect Stay
        </h2>
        <p className="text-travel-600 font-medium">Search from 2+ million properties worldwide</p>
      </div>
      
      <form onSubmit={handleSearch} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Destination Input */}
          <div className="relative md:col-span-2">
            <label className="block text-sm font-semibold text-travel-700 mb-2">
              <MapPin className="inline w-4 h-4 mr-1" />
              Destination
            </label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-accent-coral h-5 w-5" />
              <Input
                type="text"
                placeholder="Where are you going?"
                value={formData.destination}
                onChange={(e) => handleInputChange('destination', e.target.value)}
                className="pl-12 h-14 text-lg border-2 border-brand-200 focus:border-accent-coral focus:ring-accent-coral/20 rounded-xl bg-white/80 backdrop-blur-sm font-medium"
                required
              />
              {isLoadingSuggestions && (
                <Loader2 className="absolute right-4 top-1/2 transform -translate-y-1/2 text-accent-coral h-5 w-5 animate-spin" />
              )}
            </div>
            
            {/* Destination Suggestions */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg border-2 border-brand-200 rounded-2xl shadow-luxury z-50 mt-2 overflow-hidden">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    type="button"
                    className="w-full text-left px-6 py-4 hover:bg-gradient-to-r hover:from-brand-50 hover:to-accent-sky/10 border-b border-brand-100 last:border-b-0 transition-all duration-200 group"
                    onClick={() => handleDestinationSelect(suggestion)}
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-accent-coral to-accent-rose rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                        <MapPin className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-travel-700 text-lg group-hover:text-accent-coral transition-colors">{suggestion.name}</div>
                        <div className="text-sm text-travel-500 font-medium">{suggestion.country} • {suggestion.type}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Check-in Date */}
          <div className="relative">
            <label className="block text-sm font-semibold text-travel-700 mb-2">
              <Calendar className="inline w-4 h-4 mr-1" />
              Check-in
            </label>
            <Calendar className="absolute left-4 top-[52px] transform -translate-y-1/2 text-accent-sky h-5 w-5 z-10" />
            <Input
              type="date"
              value={formData.checkinDate}
              onChange={(e) => handleInputChange('checkinDate', e.target.value)}
              className="pl-12 h-14 border-2 border-brand-200 focus:border-accent-sky focus:ring-accent-sky/20 rounded-xl bg-white/80 backdrop-blur-sm font-medium text-lg"
              required
            />
          </div>

          {/* Check-out Date */}
          <div className="relative">
            <label className="block text-sm font-semibold text-travel-700 mb-2">
              <Calendar className="inline w-4 h-4 mr-1" />
              Check-out
            </label>
            <Calendar className="absolute left-4 top-[52px] transform -translate-y-1/2 text-accent-violet h-5 w-5 z-10" />
            <Input
              type="date"
              value={formData.checkoutDate}
              onChange={(e) => handleInputChange('checkoutDate', e.target.value)}
              className="pl-12 h-14 border-2 border-brand-200 focus:border-accent-violet focus:ring-accent-violet/20 rounded-xl bg-white/80 backdrop-blur-sm font-medium text-lg"
              required
            />
          </div>
        </div>

        {/* Guests and Rooms Selector */}
        <div className="bg-gradient-to-r from-brand-50 to-accent-sky/10 rounded-2xl p-6 border-2 border-brand-100">
          <div className="flex items-center mb-4">
            <Users className="w-5 h-5 text-accent-coral mr-2" />
            <h3 className="text-lg font-semibold text-travel-700">Guests & Rooms</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Adults */}
            <div className="flex items-center justify-between p-5 bg-white/80 backdrop-blur-sm border-2 border-brand-200 rounded-xl hover:border-accent-coral transition-colors">
              <div>
                <div className="font-semibold text-travel-700 text-lg">Adults</div>
                <div className="text-sm text-travel-500 font-medium">Ages 13+</div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={() => decrementGuests('adults')}
                  disabled={formData.adults <= 1}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-accent-coral to-accent-rose text-white flex items-center justify-center hover:from-accent-rose hover:to-accent-coral disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <span className="text-xl font-bold">−</span>
                </button>
                <span className="w-10 text-center font-bold text-xl text-travel-700">{formData.adults}</span>
                <button
                  type="button"
                  onClick={() => incrementGuests('adults')}
                  disabled={formData.adults >= 8}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-accent-coral to-accent-rose text-white flex items-center justify-center hover:from-accent-rose hover:to-accent-coral disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <span className="text-xl font-bold">+</span>
                </button>
              </div>
            </div>

            {/* Children */}
            <div className="flex items-center justify-between p-5 bg-white/80 backdrop-blur-sm border-2 border-brand-200 rounded-xl hover:border-accent-sky transition-colors">
              <div>
                <div className="font-semibold text-travel-700 text-lg">Children</div>
                <div className="text-sm text-travel-500 font-medium">Ages 0-12</div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={() => decrementGuests('children')}
                  disabled={formData.children <= 0}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-accent-sky to-accent-teal text-white flex items-center justify-center hover:from-accent-teal hover:to-accent-sky disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <span className="text-xl font-bold">−</span>
                </button>
                <span className="w-10 text-center font-bold text-xl text-travel-700">{formData.children}</span>
                <button
                  type="button"
                  onClick={() => incrementGuests('children')}
                  disabled={formData.children >= 6}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-accent-sky to-accent-teal text-white flex items-center justify-center hover:from-accent-teal hover:to-accent-sky disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <span className="text-xl font-bold">+</span>
                </button>
              </div>
            </div>

            {/* Rooms */}
            <div className="flex items-center justify-between p-5 bg-white/80 backdrop-blur-sm border-2 border-brand-200 rounded-xl hover:border-accent-violet transition-colors">
              <div>
                <div className="font-semibold text-travel-700 text-lg">Rooms</div>
                <div className="text-sm text-travel-500 font-medium">Hotel rooms</div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={() => decrementGuests('rooms')}
                  disabled={formData.rooms <= 1}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-accent-violet to-accent-purple text-white flex items-center justify-center hover:from-accent-purple hover:to-accent-violet disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <span className="text-xl font-bold">−</span>
                </button>
                <span className="w-10 text-center font-bold text-xl text-travel-700">{formData.rooms}</span>
                <button
                  type="button"
                  onClick={() => incrementGuests('rooms')}
                  disabled={formData.rooms >= 4}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-accent-violet to-accent-purple text-white flex items-center justify-center hover:from-accent-purple hover:to-accent-violet disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <span className="text-xl font-bold">+</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Features & Guarantees */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">✓</span>
            </div>
            <div>
              <div className="font-semibold text-green-700 text-sm">Best Price Guarantee</div>
              <div className="text-xs text-green-600">We'll match any lower price</div>
            </div>
          </div>
          
          <div className="flex items-center p-3 bg-gradient-to-r from-blue-50 to-sky-50 rounded-xl border border-blue-200">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">24</span>
            </div>
            <div>
              <div className="font-semibold text-blue-700 text-sm">24/7 Support</div>
              <div className="text-xs text-blue-600">Help whenever you need it</div>
            </div>
          </div>
          
          <div className="flex items-center p-3 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl border border-purple-200">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">⚡</span>
            </div>
            <div>
              <div className="font-semibold text-purple-700 text-sm">Instant Booking</div>
              <div className="text-xs text-purple-600">Confirm in seconds</div>
            </div>
          </div>
        </div>

        {/* Search Button */}
        <Button 
          type="submit" 
          disabled={isSearching}
          className="w-full h-16 text-xl font-bold bg-gradient-to-r from-accent-coral via-accent-rose to-accent-violet hover:from-accent-rose hover:via-accent-violet hover:to-accent-coral shadow-luxury hover:shadow-glow-lg transition-all duration-500 transform hover:scale-[1.02] rounded-2xl"
        >
          {isSearching ? (
            <>
              <Loader2 className="mr-3 h-6 w-6 animate-spin" />
              <span className="bg-gradient-to-r from-white to-gray-100 bg-clip-text text-transparent">
                Searching 2M+ Hotels...
              </span>
            </>
          ) : (
            <>
              <Search className="mr-3 h-6 w-6" />
              <span className="bg-gradient-to-r from-white to-gray-100 bg-clip-text text-transparent">
                Search 2+ Million Hotels
              </span>
            </>
          )}
        </Button>
      </form>
    </Card>
  )
}

export default SearchForm