'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, ArrowRight, TrendingUp, Eye } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: number;
  category: string;
  views: number;
  trending?: boolean;
}

const featuredPosts: BlogPost[] = [
  {
    id: '1',
    title: '10 Hidden Gems in Paris You Must Visit in 2024',
    excerpt: 'Discover the secret spots that locals love but tourists rarely find. From hidden cafes to secret gardens, explore Paris like never before.',
    image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop',
    author: {
      name: 'Sophie Martin',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
    },
    publishedAt: '2024-01-15',
    readTime: 8,
    category: 'Destinations',
    views: 12500,
    trending: true
  },
  {
    id: '2',
    title: 'Budget Travel: How to See the World for Under $50 a Day',
    excerpt: 'Learn the insider secrets to traveling on a shoestring budget without compromising on experiences. Real tips from seasoned backpackers.',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop',
    author: {
      name: 'Alex Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    publishedAt: '2024-01-12',
    readTime: 12,
    category: 'Travel Tips',
    views: 18200,
    trending: true
  },
  {
    id: '3',
    title: 'The Ultimate Guide to Japanese Ryokans: Traditional Luxury',
    excerpt: 'Experience authentic Japanese hospitality in these traditional inns. Everything you need to know about booking and etiquette.',
    image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&h=600&fit=crop',
    author: {
      name: 'Yuki Tanaka',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
    },
    publishedAt: '2024-01-10',
    readTime: 15,
    category: 'Hotels & Stays',
    views: 9800
  },
  {
    id: '4',
    title: 'Digital Nomad Hotspots: Best Cities for Remote Work in 2024',
    excerpt: 'From Bali to Lisbon, discover the top destinations where you can work remotely while living your best life.',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop',
    author: {
      name: 'Maria Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face'
    },
    publishedAt: '2024-01-08',
    readTime: 10,
    category: 'Digital Nomad',
    views: 15600
  },
  {
    id: '5',
    title: 'Sustainable Travel: How to Reduce Your Carbon Footprint',
    excerpt: 'Travel responsibly with these eco-friendly tips that help preserve the destinations you love for future generations.',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
    author: {
      name: 'David Green',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    },
    publishedAt: '2024-01-05',
    readTime: 7,
    category: 'Sustainable Travel',
    views: 7300
  },
  {
    id: '6',
    title: 'Food Tourism: A Culinary Journey Through Southeast Asia',
    excerpt: 'Taste your way through Thailand, Vietnam, and Malaysia. A foodie\'s guide to the best street food and local delicacies.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop',
    author: {
      name: 'James Wong',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face'
    },
    publishedAt: '2024-01-03',
    readTime: 11,
    category: 'Food & Culture',
    views: 11900
  }
];

const categories = [
  'All Posts',
  'Destinations',
  'Travel Tips',
  'Hotels & Stays',
  'Digital Nomad',
  'Food & Culture'
];

const FeaturedBlogPosts: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('All Posts');

  const filteredPosts = selectedCategory === 'All Posts' 
    ? featuredPosts 
    : featuredPosts.filter(post => post.category === selectedCategory);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-orange-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg">
            <TrendingUp className="w-4 h-4" />
            Featured Stories
          </div>
          <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6 leading-tight">
            Travel Stories &
            <span className="block bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              Inspiration
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Get inspired by <span className="font-semibold text-blue-600">real travel experiences</span>, expert tips, and insider guides 
            from our community of <span className="font-semibold text-purple-600">passionate travelers</span>.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category, index) => {
            const gradients = [
              'from-blue-500 to-cyan-500',
              'from-purple-500 to-pink-500', 
              'from-orange-500 to-red-500',
              'from-green-500 to-emerald-500',
              'from-indigo-500 to-purple-500',
              'from-pink-500 to-rose-500'
            ];
            const gradient = gradients[index % gradients.length];
            
            return (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category
                    ? `bg-gradient-to-r ${gradient} text-white shadow-xl shadow-blue-500/25 border-0`
                    : 'text-gray-700 border-2 border-gray-200 hover:border-transparent hover:bg-gradient-to-r hover:' + gradient + ' hover:text-white hover:shadow-lg'
                }`}
              >
                {category}
              </Button>
            );
          })}
        </div>

        {/* Featured Post (First Post) */}
        {filteredPosts.length > 0 && (
          <div className="mb-20">
            <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 group bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                  <Image
                    src={filteredPosts[0].image}
                    alt={filteredPosts[0].title}
                    width={800}
                    height={600}
                    className="w-full h-80 lg:h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {filteredPosts[0].trending && (
                    <div className="absolute top-6 left-6 z-20">
                      <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-5 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg animate-pulse">
                        <TrendingUp className="w-4 h-4" />
                        🔥 Trending
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-6 left-6 z-20">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      ⭐ Featured Story
                    </span>
                  </div>
                </div>
                
                <CardContent className="p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-white to-blue-50/30">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      {filteredPosts[0].category}
                    </span>
                    <div className="flex items-center gap-2 text-gray-600 text-sm font-medium">
                      <Eye className="w-4 h-4 text-orange-500" />
                      <span className="text-orange-600 font-semibold">{filteredPosts[0].views.toLocaleString()}</span> views
                    </div>
                  </div>
                  
                  <h3 className="text-3xl lg:text-4xl font-black text-gray-900 mb-6 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 leading-tight">
                    {filteredPosts[0].title}
                  </h3>
                  
                  <p className="text-gray-700 text-lg mb-8 leading-relaxed font-medium">
                    {filteredPosts[0].excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Image
                          src={filteredPosts[0].author.avatar}
                          alt={filteredPosts[0].author.name}
                          width={48}
                          height={48}
                          className="rounded-full ring-4 ring-blue-100"
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-lg">{filteredPosts[0].author.name}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1 font-medium">
                            <Calendar className="w-4 h-4 text-blue-500" />
                            {formatDate(filteredPosts[0].publishedAt)}
                          </span>
                          <span className="flex items-center gap-1 font-medium">
                            <Clock className="w-4 h-4 text-purple-500" />
                            {filteredPosts[0].readTime} min read
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Link href={`/blog/${filteredPosts[0].id}`}>
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-8 py-4 rounded-xl flex items-center gap-3 group shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-lg">
                      📖 Read Full Story
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                    </Button>
                  </Link>
                </CardContent>
              </div>
            </Card>
          </div>
        )}

        {/* Other Posts Grid */}
        {filteredPosts.length > 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredPosts.slice(1).map((post, index) => {
              const cardGradients = [
                'from-blue-500/10 to-purple-500/10',
                'from-orange-500/10 to-pink-500/10',
                'from-green-500/10 to-emerald-500/10',
                'from-purple-500/10 to-indigo-500/10',
                'from-pink-500/10 to-rose-500/10'
              ];
              const cardGradient = cardGradients[index % cardGradients.length];
              
              return (
                <Card key={post.id} className={`group overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 bg-gradient-to-br ${cardGradient} backdrop-blur-sm border-0 shadow-lg hover:shadow-blue-500/25`}>
                  <div className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={800}
                      height={600}
                      className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {post.trending && (
                      <div className="absolute top-4 left-4 z-20">
                        <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg animate-bounce">
                          <TrendingUp className="w-3 h-3" />
                          🔥 Hot
                        </span>
                      </div>
                    )}
                    
                    <div className="absolute top-4 right-4 z-20">
                      <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        {post.category}
                      </span>
                    </div>
                  </div>
                
                  <CardContent className="p-6 bg-white/90 backdrop-blur-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-700 mb-5 line-clamp-3 font-medium leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center gap-3 mb-5">
                      <div className="relative">
                        <Image
                          src={post.author.avatar}
                          alt={post.author.name}
                          width={36}
                          height={36}
                          className="rounded-full ring-2 ring-blue-100"
                        />
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-gray-900 text-sm">{post.author.name}</p>
                        <div className="flex items-center gap-3 text-xs text-gray-600">
                          <span className="flex items-center gap-1 font-medium">
                            <Calendar className="w-3 h-3 text-blue-500" />
                            {formatDate(post.publishedAt)}
                          </span>
                          <span className="flex items-center gap-1 font-medium">
                            <Clock className="w-3 h-3 text-purple-500" />
                            {post.readTime} min
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-orange-600 text-sm font-semibold">
                        <Eye className="w-4 h-4" />
                        {post.views.toLocaleString()}
                      </div>
                      
                      <Link href={`/blog/${post.id}`}>
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 font-semibold px-4 py-2 rounded-lg transition-all duration-300 group">
                          Read More
                          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}          </div>        )}

        {/* View All Button */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready for More Adventures?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Discover hundreds of travel stories, destination guides, and insider tips from our global community of travelers.
            </p>
            <Link href="/blog">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold px-10 py-5 text-lg rounded-xl flex items-center gap-3 mx-auto shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                🌍 Explore All Stories
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlogPosts;