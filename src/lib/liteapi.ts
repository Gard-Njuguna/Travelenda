/**
 * Lite API Service for Hotel Booking Integration
 * Provides access to 2+ million properties worldwide with commission-based revenue
 */

const LITE_API_BASE_URL = 'https://api.liteapi.travel/v3.0';

// Types for Lite API responses
export interface Hotel {
  id: string;
  name: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    state?: string;
    country: string;
    postalCode?: string;
  };
  location: {
    latitude: number;
    longitude: number;
  };
  rating: number;
  starRating: number;
  reviewCount: number;
  description: string;
  amenities: string[];
  images: string[];
  facilities: number[];
  hotelType: number;
  chainId?: number;
}

export interface HotelSearchParams {
  countryCode?: string;
  cityName?: string;
  hotelName?: string;
  latitude?: number;
  longitude?: number;
  radius?: number;
  limit?: number;
  offset?: number;
  minRating?: number;
  minReviews?: number;
  facilities?: string;
  hotelTypes?: string;
  chainIds?: string;
  starRatings?: string;
  language?: string;
}

export interface RoomRate {
  rateId: string;
  roomType: string;
  roomName: string;
  bedType: string;
  maxOccupancy: number;
  price: {
    amount: number;
    currency: string;
  };
  totalPrice: {
    amount: number;
    currency: string;
  };
  cancellationPolicy: string;
  amenities: string[];
  images: string[];
}

export interface RateSearchParams {
  hotelIds: string[];
  checkin: string; // YYYY-MM-DD format
  checkout: string; // YYYY-MM-DD format
  adults: number;
  children?: number;
  currency?: string;
  guestNationality?: string;
  language?: string;
}

export interface BookingRequest {
  transactionId: string;
  guestInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    nationality: string;
  };
  paymentInfo: {
    cardNumber: string;
    expiryMonth: string;
    expiryYear: string;
    cvv: string;
    cardHolderName: string;
  };
}

export interface Booking {
  bookingId: string;
  status: string;
  hotelId: string;
  hotelName: string;
  checkin: string;
  checkout: string;
  guests: number;
  totalPrice: {
    amount: number;
    currency: string;
  };
  confirmationNumber: string;
  guestInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}

export interface Review {
  id: string;
  rating: number;
  title: string;
  content: string;
  author: string;
  date: string;
  helpful: number;
}

class LiteAPIService {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_LITE_API_KEY || '';
    if (!this.apiKey) {
      console.warn('Lite API key not found. Please set NEXT_PUBLIC_LITE_API_KEY environment variable.');
    }
  }

  private async makeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${LITE_API_BASE_URL}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'X-API-Key': this.apiKey,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Lite API request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Search for hotels based on various criteria
   */
  async searchHotels(params: HotelSearchParams): Promise<{ data: Hotel[] }> {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString());
      }
    });

    return this.makeRequest<{ data: Hotel[] }>(`/data/hotels?${searchParams.toString()}`);
  }

  /**
   * Get detailed information about a specific hotel
   */
  async getHotelDetails(hotelId: string, language?: string): Promise<{ data: Hotel }> {
    const params = new URLSearchParams({ hotelId });
    if (language) params.append('language', language);
    
    return this.makeRequest<{ data: Hotel }>(`/data/hotel?${params.toString()}`);
  }

  /**
   * Get reviews for a specific hotel
   */
  async getHotelReviews(hotelId: string, limit?: number, offset?: number): Promise<{ data: Review[] }> {
    const params = new URLSearchParams({ hotelId });
    if (limit) params.append('limit', limit.toString());
    if (offset) params.append('offset', offset.toString());
    
    return this.makeRequest<{ data: Review[] }>(`/data/reviews?${params.toString()}`);
  }

  /**
   * Get room rates for specific hotels
   */
  async getRoomRates(params: RateSearchParams): Promise<{ data: { [hotelId: string]: RoomRate[] } }> {
    return this.makeRequest<{ data: { [hotelId: string]: RoomRate[] } }>('/hotels/rates', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  /**
   * Create a prebooking session (step 1 of booking process)
   */
  async createPrebooking(rateId: string): Promise<{ data: { transactionId: string; expiresAt: string } }> {
    return this.makeRequest<{ data: { transactionId: string; expiresAt: string } }>('/rates/prebook', {
      method: 'POST',
      body: JSON.stringify({ rateId }),
    });
  }

  /**
   * Confirm a booking (step 2 of booking process)
   */
  async confirmBooking(bookingData: BookingRequest): Promise<{ data: Booking }> {
    return this.makeRequest<{ data: Booking }>('/rates/book', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  }

  /**
   * Get all bookings for the current user
   */
  async getBookings(limit?: number, offset?: number): Promise<{ data: Booking[] }> {
    const params = new URLSearchParams();
    if (limit) params.append('limit', limit.toString());
    if (offset) params.append('offset', offset.toString());
    
    return this.makeRequest<{ data: Booking[] }>(`/bookings?${params.toString()}`);
  }

  /**
   * Get details of a specific booking
   */
  async getBookingDetails(bookingId: string): Promise<{ data: Booking }> {
    return this.makeRequest<{ data: Booking }>(`/bookings/${bookingId}`);
  }

  /**
   * Cancel a booking
   */
  async cancelBooking(bookingId: string): Promise<{ data: { status: string; message: string } }> {
    return this.makeRequest<{ data: { status: string; message: string } }>(`/bookings/${bookingId}`, {
      method: 'PUT',
      body: JSON.stringify({ action: 'cancel' }),
    });
  }

  /**
   * Get list of countries
   */
  async getCountries(): Promise<{ data: Array<{ code: string; name: string }> }> {
    return this.makeRequest<{ data: Array<{ code: string; name: string }> }>('/data/countries');
  }

  /**
   * Get list of cities in a country
   */
  async getCities(countryCode: string): Promise<{ data: Array<{ name: string; country: string }> }> {
    return this.makeRequest<{ data: Array<{ name: string; country: string }> }>(`/data/cities?countryCode=${countryCode}`);
  }

  /**
   * Get supported currencies
   */
  async getCurrencies(): Promise<{ data: Array<{ code: string; name: string; symbol: string }> }> {
    return this.makeRequest<{ data: Array<{ code: string; name: string; symbol: string }> }>('/data/currencies');
  }

  /**
   * Get hotel facilities
   */
  async getFacilities(): Promise<{ data: Array<{ id: number; name: string; category: string }> }> {
    return this.makeRequest<{ data: Array<{ id: number; name: string; category: string }> }>('/data/facilities');
  }

  /**
   * Get hotel types
   */
  async getHotelTypes(): Promise<{ data: Array<{ id: number; name: string }> }> {
    return this.makeRequest<{ data: Array<{ id: number; name: string }> }>('/data/hotelTypes');
  }

  /**
   * Get hotel chains
   */
  async getHotelChains(): Promise<{ data: Array<{ id: number; name: string }> }> {
    return this.makeRequest<{ data: Array<{ id: number; name: string }> }>('/data/chains');
  }
}

// Export singleton instance
export const liteAPI = new LiteAPIService();
export default liteAPI;