'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Search, 
  Filter, 
  Calendar,
  Users,
  FileText,
  TrendingUp,
  BarChart3,
  Settings,
  LogOut
} from 'lucide-react'
import { supabase, getCurrentUser, signOut } from '@/lib/supabase'
import type { BlogPost, User } from '@/types/database'

interface DashboardStats {
  totalPosts: number
  publishedPosts: number
  draftPosts: number
  totalViews: number
  totalUsers: number
  totalBookings: number
}

export default function AdminDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [stats, setStats] = useState<DashboardStats>({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    totalViews: 0,
    totalUsers: 0,
    totalBookings: 0
  })
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all')
  const [selectedPosts, setSelectedPosts] = useState<string[]>([])
  
  useEffect(() => {
    checkAuth()
    fetchDashboardData()
  }, [])
  
  const checkAuth = async () => {
    try {
      const currentUser = await getCurrentUser()
      if (!currentUser) {
        router.push('/auth/login')
        return
      }
      
      // Check if user is admin (in real app, check user role)
      setUser(currentUser)
    } catch (error) {
      console.error('Auth error:', error)
      router.push('/auth/login')
    }
  }
  
  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      
      // Mock data (in real app, fetch from Supabase)
      const mockPosts: BlogPost[] = [
        {
          id: '1',
          title: 'Top 10 Hidden Gems in Paris You Must Visit',
          slug: 'top-10-hidden-gems-paris',
          excerpt: 'Discover the secret spots in Paris that most tourists never see.',
          content: 'Full article content...',
          featured_image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400',
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
          excerpt: 'Learn the insider secrets to traveling through Europe on a shoestring budget.',
          content: 'Full article content...',
          featured_image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400',
          category: 'budget-travel',
          tags: ['budget-travel', 'europe'],
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
          title: 'Ultimate Guide to Solo Female Travel Safety',
          slug: 'solo-female-travel-safety-guide',
          excerpt: 'Essential tips and strategies for women traveling alone safely and confidently.',
          content: 'Draft content...',
          featured_image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400',
          category: 'travel-tips',
          tags: ['solo-travel', 'safety', 'female-travel'],
          author_id: 'author1',
          published: false,
          featured: false,
          views: 0,
          reading_time: 15,
          created_at: '2024-01-10T09:15:00Z',
          updated_at: '2024-01-10T09:15:00Z',
          published_at: null
        }
      ]
      
      const mockStats: DashboardStats = {
        totalPosts: 3,
        publishedPosts: 2,
        draftPosts: 1,
        totalViews: 24350,
        totalUsers: 1250,
        totalBookings: 89
      }
      
      setPosts(mockPosts)
      setStats(mockStats)
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }
  
  const handleSignOut = async () => {
    try {
      await signOut()
      router.push('/')
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }
  
  const togglePostStatus = async (postId: string, currentStatus: boolean) => {
    try {
      // In real app, update in Supabase
      setPosts(posts.map(post => 
        post.id === postId 
          ? { ...post, published: !currentStatus, published_at: !currentStatus ? new Date().toISOString() : null }
          : post
      ))
    } catch (error) {
      console.error('Error updating post status:', error)
    }
  }
  
  const deletePost = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return
    
    try {
      // In real app, delete from Supabase
      setPosts(posts.filter(post => post.id !== postId))
    } catch (error) {
      console.error('Error deleting post:', error)
    }
  }
  
  const bulkAction = async (action: 'publish' | 'unpublish' | 'delete') => {
    if (selectedPosts.length === 0) return
    
    if (action === 'delete' && !confirm(`Are you sure you want to delete ${selectedPosts.length} posts?`)) {
      return
    }
    
    try {
      if (action === 'delete') {
        setPosts(posts.filter(post => !selectedPosts.includes(post.id)))
      } else {
        const published = action === 'publish'
        setPosts(posts.map(post => 
          selectedPosts.includes(post.id)
            ? { ...post, published, published_at: published ? new Date().toISOString() : null }
            : post
        ))
      }
      setSelectedPosts([])
    } catch (error) {
      console.error('Error performing bulk action:', error)
    }
  }
  
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'published' && post.published) ||
                         (filterStatus === 'draft' && !post.published)
    return matchesSearch && matchesFilter
  })
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                Travelenda
              </Link>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600 font-medium">Admin Dashboard</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                View Site
              </Link>
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Posts</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalPosts}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Published</p>
                <p className="text-2xl font-bold text-green-600">{stats.publishedPosts}</p>
              </div>
              <Eye className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Drafts</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.draftPosts}</p>
              </div>
              <EyeOff className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-purple-600">{stats.totalViews.toLocaleString()}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Users</p>
                <p className="text-2xl font-bold text-indigo-600">{stats.totalUsers.toLocaleString()}</p>
              </div>
              <Users className="w-8 h-8 text-indigo-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Bookings</p>
                <p className="text-2xl font-bold text-red-600">{stats.totalBookings}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-red-600" />
            </div>
          </div>
        </div>
        
        {/* Posts Management */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <h2 className="text-lg font-semibold text-gray-900">Blog Posts</h2>
              
              <Link
                href="/admin/posts/new"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </Link>
            </div>
            
            {/* Search and Filters */}
            <div className="mt-4 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as 'all' | 'published' | 'draft')}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Posts</option>
                  <option value="published">Published</option>
                  <option value="draft">Drafts</option>
                </select>
              </div>
            </div>
            
            {/* Bulk Actions */}
            {selectedPosts.length > 0 && (
              <div className="mt-4 flex items-center space-x-4 p-3 bg-blue-50 rounded-lg">
                <span className="text-sm text-blue-700">
                  {selectedPosts.length} post{selectedPosts.length !== 1 ? 's' : ''} selected
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => bulkAction('publish')}
                    className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors"
                  >
                    Publish
                  </button>
                  <button
                    onClick={() => bulkAction('unpublish')}
                    className="text-sm bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700 transition-colors"
                  >
                    Unpublish
                  </button>
                  <button
                    onClick={() => bulkAction('delete')}
                    className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Posts Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedPosts.length === filteredPosts.length && filteredPosts.length > 0}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedPosts(filteredPosts.map(post => post.id))
                        } else {
                          setSelectedPosts([])
                        }
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Post
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Views
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedPosts.includes(post.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedPosts([...selectedPosts, post.id])
                          } else {
                            setSelectedPosts(selectedPosts.filter(id => id !== post.id))
                          }
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        {post.featured_image && (
                          <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={post.featured_image}
                              alt={post.title}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-medium text-gray-900 line-clamp-1">
                            {post.title}
                          </p>
                          <p className="text-sm text-gray-500 line-clamp-1">
                            {post.excerpt}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        post.published 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 capitalize">
                      {post.category.replace('-', ' ')}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {post.views.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(post.updated_at)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Link
                          href={`/admin/posts/${post.id}/edit`}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => togglePostStatus(post.id, post.published)}
                          className={`transition-colors ${
                            post.published 
                              ? 'text-yellow-600 hover:text-yellow-900' 
                              : 'text-green-600 hover:text-green-900'
                          }`}
                        >
                          {post.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => deletePost(post.id)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No posts found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}