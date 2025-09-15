'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Search, User, Globe, Heart, Bell, LogOut, Settings, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user, profile, isAuthenticated, signOut, loading } = useAuth();

  const navigationItems = [
    { label: 'Hotels', href: '/hotels', featured: true },
    { label: 'Destinations', href: '/destinations' },
    { label: 'Travel Guides', href: '/blog' },
    { label: 'Deals', href: '/deals', badge: 'Hot' },
    { label: 'About', href: '/about' },
  ];

  const quickLinks = [
    { label: 'Last Minute Deals', href: '/deals/last-minute' },
    { label: 'Luxury Hotels', href: '/hotels/luxury' },
    { label: 'Business Travel', href: '/business' },
    { label: 'Group Bookings', href: '/groups' },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-brand-600 to-brand-700 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1">
              <Globe className="w-4 h-4" />
              <span>English (US)</span>
            </span>
            <span className="flex items-center space-x-1">
              <span>USD</span>
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <span className="text-brand-100">24/7 Customer Support: +1-800-TRAVEL</span>
            <Button variant="ghost" size="sm" className="text-white hover:text-brand-100">
              Help Center
            </Button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-500 to-brand-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-glow transition-all duration-300">
                <span className="text-white font-bold text-xl font-heading">T</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold font-heading bg-gradient-to-r from-brand-600 to-brand-800 bg-clip-text text-transparent">
                  Travelenda
                </span>
                <span className="text-xs text-gray-500 font-medium tracking-wide">
                  Same Stays. Better Prices.
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative group px-3 py-2 rounded-lg transition-all duration-300 ${
                    item.featured
                      ? 'text-brand-600 font-semibold hover:text-brand-700'
                      : 'text-gray-700 hover:text-brand-600 font-medium'
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 bg-accent-coral text-white text-xs px-2 py-0.5 rounded-full font-bold animate-pulse">
                      {item.badge}
                    </span>
                  )}
                  {item.featured && (
                    <div className="absolute inset-0 bg-brand-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Search Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSearchOpen(true)}
                className="hidden md:flex items-center space-x-2 text-gray-600 hover:text-brand-600 hover:bg-brand-50"
              >
                <Search className="w-5 h-5" />
                <span>Search</span>
              </Button>

              {/* Favorites */}
              <Button
                variant="ghost"
                size="sm"
                className="relative text-gray-600 hover:text-accent-rose hover:bg-rose-50"
              >
                <Heart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-accent-rose text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  3
                </span>
              </Button>

              {/* Notifications */}
              <Button
                variant="ghost"
                size="sm"
                className="relative text-gray-600 hover:text-brand-600 hover:bg-brand-50"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-accent-orange text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  2
                </span>
              </Button>

              {/* User Account */}
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={profile?.avatar_url || ''} alt={profile?.full_name || 'User'} />
                        <AvatarFallback className="bg-brand-100 text-brand-600">
                          {profile?.full_name ? profile.full_name.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {profile?.full_name || 'User'}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard?tab=bookings" className="flex items-center">
                        <BookOpen className="mr-2 h-4 w-4" />
                        <span>My Bookings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard?tab=settings" className="flex items-center">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-600 focus:text-red-600"
                      onClick={() => signOut()}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="hidden md:flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="text-gray-600 hover:text-brand-600 hover:bg-brand-50"
                  >
                    <Link href="/auth/login">Sign In</Link>
                  </Button>
                  <Button
                    size="sm"
                    asChild
                    className="bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white"
                  >
                    <Link href="/auth/register">Sign Up</Link>
                  </Button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden text-gray-600 hover:text-brand-600"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Links Bar */}
        <div className="hidden lg:block bg-gray-50 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center space-x-6">
                <span className="text-sm font-medium text-gray-600">Quick Access:</span>
                {quickLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-brand-600 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">🔥 Trending:</span>
                <Link href="/destinations/bali" className="text-sm text-accent-coral hover:text-accent-coral/80 font-medium">
                  Bali Hotels
                </Link>
                <Link href="/destinations/tokyo" className="text-sm text-accent-teal hover:text-accent-teal/80 font-medium">
                  Tokyo Stays
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setIsMenuOpen(false)}>
          <div className="absolute top-0 right-0 w-80 h-full bg-white shadow-2xl transform transition-transform duration-300">
            <div className="p-6">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold font-heading text-gray-900">Menu</h2>
                <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(false)}>
                  <X className="w-6 h-6" />
                </Button>
              </div>
              
              <nav className="space-y-4">
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-brand-50 transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className={`font-medium ${
                      item.featured ? 'text-brand-600' : 'text-gray-700'
                    }`}>
                      {item.label}
                    </span>
                    {item.badge && (
                      <span className="bg-accent-coral text-white text-xs px-2 py-1 rounded-full font-bold">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </nav>
              
              <div className="mt-8 pt-8 border-t border-gray-200">
                {isAuthenticated ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-brand-50 rounded-lg">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={profile?.avatar_url || ''} alt={profile?.full_name || 'User'} />
                        <AvatarFallback className="bg-brand-100 text-brand-600">
                          {profile?.full_name ? profile.full_name.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {profile?.full_name || 'User'}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full"
                      asChild
                    >
                      <Link href="/dashboard">Dashboard</Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full text-red-600 border-red-200 hover:bg-red-50"
                      onClick={() => {
                        signOut();
                        setIsMenuOpen(false);
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full"
                      asChild
                    >
                      <Link href="/auth/login">Sign In</Link>
                    </Button>
                    <Button
                      className="w-full bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white font-semibold py-3"
                      asChild
                    >
                      <Link href="/auth/register">Sign Up</Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-start justify-center pt-20" onClick={() => setIsSearchOpen(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center space-x-4">
                <Search className="w-6 h-6 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search destinations, hotels, or travel guides..."
                  className="flex-1 text-lg border-none outline-none placeholder-gray-400"
                  autoFocus
                />
                <Button variant="ghost" size="sm" onClick={() => setIsSearchOpen(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <div className="mt-6 space-y-3">
                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Popular Searches</h3>
                <div className="flex flex-wrap gap-2">
                  {['Bali Hotels', 'Tokyo Stays', 'Paris Luxury', 'NYC Business', 'Beach Resorts'].map((term) => (
                    <button
                      key={term}
                      className="px-4 py-2 bg-gray-100 hover:bg-brand-50 hover:text-brand-600 rounded-full text-sm font-medium transition-colors duration-200"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;