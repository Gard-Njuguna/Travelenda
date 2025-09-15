// Lite API Client for Hotel Booking
// Documentation: https://docs.liteapi.travel/

const LITE_API_BASE_URL = process.env.LITE_API_BASE_URL || 'https://api.liteapi.travel/v3.0'
const LITE_API_KEY = process.env.LITE_API_KEY

if (!LITE_API_KEY) {
  console.warn('LITE_API_KEY is not set in environment variables')
}

class LiteAPIClient {
  private baseURL: string
  private apiKey: string

  constructor() {
    this.baseURL = LITE_API_BASE_URL
    this.apiKey = LITE_API_KEY || ''
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}${endpoint}`
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'X-API-Key': this.apiKey,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`Lite API Error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  // Search hotels by city
  async searchHotels(params: {
    cityCode: string
    checkin: string // YYYY-MM-DD
    checkout: string // YYYY-MM-DD
    adults: number
    children?: number
    currency?: string
    guestNationality?: string
  }) {
    const queryParams = new URLSearchParams({
      cityCode: params.cityCode,
      checkin: params.checkin,
      checkout: params.checkout,
      adults: params.adults.toString(),
      ...(params.children && { children: params.children.toString() }),
      currency: params.currency || 'USD',
      ...(params.guestNationality && { guestNationality: params.guestNationality }),
    })

    return this.makeRequest(`/hotels/search?${queryParams}`)
  }

  // Get hotel details
  async getHotelDetails(hotelId: string, currency: string = 'USD') {
    return this.makeRequest(`/hotels/${hotelId}?currency=${currency}`)
  }

  // Get cities for autocomplete
  async searchCities(query: string) {
    return this.makeRequest(`/data/cities?query=${encodeURIComponent(query)}`)
  }

  // Get countries
  async getCountries() {
    return this.makeRequest('/data/countries')
  }

  // Pre-book (get booking details before final booking)
  async preBook(params: {
    hotelId: string
    roomId: string
    checkin: string
    checkout: string
    adults: number
    children?: number
    currency?: string
  }) {
    return this.makeRequest('/hotels/prebook', {
      method: 'POST',
      body: JSON.stringify(params),
    })
  }

  // Final booking
  async bookHotel(params: {
    prebookId: string
    guestInfo: {
      firstName: string
      lastName: string
      email: string
      phone: string
    }
    paymentMethod: string
  }) {
    return this.makeRequest('/hotels/book', {
      method: 'POST',
      body: JSON.stringify(params),
    })
  }

  // Get booking details
  async getBooking(bookingId: string) {
    return this.makeRequest(`/bookings/${bookingId}`)
  }

  // Cancel booking
  async cancelBooking(bookingId: string) {
    return this.makeRequest(`/bookings/${bookingId}/cancel`, {
      method: 'POST',
    })
  }
}

export const liteAPI = new LiteAPIClient()
export default liteAPI