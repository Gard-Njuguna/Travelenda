'use client'

import { useState } from 'react'
import { Search, MapPin, Calendar, Users, Filter, TrendingUp, Star, Award, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import SearchForm from '@/components/search/SearchForm'

const popularDestinations = [
  { name: 'Paris, France', image: '/images/destinations/paris.jpg', deals: '25% OFF' },
  { name: 'Tokyo, Japan', image: '/images/destinations/tokyo.jpg', deals: 'FREE Breakfast' },
  { name: 'New York, USA', image: '/images/destinations/nyc.jpg', deals: 'Last Minute' },
  { name: 'London, UK', image: '/images/destinations/london.jpg', deals: '30% OFF' },
  { name: 'Bali, Indonesia', image: '/images/destinations/bali.jpg', deals: 'EXCLUSIVE' },
  { name: 'Dubai, UAE', image: '/images/destinations/dubai.jpg', deals: 'HOT DEAL' },
  { name: 'Barcelona, Spain', image: '/images/destinations/barcelona.jpg', deals: '20% OFF' },
  { name: 'Rome, Italy', image: '/images/destinations/rome.jpg', deals: 'POPULAR' }
]

const searchStats = [
  { icon: Globe, number: '2M+', label: 'Properties Worldwide', color: 'text-blue-600' },
  { icon: Award, number: '195', label: 'Countries & Territories', color: 'text-green-600' },
  { icon: Star, number: '24/7', label: 'Customer Support', color: 'text-purple-600' }
]

export default function SearchSection() {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <TrendingUp className="w-4 h-4" />
            Most Searched This Week
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Find Your Perfect Stay
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Search from over 2 million properties worldwide and discover your ideal accommodation with the best prices guaranteed
          </p>
        </div>

        {/* Enhanced Search Form */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            <SearchForm />
          </div>
        </div>

        {/* Popular Destinations Grid */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Trending Destinations
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {popularDestinations.map((destination, index) => (
              <button
                key={destination.name}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 p-4 text-white hover:scale-105 transition-all duration-300 hover:shadow-xl"
              >
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {destination.deals}
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold mb-1">{destination.name.split(',')[0]}</div>
                  <div className="text-xs opacity-80">{destination.name.split(',')[1]}</div>
                </div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              </button>
            ))}
          </div>
        </div>

        {/* Enhanced Search Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {searchStats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div key={index} className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-50 rounded-full mb-4">
                  <IconComponent className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className={`text-4xl font-bold ${stat.color} mb-2`}>{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            )
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Join millions of travelers who trust Travelenda for their perfect stays
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-xl">
                Start Searching Now
              </Button>
              <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg font-semibold rounded-xl">
                View All Destinations
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}