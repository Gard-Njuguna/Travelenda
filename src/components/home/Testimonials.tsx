'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star, Quote, ChevronLeft, ChevronRight, MapPin, Calendar, Users, Award, TrendingUp, Heart } from 'lucide-react'
import Image from 'next/image'

interface Testimonial {
  id: string
  name: string
  location: string
  avatar: string
  rating: number
  review: string
  hotel: string
  destination: string
  travelDate: string
  verified: boolean
  helpful: number
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    location: 'New York, USA',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    review: 'Absolutely incredible experience! Travelenda found me the perfect beachfront resort in Bali at an unbeatable price. The booking process was seamless, and their customer support was outstanding when I needed to make changes.',
    hotel: 'Luxury Beach Resort Bali',
    destination: 'Bali, Indonesia',
    travelDate: 'December 2023',
    verified: true,
    helpful: 127
  },
  {
    id: '2',
    name: 'Michael Chen',
    location: 'Toronto, Canada',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    review: 'I\'ve used many booking platforms, but Travelenda stands out. They consistently offer the best prices, and I love their transparent pricing - no hidden fees! Found an amazing boutique hotel in Paris that exceeded all expectations.',
    hotel: 'Le Petit Boutique Hotel',
    destination: 'Paris, France',
    travelDate: 'October 2023',
    verified: true,
    helpful: 89
  },
  {
    id: '3',
    name: 'Emma Rodriguez',
    location: 'Madrid, Spain',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    review: 'Planning our family vacation was stress-free thanks to Travelenda. The search filters helped us find kid-friendly hotels with pools and activities. The whole family had an amazing time in Thailand!',
    hotel: 'Family Paradise Resort',
    destination: 'Phuket, Thailand',
    travelDate: 'August 2023',
    verified: true,
    helpful: 156
  },
  {
    id: '4',
    name: 'David Kim',
    location: 'Seoul, South Korea',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    review: 'Business traveler here - Travelenda\'s mobile app is fantastic for last-minute bookings. Found a great hotel near my conference venue in Tokyo with just a few taps. The loyalty program rewards are excellent too!',
    hotel: 'Tokyo Business Hotel',
    destination: 'Tokyo, Japan',
    travelDate: 'November 2023',
    verified: true,
    helpful: 73
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    location: 'London, UK',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    review: 'Honeymoon planning made easy! Travelenda\'s romantic getaway section helped us discover the most beautiful resort in Santorini. The sunset views were breathtaking, and the service was impeccable.',
    hotel: 'Sunset Villa Santorini',
    destination: 'Santorini, Greece',
    travelDate: 'September 2023',
    verified: true,
    helpful: 203
  },
  {
    id: '6',
    name: 'James Wilson',
    location: 'Sydney, Australia',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    review: 'Solo traveler and Travelenda is my go-to platform. Their safety ratings and verified reviews give me confidence when booking in new destinations. Recently had an amazing stay in a boutique hotel in Morocco!',
    hotel: 'Riad Atlas Mountains',
    destination: 'Marrakech, Morocco',
    travelDate: 'January 2024',
    verified: true,
    helpful: 91
  }
]

const stats = [
  { icon: Users, value: '2M+', label: 'Happy Travelers', color: 'from-brand-500 to-brand-600' },
  { icon: Star, value: '4.9/5', label: 'Average Rating', color: 'from-yellow-500 to-yellow-600' },
  { icon: Award, value: '98%', label: 'Satisfaction Rate', color: 'from-emerald-500 to-emerald-600' },
  { icon: TrendingUp, value: '50M+', label: 'Bookings Made', color: 'from-purple-500 to-purple-600' }
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isAutoPlaying) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-brand-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-brand-100/50 to-transparent rounded-full -translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-accent-100/50 to-transparent rounded-full translate-x-40 translate-y-40"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-travel-100/30 to-transparent rounded-full -translate-x-32 -translate-y-32"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Section Header */}
        <div className="text-center mb-16">
          {/* Trust Badge */}
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full text-sm font-bold mb-8 shadow-lg">
            <Award className="w-5 h-5 mr-2" />
            ⭐ Trusted by Millions Worldwide
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold font-display mb-6">
            What Our <span className="bg-gradient-to-r from-brand-600 via-accent-600 to-travel-600 bg-clip-text text-transparent">Travelers</span> Say
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Don't just take our word for it. Hear from <span className="font-semibold text-brand-600">real travelers</span> who've discovered their perfect stays through Travelenda and experienced the difference of <span className="font-semibold text-accent-600">exceptional service</span>.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div key={index} className="text-center group">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${stat.color} text-white rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110 mb-3`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 font-display">{stat.value}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Main Testimonial Carousel */}
        <div className="relative mb-16">
          <div className="overflow-hidden rounded-3xl">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="w-full flex-shrink-0">
                  <Card className="mx-4 bg-white border-0 shadow-2xl hover:shadow-3xl transition-all duration-500">
                    <CardContent className="p-12">
                      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                        {/* Quote Icon */}
                        <div className="flex-shrink-0">
                          <div className="w-20 h-20 bg-gradient-to-br from-brand-500 to-brand-600 rounded-full flex items-center justify-center shadow-lg">
                            <Quote className="w-10 h-10 text-white" />
                          </div>
                        </div>

                        {/* Testimonial Content */}
                        <div className="flex-1 text-center lg:text-left">
                          {/* Rating */}
                          <div className="flex justify-center lg:justify-start items-center mb-6">
                            {renderStars(testimonial.rating)}
                            <span className="ml-3 text-lg font-semibold text-gray-700">Perfect Experience</span>
                          </div>

                          {/* Review Text */}
                          <blockquote className="text-xl lg:text-2xl text-gray-700 leading-relaxed mb-8 font-medium">
                            "{testimonial.review}"
                          </blockquote>

                          {/* Travel Details */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-6 bg-gradient-to-r from-gray-50 to-brand-50 rounded-2xl">
                            <div className="flex items-center justify-center md:justify-start">
                              <MapPin className="w-5 h-5 text-brand-600 mr-2" />
                              <div>
                                <div className="font-semibold text-gray-900">{testimonial.hotel}</div>
                                <div className="text-sm text-gray-600">{testimonial.destination}</div>
                              </div>
                            </div>
                            <div className="flex items-center justify-center md:justify-start">
                              <Calendar className="w-5 h-5 text-accent-600 mr-2" />
                              <div>
                                <div className="font-semibold text-gray-900">Travel Date</div>
                                <div className="text-sm text-gray-600">{testimonial.travelDate}</div>
                              </div>
                            </div>
                            <div className="flex items-center justify-center md:justify-start">
                              <Heart className="w-5 h-5 text-red-500 mr-2" />
                              <div>
                                <div className="font-semibold text-gray-900">{testimonial.helpful} people</div>
                                <div className="text-sm text-gray-600">found this helpful</div>
                              </div>
                            </div>
                          </div>

                          {/* Author Info */}
                          <div className="flex items-center justify-center lg:justify-start">
                            <div className="relative">
                              <Image
                                src={testimonial.avatar}
                                alt={testimonial.name}
                                width={60}
                                height={60}
                                className="rounded-full border-4 border-white shadow-lg"
                              />
                              {testimonial.verified && (
                                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
                                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="font-bold text-lg text-gray-900">{testimonial.name}</div>
                              <div className="text-gray-600 flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                {testimonial.location}
                                {testimonial.verified && (
                                  <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                                    ✓ Verified Traveler
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <Button
            variant="outline"
            size="lg"
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm border-2 border-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm border-2 border-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>

        {/* Testimonial Indicators */}
        <div className="flex justify-center space-x-3 mb-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-gradient-to-r from-brand-500 to-brand-600 scale-125 shadow-lg'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-br from-brand-500 via-brand-600 to-accent-600 rounded-3xl p-12 text-white relative overflow-hidden">
          {/* Background Decorations */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-white/20 to-transparent rounded-full -translate-y-24 translate-x-24"></div>
          
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 font-display">
              Ready to Create Your Own <span className="text-yellow-300">Amazing Story</span>?
            </h3>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join millions of satisfied travelers and discover your perfect stay today. Your next adventure is just a click away!
            </p>
            <Button 
              size="lg" 
              className="bg-white text-brand-600 hover:bg-yellow-50 hover:text-brand-700 px-10 py-5 text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Start Your Journey
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}