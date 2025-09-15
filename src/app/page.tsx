import HeroSection from '@/components/home/HeroSection'
import SearchSection from '@/components/home/SearchSection'
import FeaturedDestinations from '@/components/home/FeaturedDestinations'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import Testimonials from '@/components/home/Testimonials'
import FeaturedBlogPosts from '@/components/home/FeaturedBlogPosts'
import Newsletter from '@/components/home/Newsletter'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section with Integrated Search */}
      <HeroSection />
      
      {/* Spacer for better visual separation */}
      <div className="py-16 bg-gradient-to-b from-gray-50 to-white">
        {/* Trust Indicators */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">Trusted by millions of travelers worldwide</p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="text-2xl font-bold text-gray-400">TripAdvisor</div>
              <div className="text-2xl font-bold text-gray-400">Expedia Group</div>
              <div className="text-2xl font-bold text-gray-400">Booking Holdings</div>
              <div className="text-2xl font-bold text-gray-400">Agoda</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Search Section */}
      <div className="py-20 bg-white">
        <SearchSection />
      </div>
      
      {/* Featured Destinations with better spacing */}
      <div className="py-20 bg-gray-50">
        <FeaturedDestinations />
      </div>
      
      {/* Why Choose Us with premium styling */}
      <div className="py-20 bg-white">
        <WhyChooseUs />
      </div>
      
      {/* Customer Testimonials */}
      <Testimonials />
      
      {/* Special Offers Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Exclusive Deals & Last-Minute Offers
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Save up to 60% on selected hotels worldwide. Limited time offers you won't find anywhere else.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              View All Deals
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Sign Up for Alerts
            </button>
          </div>
        </div>
      </div>
      
      {/* Featured Blog Posts */}
      <div className="py-20 bg-gray-50">
        <FeaturedBlogPosts />
      </div>
      
      {/* Newsletter with better design */}
      <div className="py-20 bg-white">
        <Newsletter />
      </div>
    </main>
  )
}
