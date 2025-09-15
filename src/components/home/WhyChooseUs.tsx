'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  DollarSign, 
  Clock, 
  Users, 
  Star, 
  Globe, 
  Headphones, 
  Award,
  CheckCircle,
  Plane
} from 'lucide-react';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  highlight?: boolean;
}

const features: Feature[] = [
  {
    id: '1',
    title: 'Best Price Guarantee',
    description: 'Find a lower price? We\'ll match it and give you an extra 10% off your next booking.',
    icon: <DollarSign className="w-8 h-8" />,
    highlight: true
  },
  {
    id: '2',
    title: 'Secure Booking',
    description: 'Your personal and payment information is protected with bank-level security.',
    icon: <Shield className="w-8 h-8" />,
    highlight: true
  },
  {
    id: '3',
    title: '24/7 Customer Support',
    description: 'Get help anytime, anywhere. Our travel experts are always ready to assist you.',
    icon: <Headphones className="w-8 h-8" />
  },
  {
    id: '4',
    title: 'Instant Confirmation',
    description: 'Get immediate booking confirmation and receive your voucher within minutes.',
    icon: <Clock className="w-8 h-8" />
  },
  {
    id: '5',
    title: '2+ Million Properties',
    description: 'Choose from the world\'s largest selection of hotels, resorts, and unique stays.',
    icon: <Globe className="w-8 h-8" />,
    highlight: true
  },
  {
    id: '6',
    title: 'Trusted by Millions',
    description: 'Join over 50 million travelers who trust us for their accommodation needs.',
    icon: <Users className="w-8 h-8" />
  },
  {
    id: '7',
    title: 'Award-Winning Service',
    description: 'Recognized as the leading online travel booking platform for three consecutive years.',
    icon: <Award className="w-8 h-8" />
  },
  {
    id: '8',
    title: 'Verified Reviews',
    description: 'Read authentic reviews from real travelers to make informed booking decisions.',
    icon: <Star className="w-8 h-8" />
  }
];

const stats = [
  { label: 'Happy Customers', value: '50M+', icon: <Users className="w-6 h-6" /> },
  { label: 'Properties Worldwide', value: '2M+', icon: <Globe className="w-6 h-6" /> },
  { label: 'Countries Covered', value: '220+', icon: <CheckCircle className="w-6 h-6" /> },
  { label: 'Customer Satisfaction', value: '98%', icon: <Star className="w-6 h-6" /> }
];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-brand-50 via-white to-accent-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[url('/images/patterns/trust-pattern.svg')] opacity-5"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-brand-200/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-accent-200/20 to-transparent rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-500 to-accent-500 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg">
            <Award className="w-4 h-4" />
            <span>Award-Winning Service</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-display font-bold mb-8">
            <span className="bg-gradient-to-r from-brand-600 via-accent-600 to-travel-600 bg-clip-text text-transparent">
              Why Choose
            </span>
            <br />
            <span className="text-gray-900">Travelenda?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We're not just another booking site. We're your 
            <span className="font-semibold text-brand-600">trusted travel partner</span>, 
            committed to making your journey 
            <span className="font-semibold text-accent-600">extraordinary</span> from start to finish.
          </p>
        </div>

        {/* Enhanced Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => {
            const colors = [
              'from-brand-500 to-brand-600',
              'from-accent-500 to-accent-600', 
              'from-travel-500 to-travel-600',
              'from-purple-500 to-purple-600'
            ];
            return (
              <div key={index} className="text-center group">
                <div className="flex justify-center mb-4">
                  <div className={`p-4 bg-gradient-to-r ${colors[index]} text-white rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110`}>
                    {stat.icon}
                  </div>
                </div>
                <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2 font-display">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium text-lg">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Enhanced Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => {
            const gradientColors = [
              'from-brand-500 to-brand-600',
              'from-accent-500 to-accent-600',
              'from-travel-500 to-travel-600',
              'from-purple-500 to-purple-600',
              'from-emerald-500 to-emerald-600',
              'from-orange-500 to-orange-600',
              'from-pink-500 to-pink-600',
              'from-indigo-500 to-indigo-600'
            ];
            const bgColors = [
              'from-brand-50 to-brand-100',
              'from-accent-50 to-accent-100',
              'from-travel-50 to-travel-100',
              'from-purple-50 to-purple-100',
              'from-emerald-50 to-emerald-100',
              'from-orange-50 to-orange-100',
              'from-pink-50 to-pink-100',
              'from-indigo-50 to-indigo-100'
            ];
            return (
              <Card 
                key={feature.id} 
                className={`group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-0 shadow-lg relative overflow-hidden ${
                  feature.highlight 
                    ? `bg-gradient-to-br ${bgColors[index]} ring-2 ring-white shadow-xl` 
                    : 'bg-white hover:shadow-brand-500/10'
                }`}
              >
                {feature.highlight && (
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-yellow-400 to-orange-400 rounded-bl-full flex items-start justify-end p-2">
                    <Star className="w-4 h-4 text-white fill-current" />
                  </div>
                )}
                
                <CardContent className="p-8 text-center relative z-10">
                  <div className="flex justify-center mb-6">
                    <div className={`p-5 rounded-2xl transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-3 shadow-lg bg-gradient-to-r ${gradientColors[index]} text-white`}>
                      {feature.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-brand-600 transition-colors font-display">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {feature.description}
                  </p>
                  
                  {feature.highlight && (
                    <div className="mt-6">
                      <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-md">
                        ⭐ Most Popular
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Enhanced Call to Action */}
        <div className="relative overflow-hidden bg-gradient-to-br from-brand-500 via-brand-600 to-accent-600 rounded-3xl p-12 shadow-2xl">
          {/* Background Decorations */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-white/20 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-accent-400/30 to-transparent rounded-full translate-y-24 -translate-x-24"></div>
          
          <div className="relative z-10 text-center text-white">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-6">
              🎉 Join 2M+ Happy Travelers
            </div>
            
            <h3 className="text-4xl md:text-5xl font-bold mb-6 font-display">
              Ready to Start Your <span className="text-yellow-300">Dream Journey</span>?
            </h3>
            
            <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
              Join millions of travelers who trust us to find their perfect stay. 
              Discover <span className="font-semibold text-yellow-300">exclusive deals</span>, 
              <span className="font-semibold text-yellow-300"> verified reviews</span>, and 
              <span className="font-semibold text-yellow-300">instant bookings</span> today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-white text-brand-600 hover:bg-yellow-50 hover:text-brand-700 px-10 py-5 text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group"
              >
                Start Booking Now
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-white/50 text-white hover:bg-white/10 hover:border-white backdrop-blur-sm px-8 py-5 text-lg font-semibold rounded-2xl transition-all duration-300 group"
              >
                <Shield className="mr-2 h-5 w-5" />
                Learn More
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 mt-10 pt-8 border-t border-white/20">
              <div className="flex items-center text-white/80">
                <Star className="w-5 h-5 text-yellow-300 fill-current mr-2" />
                <span className="font-semibold">4.8/5 Rating</span>
              </div>
              <div className="flex items-center text-white/80">
                <Shield className="w-5 h-5 text-green-300 mr-2" />
                <span className="font-semibold">Secure Booking</span>
              </div>
              <div className="flex items-center text-white/80">
                <Clock className="w-5 h-5 text-blue-300 mr-2" />
                <span className="font-semibold">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;