'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { Star, MapPin, Wifi, Car, Utensils, Dumbbell, Waves, Spa, Clock, Shield, ArrowLeft, Heart, Share2, Calendar, Users } from 'lucide-react'
import { liteAPI } from '@/lib/liteapi'
import type { Hotel, RoomRate } from '@/lib/liteapi'

interface HotelDetailPageProps {
  searchParams: {
    checkIn?: string
    checkOut?: string
    guests?: string
    rooms?: string
  }
}

const amenityIcons: Record<string, any> = {
  'WiFi': Wifi,
  'Parking': Car,
  'Restaurant': Utensils,
  'Gym': Dumbbell,
  'Pool': Waves,
  'Spa': Spa,
  'Bar': Utensils,
  'Concierge': Shield,
  'Breakfast': Utensils
}

export default function HotelDetailPage({ searchParams }: HotelDetailPageProps) {
  const params = useParams()
  const router = useRouter()
  const hotelId = params.id as string
  
  const [hotel, setHotel] = useState<Hotel | null>(null)
  const [roomRates, setRoomRates] = useState<RoomRate[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [showAllAmenities, setShowAllAmenities] = useState(false)
  
  // Parse search params
  const checkIn = searchParams.checkIn || new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  const checkOut = searchParams.checkOut || new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  const guests = parseInt(searchParams.guests || '2')
  const rooms = parseInt(searchParams.rooms || '1')

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Get hotel details from Lite API
        const hotelData = await liteAPI.getHotelDetails(hotelId)
        setHotel(hotelData)
        
        // Get room rates if dates are provided
        if (checkIn && checkOut) {
          try {
            const rateParams = {
              hotelIds: [hotelId],
              checkin: checkIn,
              checkout: checkOut,
              adults: guests,
              children: 0,
              currency: 'USD'
            }
            const rates = await liteAPI.getRoomRates(rateParams)
            setRoomRates(rates)
          } catch (rateError) {
            console.error('Error loading room rates:', rateError)
            // Continue without rates if there's an error
          }
        }
      } catch (err) {
        console.error('Error fetching hotel details:', err)
        setError('Failed to load hotel details. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchHotelDetails()
  }, [hotelId])

  const handleBookRoom = (roomType: string, price: number) => {
    const bookingParams = new URLSearchParams({
      hotelId,
      roomType,
      price: price.toString(),
      checkIn,
      checkOut,
      guests: guests.toString(),
      rooms: rooms.toString()
    })
    
    router.push(`/booking?${bookingParams.toString()}`)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading hotel details...</p>
        </div>
      </div>
    )
  }

  if (error || !hotel) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Hotel not found'}</p>
          <button
            onClick={() => router.back()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Search
            </button>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-2 rounded-full transition-colors ${
                  isLiked ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              </button>
              <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="aspect-video relative">
                <Image
                  src={hotel.images?.[selectedImageIndex]?.url || '/placeholder-hotel.jpg'}
                  alt={hotel.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex space-x-2 overflow-x-auto">
                  {hotel.images?.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImageIndex === index ? 'border-blue-600' : 'border-gray-200'
                      }`}
                    >
                      <Image
                        src={image.url}
                        alt={`${hotel.name} ${index + 1}`}
                        width={80}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Hotel Info */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{hotel.name}</h1>
                  <div className="flex items-center space-x-4 text-gray-600">
                    <div className="flex items-center">
                      {renderStars(hotel.starRating)}
                      <span className="ml-2 text-sm">{hotel.starRating} Star Hotel</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{hotel.address.line1}, {hotel.address.city}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center mb-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="font-semibold">{hotel.rating || 'N/A'}</span>
                    <span className="text-gray-600 text-sm ml-1">({hotel.reviewCount || 0} reviews)</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">{hotel.description}</p>

              {/* Amenities */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {(showAllAmenities ? hotel.amenities : hotel.amenities.slice(0, 6)).map((amenity) => {
                    const IconComponent = amenityIcons[amenity] || Shield
                    return (
                      <div key={amenity} className="flex items-center space-x-2 text-gray-700">
                        <IconComponent className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">{amenity}</span>
                      </div>
                    )
                  })}
                </div>
                {hotel.amenities.length > 6 && (
                  <button
                    onClick={() => setShowAllAmenities(!showAllAmenities)}
                    className="mt-3 text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    {showAllAmenities ? 'Show Less' : `Show All ${hotel.amenities.length} Amenities`}
                  </button>
                )}
              </div>

              {/* Hotel Policies */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Hotel Policies</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <div>
                      <p className="font-medium">Check-in</p>
                      <p className="text-gray-600">{hotel.policies.checkIn}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <div>
                      <p className="font-medium">Check-out</p>
                      <p className="text-gray-600">{hotel.policies.checkOut}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-blue-600" />
                    <div>
                      <p className="font-medium">Cancellation</p>
                      <p className="text-gray-600">{hotel.policies.cancellation || 'Contact hotel for details'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Room Selection */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Rooms</h2>
              <div className="space-y-4">
                {roomRates.length > 0 ? roomRates.map((room, index) => (
                  <div key={room.roomId || index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-start space-x-4">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">{room.roomName}</h3>
                            <p className="text-gray-600 text-sm mb-2">{room.bedType} • Max {room.maxOccupancy} guests</p>
                            <div className="flex flex-wrap gap-2">
                              {room.amenities.slice(0, 4).map((amenity, i) => (
                                <span key={i} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                                  {amenity}
                                </span>
                              ))}
                            </div>
                            <div className="mt-2 text-sm">
                              {room.cancellationPolicy.refundable ? (
                                <span className="text-green-600">✓ Free cancellation</span>
                              ) : (
                                <span className="text-red-600">✗ Non-refundable</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0 md:ml-6 text-right">
                        <div className="mb-2">
                          <span className="text-2xl font-bold text-gray-900">
                            ${room.totalPrice}
                          </span>
                          <span className="text-gray-600 text-sm ml-1">total</span>
                        </div>
                        <div className="text-xs text-gray-500 mb-2">
                          ${room.avgNightlyRate}/night + ${room.taxes + room.fees} taxes & fees
                        </div>
                        <button
                          onClick={() => handleBookRoom(room.roomName, room.totalPrice)}
                          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>No rooms available for the selected dates.</p>
                    <p className="text-sm mt-2">Try different dates or contact the hotel directly.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {/* Booking Summary */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Stay</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Check-in</span>
                    </div>
                    <span className="font-medium">{new Date(checkIn).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Check-out</span>
                    </div>
                    <span className="font-medium">{new Date(checkOut).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Guests</span>
                    </div>
                    <span className="font-medium">{guests} guests, {rooms} room{rooms > 1 ? 's' : ''}</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total nights</span>
                    <span className="font-medium">
                      {Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))} nights
                    </span>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
                <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <MapPin className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm">Interactive map coming soon</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-3">{hotel.address.line1}, {hotel.address.city}</p>
                <p className="text-sm text-gray-600">{hotel.address.country}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}