'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Star, TrendingUp, Calendar, Users, Plane, Award, Globe, Shield, Clock } from 'lucide-react';

interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  description: string;
  averagePrice: number;
  originalPrice?: number;
  rating: number;
  hotelsCount: number;
  trending?: boolean;
  popular?: boolean;
  deals?: string;
  category?: string;
  highlights?: string[];
}

const featuredDestinations: Destination[] = [
  {
    id: '1',
    name: 'Paris',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'The City of Light awaits with its iconic landmarks, world-class cuisine, and romantic atmosphere.',
    averagePrice: 140,
    originalPrice: 180,
    rating: 4.8,
    hotelsCount: 2847,
    trending: true,
    deals: 'FREE Breakfast',
    category: 'Romantic',
    highlights: ['Boutique Hotels', 'Historic Districts', 'Art Museums']
  },
  {
    id: '2',
    name: 'Tokyo',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Experience the perfect blend of traditional culture and cutting-edge technology.',
    averagePrice: 155,
    originalPrice: 220,
    rating: 4.9,
    hotelsCount: 1923,
    popular: true,
    category: 'Cultural',
    highlights: ['Modern Hotels', 'Traditional Ryokans', 'City Center']
  },
  {
    id: '3',
    name: 'New York',
    country: 'United States',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'The city that never sleeps offers endless entertainment, dining, and cultural experiences.',
    averagePrice: 220,
    originalPrice: 280,
    rating: 4.7,
    hotelsCount: 1654,
    trending: true,
    category: 'Urban',
    highlights: ['Times Square', 'Broadway Shows', 'Central Park']
  },
  {
    id: '4',
    name: 'Bali',
    country: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Tropical paradise with stunning beaches, ancient temples, and vibrant culture.',
    averagePrice: 65,
    originalPrice: 95,
    rating: 4.6,
    hotelsCount: 3421,
    popular: true,
    category: 'Beach',
    highlights: ['Beach Resorts', 'Spa Retreats', 'Cultural Sites']
  },
  {
    id: '5',
    name: 'Santorini',
    country: 'Greece',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Stunning sunsets and white-washed buildings overlooking the Aegean Sea.',
    averagePrice: 89,
    originalPrice: 119,
    rating: 4.8,
    hotelsCount: 2156,
    deals: '25% OFF',
    category: 'Romantic',
    highlights: ['Sunset Views', 'Luxury Resorts', 'Wine Tours']
  },
  {
    id: '6',
    name: 'Dubai',
    country: 'UAE',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Luxury shopping, ultramodern architecture, and a lively nightlife scene.',
    averagePrice: 135,
    originalPrice: 320,
    rating: 4.8,
    hotelsCount: 987,
    trending: true,
    deals: '30% OFF',
    category: 'Luxury',
    highlights: ['Luxury Hotels', 'Desert Safari', 'Shopping Malls']
  }
];

const FeaturedDestinations: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-brand-50 via-white to-accent-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[url('/images/patterns/travel-pattern.svg')] opacity-5"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-brand-200/30 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-accent-200/30 to-transparent rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-500 to-accent-500 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg">
            <Plane className="w-4 h-4" />
            <span>Handpicked Destinations</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-display font-bold mb-6">
            <span className="bg-gradient-to-r from-brand-600 via-accent-600 to-travel-600 bg-clip-text text-transparent">
              Discover Amazing
            </span>
            <br />
            <span className="text-gray-900">Destinations</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            From bustling cities to tropical paradises, find your perfect getaway with 
            <span className="font-semibold text-brand-600">unbeatable prices</span> and 
            <span className="font-semibold text-accent-600">exclusive deals</span>
          </p>
          
          {/* Quick stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-brand-600">2M+</div>
              <div className="text-sm text-gray-600">Properties</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent-600">195</div>
              <div className="text-sm text-gray-600">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-travel-600">50M+</div>
              <div className="text-sm text-gray-600">Happy Travelers</div>
            </div>
          </div>
        </div>

        {/* Enhanced Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {featuredDestinations.map((destination) => (
            <Card key={destination.id} className="group overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 bg-white border-0 shadow-lg hover:shadow-brand-500/20">
              <div className="relative overflow-hidden rounded-t-2xl">
                <Image
                  src={destination.image}
                  alt={`${destination.name}, ${destination.country}`}
                  width={800}
                  height={600}
                  className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Enhanced overlay badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {destination.trending && (
                    <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg animate-pulse">
                      <TrendingUp className="w-4 h-4" />
                      Trending
                    </span>
                  )}
                  {destination.popular && (
                    <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
                      <Star className="w-4 h-4 fill-current" />
                      Popular
                    </span>
                  )}
                </div>

                {/* Enhanced price badge */}
                <div className="absolute top-4 right-4">
                  <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-white/20">
                    <div className="text-center">
                      {destination.originalPrice && (
                        <div className="text-sm text-gray-500 line-through font-medium">
                          ${destination.originalPrice}
                        </div>
                      )}
                      <div className="font-bold text-xl text-gray-900">
                        From <span className="text-brand-600">${destination.averagePrice}</span>
                      </div>
                      {destination.deals && (
                        <div className="text-xs bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full mt-2 font-bold shadow-md">
                          {destination.deals}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Enhanced gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Floating action button on hover */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                  <Button size="sm" className="bg-white text-brand-600 hover:bg-brand-50 shadow-lg rounded-full px-4 py-2 font-semibold">
                    View Details
                  </Button>
                </div>
              </div>

              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-5 h-5 text-brand-500" />
                      <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                        {destination.country}
                      </span>
                    </div>
                    <h3 className="text-2xl font-display font-bold text-gray-900 mb-1">
                      {destination.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full shadow-md">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-bold text-sm">
                      {destination.rating}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 mb-6 line-clamp-2 leading-relaxed">
                  {destination.description}
                </p>

                {destination.highlights && (
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {destination.highlights.slice(0, 3).map((highlight, index) => (
                        <span key={index} className="text-xs bg-gradient-to-r from-brand-100 to-accent-100 text-brand-700 px-3 py-1 rounded-full font-medium border border-brand-200">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between mb-6 p-4 bg-gradient-to-r from-gray-50 to-brand-50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-gray-700">
                      {destination.hotelsCount.toLocaleString()} hotels available
                    </span>
                  </div>
                  {destination.category && (
                    <span className="text-xs bg-white text-gray-600 px-3 py-1 rounded-full font-medium shadow-sm border">
                      {destination.category}
                    </span>
                  )}
                </div>

                <Link href={`/search?destination=${encodeURIComponent(destination.name)}`}>
                  <Button className="w-full bg-gradient-to-r from-brand-600 to-accent-600 hover:from-brand-700 hover:to-accent-700 text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    <span className="flex items-center justify-center gap-2">
                      Explore {destination.name}
                      <Plane className="w-4 h-4" />
                    </span>
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced View All Button Section */}
        <div className="text-center relative">
          <div className="mb-8">
            <p className="text-gray-600 mb-4">
              Can't find your dream destination? We have <span className="font-bold text-brand-600">2+ million properties</span> in <span className="font-bold text-accent-600">195 countries</span>
            </p>
          </div>
          
          <Link href="/destinations">
            <Button 
              size="lg" 
              className="px-12 py-4 text-lg font-bold bg-gradient-to-r from-brand-600 via-accent-600 to-travel-600 hover:from-brand-700 hover:via-accent-700 hover:to-travel-700 text-white border-0 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-3">
                <Globe className="w-5 h-5" />
                View All Destinations
                <Award className="w-5 h-5" />
              </span>
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12 translate-x-full group-hover:translate-x-0"></div>
            </Button>
          </Link>
          
          {/* Trust indicators */}
          <div className="flex justify-center items-center gap-8 mt-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-500" />
              <span>Secure Booking</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-500" />
              <span>Instant Confirmation</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-purple-500" />
              <span>Best Price Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;