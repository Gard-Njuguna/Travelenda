export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          phone: string | null
          date_of_birth: string | null
          nationality: string | null
          preferred_currency: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          date_of_birth?: string | null
          nationality?: string | null
          preferred_currency?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          date_of_birth?: string | null
          nationality?: string | null
          preferred_currency?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      hotels: {
        Row: {
          id: string
          name: string
          description: string | null
          address: string | null
          city: string | null
          country: string | null
          latitude: number | null
          longitude: number | null
          star_rating: number | null
          amenities: Json | null
          images: Json | null
          contact_info: Json | null
          policies: Json | null
          lite_api_data: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name: string
          description?: string | null
          address?: string | null
          city?: string | null
          country?: string | null
          latitude?: number | null
          longitude?: number | null
          star_rating?: number | null
          amenities?: Json | null
          images?: Json | null
          contact_info?: Json | null
          policies?: Json | null
          lite_api_data?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          address?: string | null
          city?: string | null
          country?: string | null
          latitude?: number | null
          longitude?: number | null
          star_rating?: number | null
          amenities?: Json | null
          images?: Json | null
          contact_info?: Json | null
          policies?: Json | null
          lite_api_data?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          user_id: string | null
          hotel_id: string | null
          lite_api_booking_id: string | null
          guest_name: string
          guest_email: string
          guest_phone: string | null
          check_in_date: string
          check_out_date: string
          adults: number
          children: number | null
          rooms: number
          room_type: string | null
          total_amount: number
          currency: string | null
          commission_amount: number | null
          commission_rate: number | null
          booking_status: string | null
          payment_status: string | null
          payment_method: string | null
          special_requests: string | null
          booking_data: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          hotel_id?: string | null
          lite_api_booking_id?: string | null
          guest_name: string
          guest_email: string
          guest_phone?: string | null
          check_in_date: string
          check_out_date: string
          adults?: number
          children?: number | null
          rooms?: number
          room_type?: string | null
          total_amount: number
          currency?: string | null
          commission_amount?: number | null
          commission_rate?: number | null
          booking_status?: string | null
          payment_status?: string | null
          payment_method?: string | null
          special_requests?: string | null
          booking_data?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          hotel_id?: string | null
          lite_api_booking_id?: string | null
          guest_name?: string
          guest_email?: string
          guest_phone?: string | null
          check_in_date?: string
          check_out_date?: string
          adults?: number
          children?: number | null
          rooms?: number
          room_type?: string | null
          total_amount?: number
          currency?: string | null
          commission_amount?: number | null
          commission_rate?: number | null
          booking_status?: string | null
          payment_status?: string | null
          payment_method?: string | null
          special_requests?: string | null
          booking_data?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      blog_categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          color: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          color?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          color?: string | null
          created_at?: string
        }
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string | null
          content: string
          featured_image: string | null
          author_id: string | null
          category_id: string | null
          tags: string[] | null
          meta_title: string | null
          meta_description: string | null
          is_published: boolean | null
          is_featured: boolean | null
          published_at: string | null
          reading_time: number | null
          view_count: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          excerpt?: string | null
          content: string
          featured_image?: string | null
          author_id?: string | null
          category_id?: string | null
          tags?: string[] | null
          meta_title?: string | null
          meta_description?: string | null
          is_published?: boolean | null
          is_featured?: boolean | null
          published_at?: string | null
          reading_time?: number | null
          view_count?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          excerpt?: string | null
          content?: string
          featured_image?: string | null
          author_id?: string | null
          category_id?: string | null
          tags?: string[] | null
          meta_title?: string | null
          meta_description?: string | null
          is_published?: boolean | null
          is_featured?: boolean | null
          published_at?: string | null
          reading_time?: number | null
          view_count?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      hotel_reviews: {
        Row: {
          id: string
          hotel_id: string | null
          user_id: string | null
          booking_id: string | null
          rating: number
          title: string | null
          review_text: string
          pros: string[] | null
          cons: string[] | null
          room_type: string | null
          travel_type: string | null
          is_verified: boolean | null
          helpful_count: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          hotel_id?: string | null
          user_id?: string | null
          booking_id?: string | null
          rating: number
          title?: string | null
          review_text: string
          pros?: string[] | null
          cons?: string[] | null
          room_type?: string | null
          travel_type?: string | null
          is_verified?: boolean | null
          helpful_count?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          hotel_id?: string | null
          user_id?: string | null
          booking_id?: string | null
          rating?: number
          title?: string | null
          review_text?: string
          pros?: string[] | null
          cons?: string[] | null
          room_type?: string | null
          travel_type?: string | null
          is_verified?: boolean | null
          helpful_count?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      search_history: {
        Row: {
          id: string
          user_id: string | null
          search_query: string | null
          destination: string | null
          check_in_date: string | null
          check_out_date: string | null
          adults: number | null
          children: number | null
          rooms: number | null
          filters: Json | null
          results_count: number | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          search_query?: string | null
          destination?: string | null
          check_in_date?: string | null
          check_out_date?: string | null
          adults?: number | null
          children?: number | null
          rooms?: number | null
          filters?: Json | null
          results_count?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          search_query?: string | null
          destination?: string | null
          check_in_date?: string | null
          check_out_date?: string | null
          adults?: number | null
          children?: number | null
          rooms?: number | null
          filters?: Json | null
          results_count?: number | null
          created_at?: string
        }
      }
      newsletter_subscriptions: {
        Row: {
          id: string
          email: string
          name: string | null
          is_active: boolean | null
          preferences: Json | null
          subscribed_at: string
          unsubscribed_at: string | null
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          is_active?: boolean | null
          preferences?: Json | null
          subscribed_at?: string
          unsubscribed_at?: string | null
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          is_active?: boolean | null
          preferences?: Json | null
          subscribed_at?: string
          unsubscribed_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_view_count: {
        Args: {
          post_id: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Helper types for easier usage
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Hotel = Database['public']['Tables']['hotels']['Row']
export type Booking = Database['public']['Tables']['bookings']['Row']
export type BlogPost = Database['public']['Tables']['blog_posts']['Row']
export type BlogCategory = Database['public']['Tables']['blog_categories']['Row']
export type HotelReview = Database['public']['Tables']['hotel_reviews']['Row']
export type SearchHistory = Database['public']['Tables']['search_history']['Row']
export type NewsletterSubscription = Database['public']['Tables']['newsletter_subscriptions']['Row']

// Insert types
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert']
export type HotelInsert = Database['public']['Tables']['hotels']['Insert']
export type BookingInsert = Database['public']['Tables']['bookings']['Insert']
export type BlogPostInsert = Database['public']['Tables']['blog_posts']['Insert']
export type HotelReviewInsert = Database['public']['Tables']['hotel_reviews']['Insert']

// Update types
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update']
export type HotelUpdate = Database['public']['Tables']['hotels']['Update']
export type BookingUpdate = Database['public']['Tables']['bookings']['Update']
export type BlogPostUpdate = Database['public']['Tables']['blog_posts']['Update']

// Extended types with relations
export type BookingWithHotel = Booking & {
  hotels: Hotel | null
}

export type BlogPostWithCategory = BlogPost & {
  blog_categories: BlogCategory | null
  profiles: Pick<Profile, 'full_name' | 'avatar_url'> | null
}

export type HotelReviewWithProfile = HotelReview & {
  profiles: Pick<Profile, 'full_name' | 'avatar_url'> | null
}