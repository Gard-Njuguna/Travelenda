'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import SearchForm from '@/components/search/SearchForm'
import { liteAPI, type Hotel, type HotelSearchParams, type RateSearchParams } from '@/lib/liteapi'
import { 
  MapPin, 
  Star, 
  Wifi, 
  Car, 
  Utensils, 
  Dumbbell, 
  Waves, 
  Coffee,
  Filter,
  Grid3X3,
  List,
  Map,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertCircle
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface SearchFilters {
  priceRange: [number, number]
  starRating: number[]
  amenities: string[]
  sortBy: 'price_low' | 'price_high' | 'rating' | 'distance' | 'popularity'
  viewType: 'grid' | 'list' | 'map'
}

const SearchResultsContent: React.FC = () => {
  const searchParams = useSearchParams()
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalResults, setTotalResults] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState<SearchFilters>({
    priceRange: [0, 1000],
    starRating: [],
    amenities: [],
    sortBy: 'popularity',
    viewType: 'grid'
  })
  const [showFilters, setShowFilters] = useState(false)

  // Extract search parameters
  const destination = searchParams.get('destination') || ''
  const checkin = searchParams.get('checkin') || ''
  const checkout = searchParams.get('checkout') || ''
  const adults = parseInt(searchParams.get('adults') || '2')
  const children = parseInt(searchParams.get('children') || '0')
  const rooms = parseInt(searchParams.get('rooms') || '1')

  // Search hotels
  useEffect(() => {
    const searchHotels = async () => {
      if (!destination || !checkin || !checkout) {
        setError('Missing required search parameters')
        setLoading(false)
        return
      }

      setLoading(true)
      setError(null)

      try {
        const searchRequest: HotelSearchParams = {
          cityName: destination,
          limit: 20,
          offset: (currentPage - 1) * 20
        }

        const response = await liteAPI.searchHotels(searchRequest)
        setHotels(response)
        setTotalResults(response.length)
      } catch (err) {
        console.error('Search error:', err)
        setError('Failed to search hotels. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    searchHotels()
  }, [destination, checkin, checkout, adults, children, rooms, currentPage])

  // Filter and sort hotels
  const filteredHotels = hotels.filter(hotel => {
    // Star rating filter
    if (filters.starRating.length > 0 && !filters.starRating.includes(hotel.starRating)) {
      return false
    }

    // Amenities filter
    if (filters.amenities.length > 0) {
      const hasRequiredAmenities = filters.amenities.every(amenity => 
        hotel.amenities.some(hotelAmenity => 
          hotelAmenity.toLowerCase().includes(amenity.toLowerCase())
        )
      )
      if (!hasRequiredAmenities) return false
    }

    return true
  }).sort((a, b) => {
    switch (filters.sortBy) {
      case 'rating':
        return b.rating - a.rating
      default:
        return 0
    }
  })

  const totalPages = Math.ceil(totalResults / 20)

  const amenityIcons: Record<string, React.ReactNode> = {
    'wifi': <Wifi className="h-4 w-4" />,
    'parking': <Car className="h-4 w-4" />,
    'restaurant': <Utensils className="h-4 w-4" />,
    'gym': <Dumbbell className="h-4 w-4" />,
    'pool': <Waves className="h-4 w-4" />,
    'breakfast': <Coffee className="h-4 w-4" />
  }

  const HotelCard: React.FC<{ hotel: Hotel; viewType: 'grid' | 'list' }> = ({ hotel, viewType }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [isFavorite, setIsFavorite] = useState(false)

    const nextImage = () => {
      setCurrentImageIndex((prev) => 
        prev === hotel.images.length - 1 ? 0 : prev + 1
      )
    }

    const prevImage = () => {
      setCurrentImageIndex((prev) => 
        prev === 0 ? hotel.images.length - 1 : prev - 1
      )
    }

    if (viewType === 'list') {
      return (
        <Card className="p-4 hover:shadow-lg transition-shadow">
          <div className="flex gap-4">
            {/* Hotel Image */}
            <div className="relative w-48 h-32 flex-shrink-0">
              <Image
                src={hotel.images[currentImageIndex] || '/placeholder-hotel.jpg'}
                alt={hotel.name}
                fill
                className="object-cover rounded-lg"
              />
              {hotel.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-1 hover:bg-black/70"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-1 hover:bg-black/70"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </>
              )}
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="absolute top-2 right-2 bg-white/80 rounded-full p-1 hover:bg-white"
              >
                <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
              </button>
            </div>

            {/* Hotel Info */}
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{hotel.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{hotel.address.line1}, {hotel.address.city}, {hotel.address.country}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">View Rates</div>
                  <div className="text-sm text-gray-500">Check availability</div>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < hotel.starRating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm font-medium">
                    {hotel.rating.toFixed(1)}
                  </span>
                  <span className="text-sm text-gray-600">({hotel.reviewCount} reviews)</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                {hotel.amenities.slice(0, 4).map((amenity, index) => {
                  const iconKey = amenity.toLowerCase().includes('wifi') ? 'wifi' :
                                 amenity.toLowerCase().includes('parking') ? 'parking' :
                                 amenity.toLowerCase().includes('restaurant') ? 'restaurant' :
                                 amenity.toLowerCase().includes('gym') ? 'gym' :
                                 amenity.toLowerCase().includes('pool') ? 'pool' :
                                 amenity.toLowerCase().includes('breakfast') ? 'breakfast' : null
                  
                  return (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {iconKey && amenityIcons[iconKey]}
                      <span className="text-xs">{amenity}</span>
                    </Badge>
                  )
                })}
                {hotel.amenities.length > 4 && (
                  <Badge variant="outline">+{hotel.amenities.length - 4} more</Badge>
                )}
              </div>

              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                </div>
                <Link href={`/hotel/${hotel.id}?checkIn=${checkin}&checkOut=${checkout}&guests=${adults}&rooms=${rooms}`}>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Card>
      )
    }

    // Grid view
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        {/* Hotel Image */}
        <div className="relative h-48">
          <Image
            src={hotel.images[currentImageIndex] || '/placeholder-hotel.jpg'}
            alt={hotel.name}
            fill
            className="object-cover"
          />
          {hotel.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-1 hover:bg-black/70"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-1 hover:bg-black/70"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          )}
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="absolute top-2 right-2 bg-white/80 rounded-full p-1 hover:bg-white"
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
          </button>
          <div className="absolute bottom-2 left-2">
            <Badge className="bg-blue-600">
              {hotel.starRating} Star
            </Badge>
          </div>
        </div>

        {/* Hotel Info */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{hotel.name}</h3>
            <div className="text-right">
              <div className="text-xl font-bold text-blue-600">View Rates</div>
              <div className="text-xs text-gray-500">Check availability</div>
            </div>
          </div>

          <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
            <MapPin className="h-4 w-4" />
            <span className="line-clamp-1">{hotel.address.line1}, {hotel.address.city}</span>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm font-medium">
                {hotel.rating.toFixed(1)}
              </span>
              <span className="text-sm text-gray-600">({hotel.reviewCount})</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1 mb-3">
            {hotel.amenities.slice(0, 3).map((amenity, index) => {
              const iconKey = amenity.toLowerCase().includes('wifi') ? 'wifi' :
                             amenity.toLowerCase().includes('parking') ? 'parking' :
                             amenity.toLowerCase().includes('restaurant') ? 'restaurant' :
                             amenity.toLowerCase().includes('gym') ? 'gym' :
                             amenity.toLowerCase().includes('pool') ? 'pool' :
                             amenity.toLowerCase().includes('breakfast') ? 'breakfast' : null
              
              return (
                <Badge key={index} variant="secondary" className="text-xs">
                  {iconKey && amenityIcons[iconKey]}
                </Badge>
              )
            })}
          </div>

          <Link href={`/hotel/${hotel.id}?checkIn=${checkin}&checkOut=${checkout}&guests=${adults}&rooms=${rooms}`}>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              View Details
            </Button>
          </Link>
        </div>
      </Card>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <SearchForm variant="compact" />
          </div>
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Searching Hotels...</h2>
              <p className="text-gray-600">Finding the best deals for your stay</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <SearchForm variant="compact" />
          </div>
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Search Error</h2>
              <p className="text-gray-600 mb-4">{error}</p>
              <Button onClick={() => window.location.reload()} className="bg-blue-600 hover:bg-blue-700">
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Search Form */}
        <div className="mb-8">
          <SearchForm variant="compact" />
        </div>

        {/* Results Header */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <Card className="p-6 sticky top-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Filters</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden"
                >
                  ×
                </Button>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Price Range</h4>
                <Slider
                  value={filters.priceRange}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value as [number, number] }))}
                  max={1000}
                  min={0}
                  step={10}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>${filters.priceRange[0]}</span>
                  <span>${filters.priceRange[1]}</span>
                </div>
              </div>

              {/* Star Rating */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Star Rating</h4>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map(stars => (
                    <label key={stars} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.starRating.includes(stars)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFilters(prev => ({ ...prev, starRating: [...prev.starRating, stars] }))
                          } else {
                            setFilters(prev => ({ ...prev, starRating: prev.starRating.filter(s => s !== stars) }))
                          }
                        }}
                        className="mr-2"
                      />
                      <div className="flex items-center">
                        {[...Array(stars)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                        <span className="ml-1 text-sm">{stars} Star{stars !== 1 ? 's' : ''}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Amenities</h4>
                <div className="space-y-2">
                  {['WiFi', 'Parking', 'Restaurant', 'Gym', 'Pool', 'Breakfast'].map(amenity => (
                    <label key={amenity} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.amenities.includes(amenity)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFilters(prev => ({ ...prev, amenities: [...prev.amenities, amenity] }))
                          } else {
                            setFilters(prev => ({ ...prev, amenities: prev.amenities.filter(a => a !== amenity) }))
                          }
                        }}
                        className="mr-2"
                      />
                      <div className="flex items-center">
                        {amenityIcons[amenity.toLowerCase()]}
                        <span className="ml-2 text-sm">{amenity}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Results */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  {destination}: {filteredHotels.length} hotels found
                </h2>
                <p className="text-gray-600">
                  {checkin} - {checkout} • {adults} adult{adults !== 1 ? 's' : ''}
                  {children > 0 && `, ${children} child${children !== 1 ? 'ren' : ''}`} • {rooms} room{rooms !== 1 ? 's' : ''}
                </p>
              </div>
              
              <div className="flex items-center gap-4 mt-4 sm:mt-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(true)}
                  className="lg:hidden"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                
                <Select value={filters.sortBy} onValueChange={(value: any) => setFilters(prev => ({ ...prev, sortBy: value }))}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">Most Popular</SelectItem>
                    <SelectItem value="price_low">Price: Low to High</SelectItem>
                    <SelectItem value="price_high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="distance">Distance</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="flex border rounded-lg">
                  <Button
                    variant={filters.viewType === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setFilters(prev => ({ ...prev, viewType: 'grid' }))}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={filters.viewType === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setFilters(prev => ({ ...prev, viewType: 'list' }))}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Hotel Results */}
            {filteredHotels.length === 0 ? (
              <div className="text-center py-20">
                <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No hotels found</h3>
                <p className="text-gray-600">Try adjusting your filters or search criteria</p>
              </div>
            ) : (
              <>
                <div className={`grid gap-6 ${
                  filters.viewType === 'grid' 
                    ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                    : 'grid-cols-1'
                }`}>
                  {filteredHotels.map((hotel) => (
                    <HotelCard key={hotel.id} hotel={hotel} viewType={filters.viewType} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-8">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    
                    {[...Array(Math.min(5, totalPages))].map((_, i) => {
                      const pageNum = currentPage <= 3 ? i + 1 : currentPage - 2 + i
                      if (pageNum > totalPages) return null
                      
                      return (
                        <Button
                          key={pageNum}
                          variant={pageNum === currentPage ? 'default' : 'outline'}
                          onClick={() => setCurrentPage(pageNum)}
                        >
                          {pageNum}
                        </Button>
                      )
                    })}
                    
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const SearchResultsPage: React.FC = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    }>
      <SearchResultsContent />
    </Suspense>
  )
}

export default SearchResultsPage