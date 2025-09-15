import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxMjM0NTYsImV4cCI6MTk2MDY5OTQ1Nn0.placeholder_key'

// Create a mock client for development when Supabase is not configured
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Server-side client for admin operations
export const supabaseAdmin = createClient<Database>(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY0NTEyMzQ1NiwiZXhwIjoxOTYwNjk5NDU2fQ.placeholder_service_key',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

// Helper functions for common operations
export const auth = {
  signUp: async (email: string, password: string, userData?: any) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    })
    return { data, error }
  },

  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  getCurrentUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  },

  getSession: async () => {
    const { data: { session }, error } = await supabase.auth.getSession()
    return { session, error }
  }
}

// Database helper functions
export const db = {
  // Profile operations
  profiles: {
    get: async (userId: string) => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
      return { data, error }
    },

    update: async (userId: string, updates: any) => {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single()
      return { data, error }
    },

    create: async (profile: any) => {
      const { data, error } = await supabase
        .from('profiles')
        .insert(profile)
        .select()
        .single()
      return { data, error }
    }
  },

  // Hotel operations
  hotels: {
    search: async (filters: any) => {
      let query = supabase.from('hotels').select('*')
      
      if (filters.city) {
        query = query.ilike('city', `%${filters.city}%`)
      }
      if (filters.country) {
        query = query.ilike('country', `%${filters.country}%`)
      }
      if (filters.minRating) {
        query = query.gte('star_rating', filters.minRating)
      }
      
      const { data, error } = await query.limit(filters.limit || 20)
      return { data, error }
    },

    getById: async (hotelId: string) => {
      const { data, error } = await supabase
        .from('hotels')
        .select('*')
        .eq('id', hotelId)
        .single()
      return { data, error }
    },

    upsert: async (hotel: any) => {
      const { data, error } = await supabase
        .from('hotels')
        .upsert(hotel)
        .select()
        .single()
      return { data, error }
    }
  },

  // Booking operations
  bookings: {
    create: async (booking: any) => {
      const { data, error } = await supabase
        .from('bookings')
        .insert(booking)
        .select()
        .single()
      return { data, error }
    },

    getUserBookings: async (userId: string) => {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          hotels(*)
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
      return { data, error }
    },

    getById: async (bookingId: string) => {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          hotels(*),
          profiles(*)
        `)
        .eq('id', bookingId)
        .single()
      return { data, error }
    },

    updateStatus: async (bookingId: string, status: string) => {
      const { data, error } = await supabase
        .from('bookings')
        .update({ booking_status: status })
        .eq('id', bookingId)
        .select()
        .single()
      return { data, error }
    }
  },

  // Blog operations
  blog: {
    getPosts: async (filters: any = {}) => {
      let query = supabase
        .from('blog_posts')
        .select(`
          *,
          blog_categories(*),
          profiles(full_name, avatar_url)
        `)
        .eq('is_published', true)

      if (filters.category) {
        query = query.eq('category_id', filters.category)
      }
      if (filters.featured) {
        query = query.eq('is_featured', true)
      }
      if (filters.limit) {
        query = query.limit(filters.limit)
      }

      const { data, error } = await query.order('published_at', { ascending: false })
      return { data, error }
    },

    getBySlug: async (slug: string) => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          *,
          blog_categories(*),
          profiles(full_name, avatar_url)
        `)
        .eq('slug', slug)
        .eq('is_published', true)
        .single()
      return { data, error }
    },

    getCategories: async () => {
      const { data, error } = await supabase
        .from('blog_categories')
        .select('*')
        .order('name')
      return { data, error }
    },

    incrementViewCount: async (postId: string) => {
      const { error } = await supabase.rpc('increment_view_count', {
        post_id: postId
      })
      return { error }
    }
  },

  // Review operations
  reviews: {
    getHotelReviews: async (hotelId: string) => {
      const { data, error } = await supabase
        .from('hotel_reviews')
        .select(`
          *,
          profiles(full_name, avatar_url)
        `)
        .eq('hotel_id', hotelId)
        .order('created_at', { ascending: false })
      return { data, error }
    },

    create: async (review: any) => {
      const { data, error } = await supabase
        .from('hotel_reviews')
        .insert(review)
        .select()
        .single()
      return { data, error }
    }
  },

  // Newsletter operations
  newsletter: {
    subscribe: async (email: string, name?: string) => {
      const { data, error } = await supabase
        .from('newsletter_subscriptions')
        .upsert({ email, name, is_active: true })
        .select()
        .single()
      return { data, error }
    },

    unsubscribe: async (email: string) => {
      const { data, error } = await supabase
        .from('newsletter_subscriptions')
        .update({ is_active: false, unsubscribed_at: new Date().toISOString() })
        .eq('email', email)
        .select()
        .single()
      return { data, error }
    }
  }
}

export default supabase