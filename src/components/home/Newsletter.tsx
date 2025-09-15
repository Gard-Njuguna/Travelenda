'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Mail, 
  Send, 
  CheckCircle, 
  Gift, 
  Plane, 
  MapPin, 
  Star,
  Sparkles
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface NewsletterBenefit {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const benefits: NewsletterBenefit[] = [
  {
    id: '1',
    title: 'Exclusive Deals',
    description: 'Get access to subscriber-only discounts up to 40% off',
    icon: <Gift className="w-6 h-6" />
  },
  {
    id: '2',
    title: 'Early Access',
    description: 'Be the first to know about flash sales and new destinations',
    icon: <Sparkles className="w-6 h-6" />
  },
  {
    id: '3',
    title: 'Travel Tips',
    description: 'Weekly insider tips from travel experts and locals',
    icon: <MapPin className="w-6 h-6" />
  },
  {
    id: '4',
    title: 'Personalized Recommendations',
    description: 'Curated hotel suggestions based on your preferences',
    icon: <Star className="w-6 h-6" />
  }
];

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address to subscribe.",
        variant: "destructive"
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubscribed(true);
      toast({
        title: "Successfully Subscribed! 🎉",
        description: "Welcome to Travelenda! Check your email for a special welcome offer."
      });
      
      setEmail('');
    } catch (error) {
      toast({
        title: "Subscription Failed",
        description: "Something went wrong. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubscribed) {
    return (
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto text-center">
            <CardContent className="p-12">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-green-100 rounded-full">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
              </div>
              
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Welcome to the Travelenda Family! 🎉
              </h3>
              
              <p className="text-lg text-gray-600 mb-6">
                You're all set! Check your email for a special welcome offer and start exploring amazing deals.
              </p>
              
              <div className="flex items-center justify-center gap-2 text-blue-600">
                <Mail className="w-5 h-5" />
                <span className="font-semibold">Welcome email sent!</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 animate-bounce-gentle">
          <Plane className="w-16 h-16 text-white" />
        </div>
        <div className="absolute top-20 right-20 animate-bounce-gentle" style={{ animationDelay: '1s' }}>
          <MapPin className="w-12 h-12 text-white" />
        </div>
        <div className="absolute bottom-20 left-20 animate-bounce-gentle" style={{ animationDelay: '2s' }}>
          <Star className="w-14 h-14 text-white" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/20 backdrop-blur-sm rounded-full">
                <Mail className="w-12 h-12 text-white" />
              </div>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Never Miss a Great Deal Again
            </h2>
            
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Join over 500,000 smart travelers who save big with our exclusive newsletter. 
              Get the best hotel deals delivered straight to your inbox.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {benefits.map((benefit) => (
              <Card key={benefit.id} className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-white/20 rounded-full">
                      {benefit.icon}
                    </div>
                  </div>
                  <h3 className="font-bold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-white/80">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Newsletter Signup */}
          <Card className="max-w-2xl mx-auto bg-white shadow-2xl">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Get Started Today
                </h3>
                <p className="text-gray-600">
                  Subscribe now and get a <strong>20% discount</strong> on your first booking!
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 text-lg"
                      disabled={isLoading}
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isLoading}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 h-12 flex items-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Subscribing...
                      </>
                    ) : (
                      <>
                        Subscribe Now
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </Button>
                </div>
                
                <p className="text-sm text-gray-500 text-center">
                  By subscribing, you agree to our{' '}
                  <a href="/privacy" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </a>{' '}
                  and{' '}
                  <a href="/terms" className="text-blue-600 hover:underline">
                    Terms of Service
                  </a>
                  . Unsubscribe anytime.
                </p>
              </form>

              {/* Social Proof */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-center gap-8 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-8 h-8 bg-blue-100 rounded-full border-2 border-white flex items-center justify-center">
                          <span className="text-xs font-semibold text-blue-600">👤</span>
                        </div>
                      ))}
                    </div>
                    <span>500K+ subscribers</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>4.9/5 rating</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>No spam, ever</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;