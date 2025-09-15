'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Users, Award, Shield, Heart, Globe, Star, TrendingUp, CheckCircle } from 'lucide-react'

interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  image: string
  linkedin?: string
  twitter?: string
}

interface Stat {
  icon: React.ReactNode
  value: string
  label: string
  description: string
}

interface Value {
  icon: React.ReactNode
  title: string
  description: string
}

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<'story' | 'team' | 'values'>('story')
  
  const stats: Stat[] = [
    {
      icon: <MapPin className="w-8 h-8 text-blue-600" />,
      value: "2M+",
      label: "Properties Worldwide",
      description: "Access to over 2 million hotels, resorts, and unique stays globally"
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      value: "500K+",
      label: "Happy Travelers",
      description: "Travelers who have found their perfect stays through Travelenda"
    },
    {
      icon: <Star className="w-8 h-8 text-yellow-600" />,
      value: "4.8/5",
      label: "Customer Rating",
      description: "Average rating from verified customer reviews and feedback"
    },
    {
      icon: <Globe className="w-8 h-8 text-purple-600" />,
      value: "195",
      label: "Countries Covered",
      description: "Comprehensive coverage across all major travel destinations"
    }
  ]
  
  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      bio: 'Former travel industry executive with 15+ years of experience. Passionate about making travel accessible and affordable for everyone.',
      image: '/api/placeholder/300/300',
      linkedin: '#',
      twitter: '#'
    },
    {
      id: '2',
      name: 'Michael Chen',
      role: 'CTO',
      bio: 'Tech visionary who previously led engineering teams at major travel platforms. Expert in scalable systems and user experience.',
      image: '/api/placeholder/300/300',
      linkedin: '#'
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      role: 'Head of Customer Experience',
      bio: 'Customer service expert dedicated to ensuring every traveler has an exceptional booking experience from start to finish.',
      image: '/api/placeholder/300/300',
      linkedin: '#',
      twitter: '#'
    },
    {
      id: '4',
      name: 'David Kim',
      role: 'Head of Partnerships',
      bio: 'Relationship builder who works with hotels worldwide to bring exclusive deals and unique properties to our platform.',
      image: '/api/placeholder/300/300',
      linkedin: '#'
    }
  ]
  
  const values: Value[] = [
    {
      icon: <Heart className="w-12 h-12 text-red-500" />,
      title: 'Customer First',
      description: 'Every decision we make is guided by what\'s best for our travelers. Your perfect trip is our ultimate goal.'
    },
    {
      icon: <Shield className="w-12 h-12 text-blue-500" />,
      title: 'Trust & Transparency',
      description: 'No hidden fees, no surprises. We believe in honest pricing and clear communication throughout your journey.'
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-green-500" />,
      title: 'Innovation',
      description: 'We continuously evolve our platform with cutting-edge technology to make travel booking simpler and smarter.'
    },
    {
      icon: <Globe className="w-12 h-12 text-purple-500" />,
      title: 'Global Accessibility',
      description: 'Travel should be accessible to everyone. We work to break down barriers and make world exploration possible.'
    }
  ]
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Redefining Travel,
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                One Stay at a Time
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
              We're on a mission to make exceptional travel experiences accessible to everyone, 
              combining cutting-edge technology with genuine hospitality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
              >
                Start Your Journey
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
              >
                Read Our Stories
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-lg font-semibold text-gray-700 mb-2">{stat.label}</div>
                <p className="text-gray-600 text-sm">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Main Content Tabs */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab('story')}
                className={`px-6 py-3 rounded-md font-medium transition-colors ${
                  activeTab === 'story'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Our Story
              </button>
              <button
                onClick={() => setActiveTab('team')}
                className={`px-6 py-3 rounded-md font-medium transition-colors ${
                  activeTab === 'team'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Our Team
              </button>
              <button
                onClick={() => setActiveTab('values')}
                className={`px-6 py-3 rounded-md font-medium transition-colors ${
                  activeTab === 'values'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Our Values
              </button>
            </div>
          </div>
          
          {/* Tab Content */}
          <div className="max-w-4xl mx-auto">
            {activeTab === 'story' && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">The Travelenda Story</h2>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Born from a simple frustration: why was finding the perfect hotel so complicated and expensive?
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">The Problem We Saw</h3>
                    <p className="text-gray-600 mb-6">
                      Traditional travel booking sites were cluttered, confusing, and often hid the best deals behind 
                      complex loyalty programs. Travelers deserved better – a platform that was transparent, 
                      user-friendly, and genuinely focused on finding the best value.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700">Hidden fees and surprise charges</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700">Confusing user interfaces</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700">Limited property selection</span>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
                      <div className="text-center">
                        <Award className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                        <p className="text-gray-700 font-medium">Excellence in Travel</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="md:order-2">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Solution</h3>
                    <p className="text-gray-600 mb-6">
                      We built Travelenda from the ground up with one core principle: put the traveler first. 
                      By partnering directly with over 2 million properties worldwide and leveraging advanced 
                      technology, we created a platform that's both powerful and simple.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-blue-500" />
                        <span className="text-gray-700">Transparent pricing, no hidden fees</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-blue-500" />
                        <span className="text-gray-700">Intuitive, mobile-first design</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-blue-500" />
                        <span className="text-gray-700">Comprehensive global inventory</span>
                      </div>
                    </div>
                  </div>
                  <div className="md:order-1 relative">
                    <div className="aspect-square bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl flex items-center justify-center">
                      <div className="text-center">
                        <Globe className="w-16 h-16 text-green-600 mx-auto mb-4" />
                        <p className="text-gray-700 font-medium">Global Reach</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'team' && (
              <div>
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Meet Our Team</h2>
                  <p className="text-xl text-gray-600">
                    Passionate travelers and technology experts working together to revolutionize how you book your stays.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Users className="w-8 h-8 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                          <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                          <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                          <div className="flex space-x-3 mt-4">
                            {member.linkedin && (
                              <a href={member.linkedin} className="text-blue-600 hover:text-blue-700 transition-colors">
                                <span className="sr-only">LinkedIn</span>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                              </a>
                            )}
                            {member.twitter && (
                              <a href={member.twitter} className="text-blue-400 hover:text-blue-500 transition-colors">
                                <span className="sr-only">Twitter</span>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                </svg>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'values' && (
              <div>
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Core Values</h2>
                  <p className="text-xl text-gray-600">
                    These principles guide everything we do, from product development to customer service.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {values.map((value, index) => (
                    <div key={index} className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                      <div className="flex justify-center mb-6">
                        {value.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{value.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6">Ready to Experience the Difference?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join hundreds of thousands of travelers who have discovered better stays at better prices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
            >
              Start Searching Hotels
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}