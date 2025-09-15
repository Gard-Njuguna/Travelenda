// Lite API Integration for Hotel Search and Booking
// Documentation: https://docs.liteapi.travel/

interface LiteAPIConfig {
  baseUrl: string
  apiKey: string
  timeout: number
}

const config: LiteAPIConfig = {
  baseUrl: process.env.LITE_API_BASE_URL || 'https://api.liteapi.travel/v3.0',
  apiKey: process.env.LITE_API_KEY || '',
  timeout: 30000
}

// Types for Lite API responses
export interface DestinationSuggestion {
  name: string
  type: 'city' | 'country' | 'region' | 'airport'
  country: string
  coordinates?: {
    latitude: number
    longitude: number
  }
}

export interface LiteAPIHotel {
  id: string
  name: string
  description?: string
  address: {
    line1: string
    line2?: string
    city: string
    state?: string
    country: string
    postalCode?: string
  }
  location: {
    latitude: number
    longitude: number
  }
  starRating: number
  amenities: string[]
  images: {
    url: string
    caption?: string
    type: 'main' | 'room' | 'facility' | 'other'
  }[]
  contact: {
    phone?: string
    email?: string
    website?: string
  }
  policies: {
    checkIn: string
    checkOut: string
    cancellation?: string
    children?: string
    pets?: string
  }
  currency: string
  minRate?: number
  maxRate?: number
}

export interface LiteAPISearchParams {
  destination: string // City name or coordinates
  checkinDate: string // YYYY-MM-DD
  checkoutDate: string // YYYY-MM-DD
  adults: number
  children?: number
  rooms?: number
  currency?: string
  limit?: number
  offset?: number
  minRate?: number
  maxRate?: number
  starRating?: number[]
  amenities?: string[]
  sortBy?: 'price' | 'rating' | 'distance' | 'popularity'
  sortOrder?: 'asc' | 'desc'
}

export interface LiteAPISearchResponse {
  hotels: LiteAPIHotel[]
  total: number
  hasMore: boolean
  searchId: string
  currency: string
}

export interface LiteAPIRoomRate {
  roomId: string
  roomType: string
  roomName: string
  bedType: string
  maxOccupancy: number
  amenities: string[]
  images: string[]
  rates: {
    date: string
    price: number
    currency: string
    available: boolean
    restrictions?: {
      minStay?: number
      maxStay?: number
      closedToArrival?: boolean
      closedToDeparture?: boolean
    }
  }[]
  totalPrice: number
  avgNightlyRate: number
  taxes: number
  fees: number
  cancellationPolicy: {
    refundable: boolean
    deadline?: string
    penalty?: number
  }
}

export interface LiteAPIBookingRequest {
  hotelId: string
  roomId: string
  checkinDate: string
  checkoutDate: string
  adults: number
  children?: number
  guestInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    address?: {
      line1: string
      city: string
      country: string
      postalCode?: string
    }
  }
  paymentInfo: {
    method: 'credit_card' | 'paypal' | 'bank_transfer'
    cardNumber?: string
    expiryMonth?: string
    expiryYear?: string
    cvv?: string
    holderName?: string
  }
  specialRequests?: string
  affiliateId?: string // For commission tracking
}

export interface LiteAPIBookingResponse {
  bookingId: string
  confirmationNumber: string
  status: 'confirmed' | 'pending' | 'failed'
  hotel: LiteAPIHotel
  room: LiteAPIRoomRate
  guest: {
    firstName: string
    lastName: string
    email: string
    phone: string
  }
  dates: {
    checkin: string
    checkout: string
    nights: number
  }
  pricing: {
    roomRate: number
    taxes: number
    fees: number
    total: number
    currency: string
    commission?: {
      amount: number
      rate: number
    }
  }
  cancellationPolicy: {
    refundable: boolean
    deadline?: string
    penalty?: number
  }
  createdAt: string
}

class LiteAPIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public errorCode?: string
  ) {
    super(message)
    this.name = 'LiteAPIError'
  }
}

class LiteAPIService {
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    if (!config.apiKey) {
      throw new LiteAPIError('Lite API key is not configured')
    }

    const url = `${config.baseUrl}${endpoint}`
    const headers = {
      'Content-Type': 'application/json',
      'X-API-Key': config.apiKey,
      ...options.headers
    }

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), config.timeout)

      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new LiteAPIError(
          errorData.message || `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          errorData.code
        )
      }

      return await response.json()
    } catch (error) {
      if (error instanceof LiteAPIError) {
        throw error
      }
      if (error.name === 'AbortError') {
        throw new LiteAPIError('Request timeout')
      }
      throw new LiteAPIError(`Network error: ${error.message}`)
    }
  }

  // Search for hotels
  async searchHotels(params: LiteAPISearchParams): Promise<LiteAPISearchResponse> {
    const queryParams = new URLSearchParams({
      destination: params.destination,
      checkin_date: params.checkinDate,
      checkout_date: params.checkoutDate,
      adults: params.adults.toString(),
      ...(params.children && { children: params.children.toString() }),
      ...(params.rooms && { rooms: params.rooms.toString() }),
      ...(params.currency && { currency: params.currency }),
      ...(params.limit && { limit: params.limit.toString() }),
      ...(params.offset && { offset: params.offset.toString() }),
      ...(params.minRate && { min_rate: params.minRate.toString() }),
      ...(params.maxRate && { max_rate: params.maxRate.toString() }),
      ...(params.starRating && { star_rating: params.starRating.join(',') }),
      ...(params.amenities && { amenities: params.amenities.join(',') }),
      ...(params.sortBy && { sort_by: params.sortBy }),
      ...(params.sortOrder && { sort_order: params.sortOrder })
    })

    return this.makeRequest<LiteAPISearchResponse>(`/hotels/search?${queryParams}`)
  }

  // Get hotel details by ID
  async getHotelDetails(hotelId: string): Promise<LiteAPIHotel> {
    return this.makeRequest<LiteAPIHotel>(`/hotels/${hotelId}`)
  }

  // Get room rates for a specific hotel
  async getRoomRates(
    hotelId: string,
    checkinDate: string,
    checkoutDate: string,
    adults: number,
    children?: number
  ): Promise<LiteAPIRoomRate[]> {
    const queryParams = new URLSearchParams({
      checkin_date: checkinDate,
      checkout_date: checkoutDate,
      adults: adults.toString(),
      ...(children && { children: children.toString() })
    })

    return this.makeRequest<LiteAPIRoomRate[]>(
      `/hotels/${hotelId}/rates?${queryParams}`
    )
  }

  // Create a booking
  async createBooking(bookingData: LiteAPIBookingRequest): Promise<LiteAPIBookingResponse> {
    return this.makeRequest<LiteAPIBookingResponse>('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData)
    })
  }

  // Get booking details
  async getBooking(bookingId: string): Promise<LiteAPIBookingResponse> {
    return this.makeRequest<LiteAPIBookingResponse>(`/bookings/${bookingId}`)
  }

  // Cancel a booking
  async cancelBooking(bookingId: string, reason?: string): Promise<{
    success: boolean
    refundAmount?: number
    cancellationFee?: number
  }> {
    return this.makeRequest(`/bookings/${bookingId}/cancel`, {
      method: 'POST',
      body: JSON.stringify({ reason })
    })
  }

  // Get popular destinations
  async getPopularDestinations(limit: number = 20): Promise<{
    destinations: {
      name: string
      country: string
      image: string
      hotelCount: number
      avgPrice: number
    }[]
  }> {
    return this.makeRequest(`/destinations/popular?limit=${limit}`)
  }

  // Search destinations (autocomplete)
  async searchDestinations(query: string, limit: number = 10): Promise<{
    suggestions: DestinationSuggestion[]
  }> {
    try {
      const queryParams = new URLSearchParams({
        q: query,
        limit: limit.toString()
      })

      return this.makeRequest(`/destinations/search?${queryParams}`)
    } catch (error) {
      console.error('Error searching destinations:', error)
      return this.getMockDestinations(query, limit)
    }
  }

  // Get mock destinations for development/fallback
  private getMockDestinations(query: string, limit: number): {
    suggestions: DestinationSuggestion[]
  } {
    const mockSuggestions: DestinationSuggestion[] = [
      { name: 'New York', type: 'city', country: 'United States', coordinates: { latitude: 40.7128, longitude: -74.0060 } },
      { name: 'Paris', type: 'city', country: 'France', coordinates: { latitude: 48.8566, longitude: 2.3522 } },
      { name: 'London', type: 'city', country: 'United Kingdom', coordinates: { latitude: 51.5074, longitude: -0.1278 } },
      { name: 'Tokyo', type: 'city', country: 'Japan', coordinates: { latitude: 35.6762, longitude: 139.6503 } },
      { name: 'Dubai', type: 'city', country: 'United Arab Emirates', coordinates: { latitude: 25.2048, longitude: 55.2708 } },
      { name: 'Barcelona', type: 'city', country: 'Spain', coordinates: { latitude: 41.3851, longitude: 2.1734 } },
      { name: 'Rome', type: 'city', country: 'Italy', coordinates: { latitude: 41.9028, longitude: 12.4964 } },
      { name: 'Bangkok', type: 'city', country: 'Thailand', coordinates: { latitude: 13.7563, longitude: 100.5018 } }
    ]

    const filtered = mockSuggestions.filter(suggestion => 
      suggestion.name.toLowerCase().includes(query.toLowerCase()) ||
      suggestion.country.toLowerCase().includes(query.toLowerCase())
    ).slice(0, limit)

    return { suggestions: filtered }
  }

  // Get mock hotels for development/fallback
  private getMockHotels(params: SearchParams): SearchResponse {
    const mockHotels: Hotel[] = [
      {
        id: '1',
        name: 'Grand Plaza Hotel',
        address: '123 Main Street, Downtown',
        city: params.destination.split(',')[0] || 'New York',
        country: 'United States',
        starRating: 5,
        rating: 4.5,
        reviewCount: 1250,
        price: 299,
        currency: 'USD',
        images: [
          'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800'
        ],
        amenities: ['WiFi', 'Parking', 'Restaurant', 'Gym', 'Pool', 'Spa'],
        description: 'Luxury hotel in the heart of the city with world-class amenities.',
        coordinates: { latitude: 40.7128, longitude: -74.0060 },
        distanceFromCenter: 0.5,
        cancellationPolicy: 'Free cancellation until 24 hours before check-in',
        checkInTime: '15:00',
        checkOutTime: '11:00'
      },
      {
        id: '2',
        name: 'Boutique City Inn',
        address: '456 Park Avenue',
        city: params.destination.split(',')[0] || 'New York',
        country: 'United States',
        starRating: 4,
        rating: 4.2,
        reviewCount: 890,
        price: 189,
        currency: 'USD',
        images: [
          'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
          'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800'
        ],
        amenities: ['WiFi', 'Restaurant', 'Bar', 'Concierge'],
        description: 'Charming boutique hotel with personalized service and modern comfort.',
        coordinates: { latitude: 40.7589, longitude: -73.9851 },
        distanceFromCenter: 1.2,
        cancellationPolicy: 'Free cancellation until 48 hours before check-in',
        checkInTime: '14:00',
        checkOutTime: '12:00'
      },
      {
        id: '3',
        name: 'Budget Comfort Lodge',
        address: '789 Broadway Street',
        city: params.destination.split(',')[0] || 'New York',
        country: 'United States',
        starRating: 3,
        rating: 3.8,
        reviewCount: 456,
        price: 99,
        currency: 'USD',
        images: [
          'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800'
        ],
        amenities: ['WiFi', 'Breakfast'],
        description: 'Clean and comfortable accommodation at an affordable price.',
        coordinates: { latitude: 40.7505, longitude: -73.9934 },
        distanceFromCenter: 2.1,
        cancellationPolicy: 'Non-refundable',
        checkInTime: '15:00',
        checkOutTime: '11:00'
      }
    ]

    return {
      hotels: mockHotels,
      total: mockHotels.length,
      searchId: 'mock-search-' + Date.now()
    }
  }
}

// Export singleton instance
export const liteAPI = new LiteAPIService()

// Helper functions
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount)
}

export const calculateNights = (checkinDate: string, checkoutDate: string): number => {
  const checkin = new Date(checkinDate)
  const checkout = new Date(checkoutDate)
  const diffTime = Math.abs(checkout.getTime() - checkin.getTime())
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export const validateDates = (checkinDate: string, checkoutDate: string): {
  valid: boolean
  error?: string
} => {
  const checkin = new Date(checkinDate)
  const checkout = new Date(checkoutDate)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  if (checkin < today) {
    return { valid: false, error: 'Check-in date cannot be in the past' }
  }

  if (checkout <= checkin) {
    return { valid: false, error: 'Check-out date must be after check-in date' }
  }

  const maxAdvanceBooking = new Date()
  maxAdvanceBooking.setFullYear(maxAdvanceBooking.getFullYear() + 1)

  if (checkin > maxAdvanceBooking) {
    return { valid: false, error: 'Check-in date cannot be more than 1 year in advance' }
  }

  return { valid: true }
}

export default liteAPI