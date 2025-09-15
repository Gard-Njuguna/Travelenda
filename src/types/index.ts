// Core Types for Travelenda Application

export interface Hotel {
  id: string
  name: string
  description: string
  address: string
  city: string
  country: string
  latitude: number
  longitude: number
  rating: number
  reviewCount: number
  images: string[]
  amenities: string[]
  priceRange: {
    min: number
    max: number
    currency: string
  }
  rooms: Room[]
}

export interface Room {
  id: string
  name: string
  description: string
  maxOccupancy: number
  bedType: string
  size: number
  amenities: string[]
  images: string[]
  price: number
  currency: string
  availability: boolean
}

export interface SearchParams {
  destination: string
  cityCode?: string
  checkin: string
  checkout: string
  adults: number
  children: number
  rooms: number
  currency?: string
}

export interface SearchFilters {
  priceRange: [number, number]
  rating: number[]
  amenities: string[]
  propertyType: string[]
  sortBy: 'price' | 'rating' | 'distance' | 'popularity'
  sortOrder: 'asc' | 'desc'
}

export interface BookingDetails {
  id: string
  hotelId: string
  roomId: string
  guestInfo: GuestInfo
  checkin: string
  checkout: string
  adults: number
  children: number
  totalPrice: number
  currency: string
  status: 'pending' | 'confirmed' | 'cancelled'
  bookingReference: string
  createdAt: string
}

export interface GuestInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  nationality?: string
  specialRequests?: string
}

export interface City {
  code: string
  name: string
  country: string
  countryCode: string
  latitude: number
  longitude: number
}

export interface Country {
  code: string
  name: string
}

// Blog Types
export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage: string
  author: Author
  category: BlogCategory
  tags: string[]
  publishedAt: string
  updatedAt: string
  readTime: number
  seoTitle?: string
  seoDescription?: string
  isPublished: boolean
}

export interface Author {
  id: string
  name: string
  email: string
  avatar?: string
  bio?: string
  socialLinks?: {
    twitter?: string
    linkedin?: string
    website?: string
  }
}

export interface BlogCategory {
  id: string
  name: string
  slug: string
  description?: string
  color?: string
}

// User Types
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  avatar?: string
  phone?: string
  dateOfBirth?: string
  nationality?: string
  preferences: UserPreferences
  bookings: BookingDetails[]
  createdAt: string
  updatedAt: string
}

export interface UserPreferences {
  currency: string
  language: string
  newsletter: boolean
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
  }
}

// API Response Types
export interface APIResponse<T> {
  success: boolean
  data: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Component Props Types
export interface SearchFormProps {
  onSearch: (params: SearchParams) => void
  loading?: boolean
  initialValues?: Partial<SearchParams>
}

export interface HotelCardProps {
  hotel: Hotel
  searchParams?: SearchParams
  onSelect?: (hotel: Hotel) => void
}

export interface FilterSidebarProps {
  filters: SearchFilters
  onFiltersChange: (filters: SearchFilters) => void
  priceRange: [number, number]
  availableAmenities: string[]
}

// Utility Types
export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

export interface AsyncState<T> {
  data: T | null
  loading: boolean
  error: string | null
}