'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { 
  Calendar, 
  MapPin, 
  Users, 
  CreditCard, 
  Settings, 
  LogOut, 
  Bell, 
  Heart, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Plus,
  Filter,
  Search,
  Download,
  Eye,
  Star,
  Loader2,
  User,
  BookOpen,
  Camera,
  Save,
  Edit3,
  Shield
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth, withAuth } from '@/contexts/AuthContext'

// Mock bookings data - replace with actual API integration
const mockBookings = [
  {
    id: 'BK001',
    confirmationNumber: 'TRV-2024-001',
    hotelName: 'Grand Plaza Hotel',
    hotelImage: '/api/placeholder/300/200',
    location: 'New York, NY',
    checkinDate: '2024-02-15',
    checkoutDate: '2024-02-18',
    guests: 2,
    roomType: 'Deluxe King Room',
    totalAmount: 450,
    status: 'confirmed',
    starRating: 4
  },
  {
    id: 'BK002',
    confirmationNumber: 'TRV-2024-002',
    hotelName: 'Seaside Resort & Spa',
    hotelImage: '/api/placeholder/300/200',
    location: 'Miami Beach, FL',
    checkinDate: '2024-01-20',
    checkoutDate: '2024-01-25',
    guests: 4,
    roomType: 'Ocean View Suite',
    totalAmount: 1200,
    status: 'completed',
    starRating: 5
  },
  {
    id: 'BK003',
    confirmationNumber: 'TRV-2024-003',
    hotelName: 'Mountain Lodge',
    hotelImage: '/api/placeholder/300/200',
    location: 'Aspen, CO',
    checkinDate: '2024-03-10',
    checkoutDate: '2024-03-15',
    guests: 2,
    roomType: 'Mountain View Cabin',
    totalAmount: 800,
    status: 'cancelled',
    starRating: 4
  }
]

// Mock saved hotels data
const mockSavedHotels = [
  {
    id: 'H001',
    name: 'Luxury Downtown Hotel',
    image: '/api/placeholder/300/200',
    location: 'San Francisco, CA',
    starRating: 5,
    priceFrom: 299,
    rating: 4.8,
    reviewCount: 1250
  },
  {
    id: 'H002',
    name: 'Boutique Garden Inn',
    image: '/api/placeholder/300/200',
    location: 'Portland, OR',
    starRating: 4,
    priceFrom: 189,
    rating: 4.6,
    reviewCount: 890
  }
]

function DashboardPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, profile, signOut, loading: authLoading } = useAuth()
  const [bookings, setBookings] = useState(mockBookings)
  const [savedHotels, setSavedHotels] = useState(mockSavedHotels)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const activeTab = searchParams.get('tab') || 'overview'

  // Filter bookings based on search and status
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.hotelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.confirmationNumber.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-blue-600" />
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-600" />
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'completed':
        return 'bg-blue-100 text-blue-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleViewBooking = (bookingId: string) => {
    router.push(`/booking/${bookingId}`)
  }

  const handleCancelBooking = async (bookingId: string) => {
    try {
      setLoading(true)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setBookings(prev => prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: 'cancelled' }
          : booking
      ))
      
      toast.success('Booking cancelled successfully')
    } catch (error) {
      toast.error('Failed to cancel booking')
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveSavedHotel = (hotelId: string) => {
    setSavedHotels(prev => prev.filter(hotel => hotel.id !== hotelId))
    toast.success('Hotel removed from saved list')
  }

  const handleLogout = async () => {
    try {
      await signOut()
      toast.success('Logged out successfully')
      router.push('/')
    } catch (error) {
      toast.error('Failed to log out')
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Travelenda
            </Link>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <Avatar className="w-20 h-20 mx-auto mb-4">
                    <AvatarImage src={profile?.avatar_url || ''} alt={profile?.full_name || 'User'} />
                    <AvatarFallback className="bg-blue-100 text-blue-600 text-lg font-semibold">
                      {profile?.full_name ? profile.full_name.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {profile?.full_name || 'User'}
                  </h2>
                  <p className="text-gray-600">{user?.email}</p>
                  <Badge variant="secondary" className="mt-2">
                     Member since {user?.created_at ? new Date(user.created_at).getFullYear() : new Date().getFullYear()}
                  </Badge>
                </div>
                
                <Separator className="mb-6" />
                
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{user.totalBookings}</p>
                    <p className="text-sm text-gray-600">Total Bookings</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">${user.totalSpent.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Total Spent</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">{user.loyaltyPoints}</p>
                    <p className="text-sm text-gray-600">Loyalty Points</p>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start" onClick={() => router.push('/dashboard/profile')}>
                    <Settings className="h-4 w-4 mr-3" />
                    Account Settings
                  </Button>
                  
                  <Button variant="ghost" className="w-full justify-start" onClick={() => router.push('/dashboard/payment-methods')}>
                    <CreditCard className="h-4 w-4 mr-3" />
                    Payment Methods
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Dashboard</h1>
              <p className="text-gray-600">Manage your bookings and account settings</p>
            </div>

            <Tabs defaultValue="bookings" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="bookings">My Bookings</TabsTrigger>
                <TabsTrigger value="saved">Saved Hotels</TabsTrigger>
              </TabsList>

              {/* Bookings Tab */}
              <TabsContent value="bookings" className="space-y-6">
                {/* Search and Filter */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            placeholder="Search bookings..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Filter className="h-4 w-4 text-gray-400" />
                        <select
                          value={statusFilter}
                          onChange={(e) => setStatusFilter(e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="all">All Status</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                          <option value="pending">Pending</option>
                        </select>
                      </div>
                      
                      <Button onClick={() => router.push('/')} className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="h-4 w-4 mr-2" />
                        New Booking
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Bookings List */}
                <div className="space-y-4">
                  {filteredBookings.length === 0 ? (
                    <Card>
                      <CardContent className="p-8 text-center">
                        <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No bookings found</h3>
                        <p className="text-gray-600 mb-4">
                          {searchTerm || statusFilter !== 'all' 
                            ? 'Try adjusting your search or filter criteria.'
                            : 'You haven\'t made any bookings yet. Start planning your next trip!'}
                        </p>
                        <Button onClick={() => router.push('/')} className="bg-blue-600 hover:bg-blue-700">
                          Book Your First Stay
                        </Button>
                      </CardContent>
                    </Card>
                  ) : (
                    filteredBookings.map((booking) => (
                      <Card key={booking.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                            {/* Hotel Image */}
                            <div className="w-full lg:w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
                              <Image
                                src={booking.hotelImage}
                                alt={booking.hotelName}
                                width={128}
                                height={96}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            
                            {/* Booking Details */}
                            <div className="flex-1 space-y-2">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="font-semibold text-lg text-gray-900">{booking.hotelName}</h3>
                                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                                    <div className="flex items-center">
                                      {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`h-3 w-3 ${
                                          i < booking.starRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                        }`} />
                                      ))}
                                    </div>
                                    <span>•</span>
                                    <MapPin className="h-3 w-3" />
                                    <span>{booking.location}</span>
                                  </div>
                                </div>
                                
                                <div className="flex items-center space-x-2">
                                  {getStatusIcon(booking.status)}
                                  <Badge className={getStatusColor(booking.status)}>
                                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                  </Badge>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                                <div className="flex items-center space-x-2">
                                  <Calendar className="h-4 w-4 text-gray-400" />
                                  <div>
                                    <p className="text-gray-600">Check-in</p>
                                    <p className="font-medium">{new Date(booking.checkinDate).toLocaleDateString()}</p>
                                  </div>
                                </div>
                                
                                <div className="flex items-center space-x-2">
                                  <Calendar className="h-4 w-4 text-gray-400" />
                                  <div>
                                    <p className="text-gray-600">Check-out</p>
                                    <p className="font-medium">{new Date(booking.checkoutDate).toLocaleDateString()}</p>
                                  </div>
                                </div>
                                
                                <div className="flex items-center space-x-2">
                                  <Users className="h-4 w-4 text-gray-400" />
                                  <div>
                                    <p className="text-gray-600">Guests</p>
                                    <p className="font-medium">{booking.guests} guest{booking.guests > 1 ? 's' : ''}</p>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-between pt-2">
                                <div>
                                  <p className="text-sm text-gray-600">Confirmation: {booking.confirmationNumber}</p>
                                  <p className="text-sm text-gray-600">Room: {booking.roomType}</p>
                                </div>
                                
                                <div className="text-right">
                                  <p className="text-lg font-semibold text-gray-900">${booking.totalAmount}</p>
                                  <p className="text-sm text-gray-600">Total</p>
                                </div>
                              </div>
                            </div>
                            
                            {/* Actions */}
                            <div className="flex flex-col space-y-2 lg:w-32">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleViewBooking(booking.id)}
                                className="w-full"
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </Button>
                              
                              {booking.status === 'confirmed' && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleCancelBooking(booking.id)}
                                  disabled={loading}
                                  className="w-full text-red-600 hover:text-red-700"
                                >
                                  {loading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    'Cancel'
                                  )}
                                </Button>
                              )}
                              
                              <Button
                                size="sm"
                                variant="ghost"
                                className="w-full"
                              >
                                <Download className="h-4 w-4 mr-2" />
                                Receipt
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </TabsContent>

              {/* Saved Hotels Tab */}
              <TabsContent value="saved" className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Saved Hotels</h2>
                    <p className="text-gray-600">Hotels you've saved for future bookings</p>
                  </div>
                  
                  <Button onClick={() => router.push('/')} variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Find More Hotels
                  </Button>
                </div>
                
                {savedHotels.length === 0 ? (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No saved hotels</h3>
                      <p className="text-gray-600 mb-4">
                        Save hotels you're interested in to easily find them later.
                      </p>
                      <Button onClick={() => router.push('/')} className="bg-blue-600 hover:bg-blue-700">
                        Explore Hotels
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {savedHotels.map((hotel) => (
                      <Card key={hotel.id} className="hover:shadow-md transition-shadow">
                        <div className="relative">
                          <div className="w-full h-48 rounded-t-lg overflow-hidden">
                            <Image
                              src={hotel.image}
                              alt={hotel.name}
                              width={400}
                              height={192}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleRemoveSavedHotel(hotel.id)}
                            className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                          >
                            <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                          </Button>
                        </div>
                        
                        <CardContent className="p-4">
                          <div className="space-y-2">
                            <h3 className="font-semibold text-lg text-gray-900">{hotel.name}</h3>
                            
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className={`h-3 w-3 ${
                                    i < hotel.starRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                  }`} />
                                ))}
                              </div>
                              <span>•</span>
                              <MapPin className="h-3 w-3" />
                              <span>{hotel.location}</span>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2 text-sm">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="font-medium">{hotel.rating}</span>
                                <span className="text-gray-600">({hotel.reviewCount} reviews)</span>
                              </div>
                              
                              <div className="text-right">
                                <p className="text-lg font-semibold text-gray-900">${hotel.priceFrom}</p>
                                <p className="text-sm text-gray-600">per night</p>
                              </div>
                            </div>
                            
                            <Button 
                              onClick={() => router.push(`/hotel/${hotel.id}`)}
                              className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
                            >
                              View Details
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withAuth(DashboardPage)