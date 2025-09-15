'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Upload, 
  X, 
  Plus,
  Bold,
  Italic,
  List,
  Link as LinkIcon,
  Image as ImageIcon,
  Quote
} from 'lucide-react'
import { supabase, getCurrentUser } from '@/lib/supabase'
import type { User } from '@/types/database'

interface PostData {
  title: string
  slug: string
  excerpt: string
  content: string
  featured_image: string
  category: string
  tags: string[]
  published: boolean
  featured: boolean
  reading_time: number
}

const categories = [
  { value: 'destinations', label: 'Destinations' },
  { value: 'travel-tips', label: 'Travel Tips' },
  { value: 'budget-travel', label: 'Budget Travel' },
  { value: 'food-travel', label: 'Food & Travel' },
  { value: 'adventure', label: 'Adventure' },
  { value: 'luxury-travel', label: 'Luxury Travel' },
  { value: 'solo-travel', label: 'Solo Travel' },
  { value: 'family-travel', label: 'Family Travel' },
  { value: 'business-travel', label: 'Business Travel' },
  { value: 'hotel-reviews', label: 'Hotel Reviews' }
]

export default function NewPostPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [newTag, setNewTag] = useState('')
  
  const [postData, setPostData] = useState<PostData>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featured_image: '',
    category: 'destinations',
    tags: [],
    published: false,
    featured: false,
    reading_time: 1
  })
  
  useEffect(() => {
    checkAuth()
  }, [])
  
  useEffect(() => {
    // Auto-generate slug from title
    if (postData.title) {
      const slug = postData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      setPostData(prev => ({ ...prev, slug }))
    }
  }, [postData.title])
  
  useEffect(() => {
    // Calculate reading time based on content
    const wordCount = postData.content.replace(/<[^>]*>/g, '').split(/\s+/).length
    const readingTime = Math.max(1, Math.ceil(wordCount / 200)) // 200 words per minute
    setPostData(prev => ({ ...prev, reading_time: readingTime }))
  }, [postData.content])
  
  const checkAuth = async () => {
    try {
      const currentUser = await getCurrentUser()
      if (!currentUser) {
        router.push('/auth/login')
        return
      }
      setUser(currentUser)
    } catch (error) {
      console.error('Auth error:', error)
      router.push('/auth/login')
    }
  }
  
  const handleInputChange = (field: keyof PostData, value: any) => {
    setPostData(prev => ({ ...prev, [field]: value }))
  }
  
  const addTag = () => {
    if (newTag.trim() && !postData.tags.includes(newTag.trim().toLowerCase())) {
      setPostData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim().toLowerCase()]
      }))
      setNewTag('')
    }
  }
  
  const removeTag = (tagToRemove: string) => {
    setPostData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }
  
  const insertTextAtCursor = (textarea: HTMLTextAreaElement, text: string) => {
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const content = textarea.value
    
    const newContent = content.substring(0, start) + text + content.substring(end)
    handleInputChange('content', newContent)
    
    // Set cursor position after inserted text
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + text.length, start + text.length)
    }, 0)
  }
  
  const formatText = (format: string) => {
    const textarea = document.getElementById('content-editor') as HTMLTextAreaElement
    if (!textarea) return
    
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = textarea.value.substring(start, end)
    
    let formattedText = ''
    
    switch (format) {
      case 'bold':
        formattedText = `<strong>${selectedText || 'bold text'}</strong>`
        break
      case 'italic':
        formattedText = `<em>${selectedText || 'italic text'}</em>`
        break
      case 'h2':
        formattedText = `<h2>${selectedText || 'Heading 2'}</h2>`
        break
      case 'h3':
        formattedText = `<h3>${selectedText || 'Heading 3'}</h3>`
        break
      case 'ul':
        formattedText = `<ul>\n  <li>${selectedText || 'List item'}</li>\n</ul>`
        break
      case 'ol':
        formattedText = `<ol>\n  <li>${selectedText || 'List item'}</li>\n</ol>`
        break
      case 'link':
        const url = prompt('Enter URL:')
        if (url) {
          formattedText = `<a href="${url}">${selectedText || 'Link text'}</a>`
        }
        break
      case 'image':
        const imageUrl = prompt('Enter image URL:')
        const altText = prompt('Enter alt text:')
        if (imageUrl) {
          formattedText = `<img src="${imageUrl}" alt="${altText || 'Image'}" />`
        }
        break
      case 'quote':
        formattedText = `<blockquote>${selectedText || 'Quote text'}</blockquote>`
        break
    }
    
    if (formattedText) {
      insertTextAtCursor(textarea, formattedText)
    }
  }
  
  const handleSave = async (publish: boolean = false) => {
    if (!postData.title.trim() || !postData.content.trim()) {
      alert('Please fill in the title and content')
      return
    }
    
    try {
      setSaving(true)
      
      const postToSave = {
        ...postData,
        published: publish,
        published_at: publish ? new Date().toISOString() : null
      }
      
      // In real app, save to Supabase
      console.log('Saving post:', postToSave)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      router.push('/admin')
      
    } catch (error) {
      console.error('Error saving post:', error)
      alert('Failed to save post. Please try again.')
    } finally {
      setSaving(false)
    }
  }
  
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    
    try {
      // In real app, upload to Supabase Storage
      const imageUrl = URL.createObjectURL(file)
      handleInputChange('featured_image', imageUrl)
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Failed to upload image. Please try again.')
    }
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
              <Link
                href="/admin"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Dashboard
              </Link>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span>{showPreview ? 'Edit' : 'Preview'}</span>
              </button>
              
              <button
                onClick={() => handleSave(false)}
                disabled={saving}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Saving...' : 'Save Draft'}</span>
              </button>
              
              <button
                onClick={() => handleSave(true)}
                disabled={saving}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <span>{saving ? 'Publishing...' : 'Publish'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {!showPreview ? (
                <div className="space-y-6">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={postData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="Enter post title..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    />
                  </div>
                  
                  {/* Slug */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      URL Slug
                    </label>
                    <input
                      type="text"
                      value={postData.slug}
                      onChange={(e) => handleInputChange('slug', e.target.value)}
                      placeholder="url-slug"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      URL: /blog/{postData.slug}
                    </p>
                  </div>
                  
                  {/* Excerpt */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Excerpt
                    </label>
                    <textarea
                      value={postData.excerpt}
                      onChange={(e) => handleInputChange('excerpt', e.target.value)}
                      placeholder="Brief description of the post..."
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  {/* Content Editor */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Content *
                    </label>
                    
                    {/* Formatting Toolbar */}
                    <div className="border border-gray-300 rounded-t-lg bg-gray-50 p-2 flex flex-wrap gap-1">
                      <button
                        type="button"
                        onClick={() => formatText('bold')}
                        className="p-2 text-gray-600 hover:bg-gray-200 rounded transition-colors"
                        title="Bold"
                      >
                        <Bold className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => formatText('italic')}
                        className="p-2 text-gray-600 hover:bg-gray-200 rounded transition-colors"
                        title="Italic"
                      >
                        <Italic className="w-4 h-4" />
                      </button>
                      <div className="w-px bg-gray-300 mx-1"></div>
                      <button
                        type="button"
                        onClick={() => formatText('h2')}
                        className="px-2 py-1 text-sm text-gray-600 hover:bg-gray-200 rounded transition-colors"
                        title="Heading 2"
                      >
                        H2
                      </button>
                      <button
                        type="button"
                        onClick={() => formatText('h3')}
                        className="px-2 py-1 text-sm text-gray-600 hover:bg-gray-200 rounded transition-colors"
                        title="Heading 3"
                      >
                        H3
                      </button>
                      <div className="w-px bg-gray-300 mx-1"></div>
                      <button
                        type="button"
                        onClick={() => formatText('ul')}
                        className="p-2 text-gray-600 hover:bg-gray-200 rounded transition-colors"
                        title="Bullet List"
                      >
                        <List className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => formatText('ol')}
                        className="px-2 py-1 text-sm text-gray-600 hover:bg-gray-200 rounded transition-colors"
                        title="Numbered List"
                      >
                        1.
                      </button>
                      <div className="w-px bg-gray-300 mx-1"></div>
                      <button
                        type="button"
                        onClick={() => formatText('link')}
                        className="p-2 text-gray-600 hover:bg-gray-200 rounded transition-colors"
                        title="Link"
                      >
                        <LinkIcon className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => formatText('image')}
                        className="p-2 text-gray-600 hover:bg-gray-200 rounded transition-colors"
                        title="Image"
                      >
                        <ImageIcon className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => formatText('quote')}
                        className="p-2 text-gray-600 hover:bg-gray-200 rounded transition-colors"
                        title="Quote"
                      >
                        <Quote className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <textarea
                      id="content-editor"
                      value={postData.content}
                      onChange={(e) => handleInputChange('content', e.target.value)}
                      placeholder="Write your post content here... You can use HTML tags for formatting."
                      rows={20}
                      className="w-full px-4 py-3 border-l border-r border-b border-gray-300 rounded-b-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Reading time: {postData.reading_time} minute{postData.reading_time !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
              ) : (
                /* Preview Mode */
                <div className="prose prose-lg max-w-none">
                  <h1>{postData.title || 'Untitled Post'}</h1>
                  {postData.excerpt && (
                    <p className="text-xl text-gray-600 italic">{postData.excerpt}</p>
                  )}
                  {postData.featured_image && (
                    <div className="aspect-video relative rounded-lg overflow-hidden my-6">
                      <Image
                        src={postData.featured_image}
                        alt={postData.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div dangerouslySetInnerHTML={{ __html: postData.content || '<p>No content yet...</p>' }} />
                </div>
              )}
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Featured Image */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Featured Image</h3>
              
              {postData.featured_image ? (
                <div className="space-y-4">
                  <div className="aspect-video relative rounded-lg overflow-hidden">
                    <Image
                      src={postData.featured_image}
                      alt="Featured image"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <button
                    onClick={() => handleInputChange('featured_image', '')}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span>Remove Image</span>
                  </button>
                </div>
              ) : (
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="w-full flex items-center justify-center space-x-2 px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
                  >
                    <Upload className="w-6 h-6 text-gray-400" />
                    <span className="text-gray-600">Upload Featured Image</span>
                  </label>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Or enter image URL:
                    </label>
                    <input
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      onBlur={(e) => {
                        if (e.target.value) {
                          handleInputChange('featured_image', e.target.value)
                        }
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}
            </div>
            
            {/* Post Settings */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Post Settings</h3>
              
              <div className="space-y-4">
                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={postData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags
                  </label>
                  <div className="flex space-x-2 mb-2">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      placeholder="Add a tag..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={addTag}
                      className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {postData.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center space-x-1 bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm"
                      >
                        <span>#{tag}</span>
                        <button
                          onClick={() => removeTag(tag)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Featured Post */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={postData.featured}
                    onChange={(e) => handleInputChange('featured', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="featured" className="text-sm text-gray-700">
                    Featured post
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}