'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, User, Tag, Share2, Heart, ArrowLeft, Eye, Facebook, Twitter, Linkedin } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { BlogPost } from '@/types/database'

export default function BlogPostPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  
  const [post, setPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isLiked, setIsLiked] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)
  
  useEffect(() => {
    fetchPost()
  }, [slug])
  
  const fetchPost = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Mock blog post data (in real app, this would come from Supabase)
      const mockPost: BlogPost = {
        id: '1',
        title: 'Top 10 Hidden Gems in Paris You Must Visit',
        slug: 'top-10-hidden-gems-paris',
        excerpt: 'Discover the secret spots in Paris that most tourists never see. From hidden gardens to underground bars, explore the city like a local.',
        content: `
          <p>Paris is known for its iconic landmarks like the Eiffel Tower and Louvre Museum, but the City of Light holds countless secrets waiting to be discovered. After living in Paris for over five years, I've uncovered some truly magical places that most tourists never see.</p>
          
          <h2>1. Promenade Plantée (The High Line of Paris)</h2>
          <p>Long before New York's High Line became famous, Paris had its own elevated park. The Promenade Plantée is a 4.7-kilometer linear park built on an old railway viaduct. Starting near Bastille, this green oasis offers a unique perspective of the city as you walk among treetops and gardens.</p>
          
          <h2>2. Musée de la Chasse et de la Nature</h2>
          <p>This quirky museum in the Marais district combines hunting and nature in the most unexpected ways. The museum's eclectic collection includes everything from medieval hunting weapons to contemporary art installations featuring taxidermied animals.</p>
          
          <h2>3. Passage des Panoramas</h2>
          <p>Built in 1800, this is one of Paris's oldest covered passages. While tourists flock to Galerie Vivienne, locals know that Passage des Panoramas offers the same charm with fewer crowds. The passage is home to excellent restaurants, vintage shops, and the famous stamp market.</p>
          
          <h2>4. Square du Vert-Galant</h2>
          <p>Located at the tip of Île de la Cité, this small triangular park offers some of the best views of the Seine and surrounding architecture. It's the perfect spot for a picnic while watching boats pass by.</p>
          
          <h2>5. Musée Nissim de Camondo</h2>
          <p>This mansion-turned-museum showcases an incredible collection of 18th-century French decorative arts. The tragic story of the Camondo family adds depth to your visit, making it both beautiful and poignant.</p>
          
          <h2>6. Rue Crémieux</h2>
          <p>This colorful cobblestone street looks like it belongs in a fairy tale. The pastel-colored houses make it one of the most Instagram-worthy spots in Paris, yet it remains relatively unknown to tourists.</p>
          
          <h2>7. Parc des Buttes-Chaumont</h2>
          <p>While not entirely hidden, this park in the 19th arrondissement is often overlooked by visitors. Built on a former quarry, it features dramatic cliffs, waterfalls, and a temple perched on a rocky island.</p>
          
          <h2>8. La REcyclerie</h2>
          <p>This eco-friendly café and cultural space is built in a former railway station. It combines sustainable dining with urban farming, workshops, and events. The outdoor terrace offers a peaceful escape from the city bustle.</p>
          
          <h2>9. Musée de la Magie</h2>
          <p>Hidden in the basement of a Marais mansion, this magic museum showcases the history of illusion and prestidigitation. Interactive demonstrations make it fun for visitors of all ages.</p>
          
          <h2>10. Cour Saint-Émilion</h2>
          <p>This former wine warehouse in Bercy has been transformed into a charming shopping and dining area. The cobblestone courtyard and ivy-covered buildings create a village-like atmosphere within the city.</p>
          
          <h2>Tips for Exploring Hidden Paris</h2>
          <ul>
            <li>Visit early in the morning or late afternoon for the best light and fewer crowds</li>
            <li>Bring comfortable walking shoes as many hidden gems require some walking</li>
            <li>Learn a few French phrases - locals appreciate the effort and may share their own secret spots</li>
            <li>Don't be afraid to wander down small streets and alleys</li>
            <li>Check opening hours in advance, as some smaller attractions have limited schedules</li>
          </ul>
          
          <p>Paris rewards those who venture beyond the obvious attractions. These hidden gems offer authentic experiences and unique perspectives on the city's rich history and culture. Next time you're in Paris, skip the tourist traps and discover the secrets that make this city truly magical.</p>
        `,
        featured_image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=1200',
        category: 'destinations',
        tags: ['paris', 'hidden-gems', 'travel-guide', 'france', 'europe'],
        author_id: 'author1',
        published: true,
        featured: true,
        views: 15420,
        reading_time: 8,
        created_at: '2024-01-15T10:00:00Z',
        updated_at: '2024-01-15T10:00:00Z',
        published_at: '2024-01-15T10:00:00Z'
      }
      
      // Mock related posts
      const mockRelatedPosts: BlogPost[] = [
        {
          id: '2',
          title: 'Budget Travel: How to See Europe for Under $50 a Day',
          slug: 'budget-travel-europe-50-dollars',
          excerpt: 'Learn the insider secrets to traveling through Europe on a shoestring budget.',
          content: '',
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
          title: 'Food Adventures: Street Food Guide to Bangkok',
          slug: 'street-food-guide-bangkok',
          excerpt: 'Navigate Bangkok\'s incredible street food scene with our comprehensive guide.',
          content: '',
          featured_image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
          category: 'food-travel',
          tags: ['bangkok', 'street-food'],
          author_id: 'author2',
          published: true,
          featured: false,
          views: 18750,
          reading_time: 9,
          created_at: '2024-01-05T11:20:00Z',
          updated_at: '2024-01-05T11:20:00Z',
          published_at: '2024-01-05T11:20:00Z'
        }
      ]
      
      setPost(mockPost)
      setRelatedPosts(mockRelatedPosts)
      
      // Increment view count (in real app, this would be done server-side)
      // await supabase.rpc('increment_post_views', { post_id: mockPost.id })
      
    } catch (err) {
      console.error('Error fetching post:', err)
      setError('Failed to load the article. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
  
  const handleShare = (platform: string) => {
    const url = window.location.href
    const title = post?.title || ''
    
    let shareUrl = ''
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        break
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
        break
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        break
      case 'copy':
        navigator.clipboard.writeText(url)
        setShowShareMenu(false)
        return
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400')
      setShowShareMenu(false)
    }
  }
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-64 bg-gray-200 rounded mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Article not found'}</p>
          <button
            onClick={() => router.push('/blog')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Blog
          </button>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Blog
          </button>
        </div>
      </div>
      
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Article Header */}
        <header className="mb-8">
          <div className="mb-4">
            <Link
              href={`/blog?category=${post.category}`}
              className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium capitalize hover:bg-blue-200 transition-colors"
            >
              {post.category.replace('-', ' ')}
            </Link>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-6 leading-relaxed">
            {post.excerpt}
          </p>
          
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                <span>Travel Expert</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{formatDate(post.published_at || post.created_at)}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>{post.reading_time} min read</span>
              </div>
              <div className="flex items-center">
                <Eye className="w-4 h-4 mr-2" />
                <span>{post.views.toLocaleString()} views</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg transition-colors ${
                  isLiked ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                <span className="text-sm">Like</span>
              </button>
              
              <div className="relative">
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm">Share</span>
                </button>
                
                {showShareMenu && (
                  <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                    <button
                      onClick={() => handleShare('facebook')}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <Facebook className="w-4 h-4 text-blue-600" />
                      <span>Facebook</span>
                    </button>
                    <button
                      onClick={() => handleShare('twitter')}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <Twitter className="w-4 h-4 text-blue-400" />
                      <span>Twitter</span>
                    </button>
                    <button
                      onClick={() => handleShare('linkedin')}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <Linkedin className="w-4 h-4 text-blue-700" />
                      <span>LinkedIn</span>
                    </button>
                    <button
                      onClick={() => handleShare('copy')}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>Copy Link</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
        
        {/* Featured Image */}
        {post.featured_image && (
          <div className="aspect-video relative rounded-xl overflow-hidden mb-8">
            <Image
              src={post.featured_image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
        
        {/* Article Content */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div 
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
        
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Tag className="w-5 h-5 mr-2" />
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?search=${encodeURIComponent(tag)}`}
                  className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-sm hover:bg-gray-200 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        )}
        
        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="group"
                >
                  <article className="flex space-x-4">
                    <div className="w-24 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={relatedPost.featured_image || '/placeholder-image.jpg'}
                        alt={relatedPost.title}
                        width={96}
                        height={80}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm line-clamp-2 group-hover:text-blue-600 transition-colors mb-1">
                        {relatedPost.title}
                      </h4>
                      <p className="text-gray-600 text-xs line-clamp-2 mb-2">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="w-3 h-3 mr-1" />
                        {formatDate(relatedPost.published_at || relatedPost.created_at)}
                        <span className="mx-2">•</span>
                        <Clock className="w-3 h-3 mr-1" />
                        {relatedPost.reading_time} min
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  )
}