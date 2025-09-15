'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, MapPin, Calendar, Users, Search, Star, TrendingUp, Globe, Award, Shield, Clock } from 'lucide-react'
import SearchForm from '@/components/search/SearchForm'
import Image from 'next/image'

const heroImages = [
  {
    url: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    location: 'Bali, Indonesia',
    title: 'Tropical Paradise Awaits',
    description: 'Luxury resorts from $89/night',
    deals: '40% OFF'
  },
  {
    url: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    location: 'Paris, France',
    title: 'City of Lights & Romance',
    description: 'Boutique hotels from $129/night',
    deals: 'FREE Breakfast'
  },
  {
    url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    location: 'Tokyo, Japan',
    title: 'Modern Meets Traditional',
    description: 'Premium stays from $99/night',
    deals: 'Last Minute'
  },
  {
    url: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    location: 'Santorini, Greece',
    title: 'Breathtaking Sunsets',
    description: 'Ocean view suites from $159/night',
    deals: 'EXCLUSIVE'
  }
]

const slogans = [
  "Your Gateway to Amazing Experiences",
  "Discover. Book. Experience.",
  "Where Every Journey Begins",
  "Same Stays. Better Prices. Maximum Value."
]

const trustBadges = [
  { icon: Award, text: '2M+ Properties', subtext: 'Worldwide' },
  { icon: Shield, text: 'Secure Booking', subtext: '100% Protected' },
  { icon: Clock, text: '24/7 Support', subtext: 'Always Here' }
]

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentSloganIndex, setCurrentSloganIndex] = useState(0)
  const [showSearchForm, setShowSearchForm] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
      setCurrentSloganIndex((prev) => (prev + 1) % slogans.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  const currentImage = heroImages[currentImageIndex]
  const currentSlogan = slogans[currentSloganIndex]

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Enhanced Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out scale-105"
        style={{ backgroundImage: `url(${currentImage.url})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-purple-900/30 to-black/60" />
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length)}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-3 transition-all duration-300 hover:scale-110"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={() => setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-3 transition-all duration-300 hover:scale-110"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Deal Badge */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-full px-6 py-2 mb-4 animate-pulse">
          <Star className="w-4 h-4 fill-current" />
          <span className="text-sm font-bold">{currentImage.deals}</span>
        </div>

        {/* Location Badge */}
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
          <MapPin className="w-4 h-4" />
          <span className="text-sm font-medium">{currentImage.location}</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight font-heading">
          <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent drop-shadow-2xl animate-shimmer">
            Discover Your
          </span>
          <br />
          <span className="bg-gradient-to-r from-accent-coral via-accent-violet to-accent-teal bg-clip-text text-transparent drop-shadow-2xl animate-pulse-glow">
            Perfect Escape
          </span>
        </h1>
        <h2 className="text-2xl md:text-3xl text-white/95 mb-8 font-medium max-w-3xl leading-relaxed">
          <span className="bg-gradient-to-r from-accent-amber to-accent-orange bg-clip-text text-transparent font-bold">
            Luxury Stays. Unbeatable Prices. 
          </span>
          <span className="text-white/90">
            Extraordinary Experiences.
          </span>
        </h2>
        
        <p className="text-xl sm:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed font-light">
          {currentImage.description}
        </p>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center gap-8 mb-10">
          <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
            <Shield className="w-6 h-6 text-accent-emerald" />
            <span className="text-white font-semibold">100% Secure</span>
          </div>
          <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
            <Star className="w-6 h-6 text-accent-amber" />
            <span className="text-white font-semibold">4.9★ Rated</span>
          </div>
          <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
            <Users className="w-6 h-6 text-brand-400" />
            <span className="text-white font-semibold">5M+ Bookings</span>
          </div>
          <div className="flex items-center space-x-3 bg-gradient-to-r from-accent-coral to-accent-rose rounded-full px-4 py-2 animate-pulse">
            <span className="text-white font-bold text-sm">🔥 LIVE: 847 people booking now</span>
          </div>
        </div>

        {/* Enhanced CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-accent-coral via-accent-rose to-accent-violet hover:from-accent-rose hover:via-accent-violet hover:to-accent-coral text-white px-10 py-5 text-xl font-bold shadow-luxury hover:shadow-glow-lg transition-all duration-500 transform hover:scale-110 animate-float border-2 border-white/20 rounded-xl"
            onClick={() => setShowSearchForm(true)}
          >
            <Search className="w-6 h-6 mr-3" />
            Explore Amazing Deals
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-3 border-white/40 text-white hover:bg-gradient-to-r hover:from-white/20 hover:to-white/10 px-10 py-5 text-xl font-bold backdrop-blur-md transition-all duration-500 transform hover:scale-110 shadow-travel rounded-xl"
          >
            <Globe className="w-6 h-6 mr-3" />
            See Success Stories
          </Button>
        </div>

        {/* Search Form Modal */}
        {showSearchForm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gradient-to-br from-white/95 via-white/90 to-white/95 backdrop-blur-lg rounded-3xl shadow-luxury p-10 w-full max-w-5xl max-h-[90vh] overflow-y-auto border-2 border-white/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-50/50 to-purple-50/50 rounded-3xl" />
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-8">
                  <div className="text-center flex-1">
                    <h3 className="text-2xl font-bold font-heading bg-gradient-to-r from-brand-600 to-brand-800 bg-clip-text text-transparent mb-2">
                      Find Your Dream Stay
                    </h3>
                    <p className="text-gray-600 font-medium">Over 2 million properties worldwide • Best price guaranteed</p>
                  </div>
                  <button 
                    onClick={() => setShowSearchForm(false)}
                    className="text-gray-500 hover:text-gray-700 text-3xl font-bold hover:scale-110 transition-transform"
                  >
                    ×
                  </button>
                </div>
                <SearchForm />
              </div>
            </div>
          </div>
        )}

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Enhanced Image Navigation Dots */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 hover:scale-125 ${
              index === currentImageIndex 
                ? 'bg-white shadow-lg' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Enhanced Floating Animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  )
}