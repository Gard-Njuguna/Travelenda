'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Search, MapPin, Calendar, Users, Loader2 } from 'lucide-react'
import { liteAPI, type LiteAPISearchParams, type LiteAPIHotel, type DestinationSuggestion } from '@/lib/lite-api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useRouter } from 'next/navigation'
import { format, addDays } from 'date-fns'

interface HotelSearchProps {
  onSearch?: (results: LiteAPIHotel[]) => void
  className?: string
  showResults?: boolean
}

export default function HotelSearch({ onSearch, className = '', showResults = true }: HotelSearchProps) {
  const router = useRouter()
  const [searchParams, setSearchParams] = useState<LiteAPISearchParams>({
    destination: '',
    checkinDate: format(new Date(), 'yyyy-MM-dd'),
    checkoutDate: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
    adults: 2,
    children: 0,
    rooms: 1,
    currency: 'USD'
  })

  const [destinationSuggestions, setDestinationSuggestions] = useState<DestinationSuggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [searchResults, setSearchResults] = useState<LiteAPIHotel[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false)
  const [searchError, setSearchError] = useState<string | null>(null)

  // Debounced destination search
  const searchDestinations = useCallback(
    async (query: string) => {
      if (query.length < 2) {
        setDestinationSuggestions([])
        return
      }

      setIsLoadingSuggestions(true)
      try {
        const response = await liteAPI.searchDestinations(query, 8)
        setDestinationSuggestions(response.suggestions)
      } catch (error) {
        console.error('Error searching destinations:', error)
        setDestinationSuggestions([])
      } finally {
        setIsLoadingSuggestions(false)
      }
    },
    []
  )

  // Debounce destination search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchParams.destination) {
        searchDestinations(searchParams.destination)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [searchParams.destination, searchDestinations])

  const handleDestinationChange = (value: string) => {
    setSearchParams(prev => ({ ...prev, destination: value }))
    setShowSuggestions(true)
  }

  const selectDestination = (suggestion: DestinationSuggestion) => {
    setSearchParams(prev => ({ 
      ...prev, 
      destination: `${suggestion.name}, ${suggestion.country}` 
    }))
    setShowSuggestions(false)
    setDestinationSuggestions([])
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!searchParams.destination.trim()) {
      setSearchError('Please enter a destination')
      return
    }

    if (new Date(searchParams.checkinDate) >= new Date(searchParams.checkoutDate)) {
      setSearchError('Check-out date must be after check-in date')
      return
    }

    setIsSearching(true)
    setSearchError(null)

    try {
      const response = await liteAPI.searchHotels({
        ...searchParams,
        limit: 20
      })
      
      setSearchResults(response.hotels)
      onSearch?.(response.hotels)

      // Navigate to search results page if not showing results inline
      if (!showResults) {
        const searchQuery = new URLSearchParams({
          destination: searchParams.destination,
          checkin: searchParams.checkinDate,
          checkout: searchParams.checkoutDate,
          adults: searchParams.adults.toString(),
          children: searchParams.children?.toString() || '0',
          rooms: searchParams.rooms?.toString() || '1'
        })
        router.push(`/search?${searchQuery.toString()}`)
      }
    } catch (error) {
      console.error('Search error:', error)
      setSearchError('Failed to search hotels. Please try again.')
    } finally {
      setIsSearching(false)
    }
  }

  const updateGuests = (type: 'adults' | 'children', increment: boolean) => {
    setSearchParams(prev => ({
      ...prev,
      [type]: Math.max(type === 'adults' ? 1 : 0, prev[type]! + (increment ? 1 : -1))
    }))
  }

  return (
    <div className={`w-full ${className}`}>
      <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-0">
        <CardContent className="p-6">
          <form onSubmit={handleSearch} className="space-y-4">
            {/* Destination Input */}
            <div className="relative">
              <Label htmlFor="destination" className="text-sm font-medium text-gray-700 mb-2 block">
                Where are you going?
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="destination"
                  type="text"
                  placeholder="City, country, or hotel name"
                  value={searchParams.destination}
                  onChange={(e) => handleDestinationChange(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  className="pl-10 h-12 text-base"
                  required
                />
                {isLoadingSuggestions && (
                  <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 animate-spin" />
                )}
              </div>
              
              {/* Destination Suggestions */}
              {showSuggestions && destinationSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {destinationSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => selectDestination(suggestion)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3 border-b border-gray-100 last:border-b-0"
                    >
                      <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-gray-900">{suggestion.name}</div>
                        <div className="text-sm text-gray-500">{suggestion.country}</div>
                      </div>
                      <Badge variant="secondary" className="ml-auto text-xs">
                        {suggestion.type}
                      </Badge>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Date Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="checkin" className="text-sm font-medium text-gray-700 mb-2 block">
                  Check-in
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="checkin"
                    type="date"
                    value={searchParams.checkinDate}
                    onChange={(e) => setSearchParams(prev => ({ ...prev, checkinDate: e.target.value }))}
                    min={format(new Date(), 'yyyy-MM-dd')}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="checkout" className="text-sm font-medium text-gray-700 mb-2 block">
                  Check-out
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="checkout"
                    type="date"
                    value={searchParams.checkoutDate}
                    onChange={(e) => setSearchParams(prev => ({ ...prev, checkoutDate: e.target.value }))}
                    min={searchParams.checkinDate}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Guests and Rooms */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Adults
                </Label>
                <div className="flex items-center space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => updateGuests('adults', false)}
                    disabled={searchParams.adults <= 1}
                    className="h-10 w-10 p-0"
                  >
                    -
                  </Button>
                  <div className="flex-1 text-center py-2 font-medium">
                    {searchParams.adults}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => updateGuests('adults', true)}
                    disabled={searchParams.adults >= 8}
                    className="h-10 w-10 p-0"
                  >
                    +
                  </Button>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Children
                </Label>
                <div className="flex items-center space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => updateGuests('children', false)}
                    disabled={searchParams.children! <= 0}
                    className="h-10 w-10 p-0"
                  >
                    -
                  </Button>
                  <div className="flex-1 text-center py-2 font-medium">
                    {searchParams.children}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => updateGuests('children', true)}
                    disabled={searchParams.children! >= 6}
                    className="h-10 w-10 p-0"
                  >
                    +
                  </Button>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Rooms
                </Label>
                <div className="flex items-center space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setSearchParams(prev => ({ ...prev, rooms: Math.max(1, prev.rooms! - 1) }))}
                    disabled={searchParams.rooms! <= 1}
                    className="h-10 w-10 p-0"
                  >
                    -
                  </Button>
                  <div className="flex-1 text-center py-2 font-medium">
                    {searchParams.rooms}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setSearchParams(prev => ({ ...prev, rooms: Math.min(4, prev.rooms! + 1) }))}
                    disabled={searchParams.rooms! >= 4}
                    className="h-10 w-10 p-0"
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {searchError && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                {searchError}
              </div>
            )}

            {/* Search Button */}
            <Button
              type="submit"
              disabled={isSearching}
              className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {isSearching ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Searching Hotels...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Search Hotels
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Search Results */}
      {showResults && searchResults.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Found {searchResults.length} hotels in {searchParams.destination}
          </h2>
          <div className="grid gap-6">
            {searchResults.map((hotel) => (
              <Card key={hotel.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3">
                    <img
                      src={hotel.images?.[0]?.url || '/placeholder-hotel.jpg'}
                      alt={hotel.name}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{hotel.name}</h3>
                      <div className="flex items-center space-x-1">
                        {[...Array(hotel.starRating)].map((_, i) => (
                          <span key={i} className="text-yellow-400">★</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 mb-2">
                      {hotel.address.line1}, {hotel.address.city}
                    </p>
                    <p className="text-gray-700 mb-4 line-clamp-2">
                      {hotel.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {hotel.amenities.slice(0, 4).map((amenity, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                      {hotel.amenities.length > 4 && (
                        <Badge variant="secondary" className="text-xs">
                          +{hotel.amenities.length - 4} more
                        </Badge>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-2xl font-bold text-blue-600">
                          ${hotel.minRate}
                        </span>
                        <span className="text-gray-500 ml-1">per night</span>
                      </div>
                      <Button
                        onClick={() => router.push(`/hotel/${hotel.id}`)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}