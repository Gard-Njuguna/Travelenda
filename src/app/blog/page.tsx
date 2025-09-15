'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Search, Calendar, User, Tag, ArrowRight, Clock, TrendingUp } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { BlogPost } from '@/types/database'

interface BlogPageProps {
  searchParams: {
    category?: string
    search?: string
    page?: string
  }
}

const POSTS_PER_PAGE = 12

const categories = [
  { id: 'all', name: 'All Posts', count: 0 },
  { id: 'destinations', name: 'Destinations', count: 0 },
  { id: 'travel-tips', name: 'Travel Tips', count: 0 },
  { id: 'hotel-reviews', name: 'Hotel Reviews', count: 0 },
  { id: 'food-travel', name: 'Food & Travel', count: 0 },
  { id: 'budget-travel', name: 'Budget Travel', count: 0 },
  { id: 'luxury-travel', name: 'Luxury Travel', count: 0 }
]

export default function BlogPage({ searchParams }: BlogPageProps) {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState(searchParams.search || '')
  const [totalPosts, setTotalPosts] = useState(0)
  
  const currentCategory = searchParams.category || 'all'
  const currentPage = parseInt(searchParams.page || '1')
  
  useEffect(() => {
    fetchPosts()
    fetchFeaturedPosts()
  }, [currentCategory, searchParams.search, currentPage])
  
  const fetchPosts = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // For now, we'll use mock data since Supabase isn't set up yet
      const mockPosts: BlogPost[] = [
        {
          id: '1',
          title: 'Top 10 Hidden Gems in Paris You Must Visit',
          slug: 'top-10-hidden-gems-paris',
          excerpt: 'Discover the secret spots in Paris that most tourists never see. From hidden gardens to underground bars, explore the city like a local.',
          content: '',
          featured_image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800',
          category: 'destinations',
          tags: ['paris', 'hidden-gems', 'travel-guide'],
          author_id: 'author1',
          published: true,
          featured: true,
          views: 15420,
          reading_time: 8,
          created_at: '2024-01-15T10:00:00Z',
          updated_at: '2024-01-15T10:00:00Z',
          published_at: '2024-01-15T10:00:00Z'
        },
        {
          id: '2',
          title: 'Budget Travel: How to See Europe for Under $50 a Day',
          slug: 'budget-travel-europe-50-dollars',
          excerpt: 'Learn the insider secrets to traveling through Europe on a shoestring budget without sacrificing comfort or experiences.',
          content: '',
          featured_image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800',
          category: 'budget-travel',
          tags: ['budget-travel', 'europe', 'backpacking'],
          author_id: 'author2',
          published: true,
          featured: false,
          views: 8930,
          reading_time: 12,
          created_at: '2024-01-12T14:30:00Z',
          updated_at: '2024-01-12T14:30:00Z',
          published_at: '2024-01-12T14:30:00Z'
        },
        {
          id: '3',
          title: 'Luxury Hotel Review: The Ritz-Carlton Tokyo',
          slug: 'luxury-hotel-review-ritz-carlton-tokyo',
          excerpt: 'An in-depth review of one of Tokyo\'s most prestigious hotels, including amenities, service, and whether it\'s worth the splurge.',
          content: '',
          featured_image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
          category: 'hotel-reviews',
          tags: ['luxury-hotels', 'tokyo', 'hotel-review'],
          author_id: 'author1',
          published: true,
          featured: true,
          views: 12650,
          reading_time: 6,
          created_at: '2024-01-10T09:15:00Z',
          updated_at: '2024-01-10T09:15:00Z',
          published_at: '2024-01-10T09:15:00Z'
        },
        {
          id: '4',
          title: '10 Essential Travel Tips for First-Time International Travelers',
          slug: 'essential-travel-tips-first-time-international',
          excerpt: 'Everything you need to know before your first international trip, from passport requirements to cultural etiquette.',
          content: '',
          featured_image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800',
          category: 'travel-tips',
          tags: ['travel-tips', 'first-time-travel', 'international'],
          author_id: 'author3',
          published: true,
          featured: false,
          views: 22100,
          reading_time: 10,
          created_at: '2024-01-08T16:45:00Z',
          updated_at: '2024-01-08T16:45:00Z',
          published_at: '2024-01-08T16:45:00Z'
        },
        {
          id: '5',
          title: 'Food Adventures: Street Food Guide to Bangkok',
          slug: 'street-food-guide-bangkok',
          excerpt: 'Navigate Bangkok\'s incredible street food scene with our comprehensive guide to the best dishes and where to find them.',
          content: '',
          featured_image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
          category: 'food-travel',
          tags: ['bangkok', 'street-food', 'food-guide'],
          author_id: 'author2',
          published: true,
          featured: true,
          views: 18750,
          reading_time: 9,
          created_at: '2024-01-05T11:20:00Z',
          updated_at: '2024-01-05T11:20:00Z',
          published_at: '2024-01-05T11:20:00Z'
        },
        {
          id: '6',
          title: 'The Ultimate Luxury Safari Experience in Kenya',
          slug: 'ultimate-luxury-safari-kenya',
          excerpt: 'Experience the wild side of luxury with our guide to Kenya\'s most exclusive safari lodges and experiences.',
          content: '',
          featured_image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800',
          category: 'luxury-travel',
          tags: ['safari', 'kenya', 'luxury-travel'],
          author_id: 'author1',
          published: true,
          featured: false,
          views: 9420,
          reading_time: 11,
          created_at: '2024-01-03T13:10:00Z',
          updated_at: '2024-01-03T13:10:00Z',
          published_at: '2024-01-03T13:10:00Z'
        }
      ]
      
      // Filter posts based on category and search
      let filteredPosts = mockPosts
      
      if (currentCategory !== 'all') {
        filteredPosts = filteredPosts.filter(post => post.category === currentCategory)
      }
      
      if (searchParams.search) {
        const searchLower = searchParams.search.toLowerCase()
        filteredPosts = filteredPosts.filter(post => 
          post.title.toLowerCase().includes(searchLower) ||
          post.excerpt.toLowerCase().includes(searchLower) ||
          post.tags.some(tag => tag.toLowerCase().includes(searchLower))
        )
      }
      
      // Pagination
      const startIndex = (currentPage - 1) * POSTS_PER_PAGE
      const paginatedPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE)
      
      setPosts(paginatedPosts)
      setTotalPosts(filteredPosts.length)
      
    } catch (err) {
      console.error('Error fetching posts:', err)
      setError('Failed to load blog posts. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  const fetchFeaturedPosts = async () => {
    try {
      // Mock featured posts
      const mockFeatured: BlogPost[] = [
        {
          id: '1',
          title: 'Top 10 Hidden Gems in Paris You Must Visit',
          slug: 'top-10-hidden-gems-paris',
          excerpt: 'Discover the secret spots in Paris that most tourists never see.',
          content: '',
          featured_image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800',
          category: 'destinations',
          tags: ['paris', 'hidden-gems'],
          author_id: 'author1',
          published: true,
          featured: true,
          views: 15420,
          reading_time: 8,
          created_at: '2024-01-15T10:00:00Z',
          updated_at: '2024-01-15T10:00:00Z',
          published_at: '2024-01-15T10:00:00Z'
        }
      ]
      
      setFeaturedPosts(mockFeatured)
    } catch (err) {
      console.error('Error fetching featured posts:', err)
    }
  }
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (searchQuery) params.set('search', searchQuery)
    if (currentCategory !== 'all') params.set('category', currentCategory)
    window.location.href = `/blog?${params.toString()}`
  }
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
  
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Travel Stories & Guides
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Discover amazing destinations, get insider travel tips, and read honest hotel reviews from our travel experts.
            </p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-md mx-auto">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full px-4 py-3 pl-12 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              {/* Categories */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/blog${category.id === 'all' ? '' : `?category=${category.id}`}`}
                      className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                        currentCategory === category.id
                          ? 'bg-blue-100 text-blue-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{category.name}</span>
                        {category.count > 0 && (
                          <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                            {category.count}
                          </span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Featured Posts */}
              {featuredPosts.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                    Featured
                  </h3>
                  <div className="space-y-4">
                    {featuredPosts.slice(0, 3).map((post) => (
                      <Link
                        key={post.id}
                        href={`/blog/${post.slug}`}
                        className="block group"
                      >
                        <div className="flex space-x-3">
                          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={post.featured_image || '/placeholder-image.jpg'}
                              alt={post.title}
                              width={64}
                              height={64}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 text-sm line-clamp-2 group-hover:text-blue-600 transition-colors">
                              {post.title}
                            </h4>
                            <div className="flex items-center text-xs text-gray-500 mt-1">
                              <Calendar className="w-3 h-3 mr-1" />
                              {formatDate(post.published_at || post.created_at)}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 6 }, (_, i) => (
                  <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
                    <div className="aspect-video bg-gray-200"></div>
                    <div className="p-6">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                      <div className="h-3 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-600 mb-4">{error}</p>
                <button
                  onClick={fetchPosts}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">
                  {searchParams.search ? 'No articles found for your search.' : 'No articles found in this category.'}
                </p>
                <Link
                  href="/blog"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  View all articles
                </Link>
              </div>
            ) : (
              <>
                {/* Results Header */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {currentCategory === 'all' ? 'All Articles' : categories.find(c => c.id === currentCategory)?.name}
                    </h2>
                    <p className="text-gray-600 mt-1">
                      {totalPosts} article{totalPosts !== 1 ? 's' : ''} found
                      {searchParams.search && ` for "${searchParams.search}"`}
                    </p>
                  </div>
                </div>
                
                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
                  {posts.map((post) => (
                    <article key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
                      <Link href={`/blog/${post.slug}`}>
                        <div className="aspect-video relative overflow-hidden">
                          <Image
                            src={post.featured_image || '/placeholder-image.jpg'}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-4 left-4">
                            <span className="bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full text-xs font-medium capitalize">
                              {post.category.replace('-', ' ')}
                            </span>
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center">
                                <Calendar className="w-3 h-3 mr-1" />
                                {formatDate(post.published_at || post.created_at)}
                              </div>
                              <div className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {post.reading_time} min read
                              </div>
                            </div>
                            <div className="flex items-center text-blue-600 group-hover:text-blue-700">
                              <span className="mr-1">Read more</span>
                              <ArrowRight className="w-3 h-3" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center space-x-2">
                    {currentPage > 1 && (
                      <Link
                        href={`/blog?${new URLSearchParams({ 
                          ...(currentCategory !== 'all' && { category: currentCategory }),
                          ...(searchParams.search && { search: searchParams.search }),
                          page: (currentPage - 1).toString()
                        }).toString()}`}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Previous
                      </Link>
                    )}
                    
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNum = i + 1
                      return (
                        <Link
                          key={pageNum}
                          href={`/blog?${new URLSearchParams({ 
                            ...(currentCategory !== 'all' && { category: currentCategory }),
                            ...(searchParams.search && { search: searchParams.search }),
                            page: pageNum.toString()
                          }).toString()}`}
                          className={`px-4 py-2 rounded-lg transition-colors ${
                            currentPage === pageNum
                              ? 'bg-blue-600 text-white'
                              : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {pageNum}
                        </Link>
                      )
                    })}
                    
                    {currentPage < totalPages && (
                      <Link
                        href={`/blog?${new URLSearchParams({ 
                          ...(currentCategory !== 'all' && { category: currentCategory }),
                          ...(searchParams.search && { search: searchParams.search }),
                          page: (currentPage + 1).toString()
                        }).toString()}`}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Next
                      </Link>
                    )}
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