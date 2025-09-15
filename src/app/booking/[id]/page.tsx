'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { 
  CheckCircle, 
  Calendar, 
  MapPin, 
  Users, 
  Phone, 
  Mail, 
  Download, 
  Share2, 
  ArrowLeft,
  Loader2,
  AlertCircle,
  Star,
  Clock
} from 'lucide-react'
import { liteAPI, type LiteAPIBookingResponse } from '@/lib/lite-api'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import Image from 'next/image'

export default function BookingConfirmationPage() {
  const params = useParams()
  const router = useRouter()
  const bookingId = params.id as string

  const [booking, setBooking] = useState<LiteAPIBookingResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadBookingDetails = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const bookingData = await liteAPI.getBooking(bookingId)
        setBooking(bookingData)
      } catch (err) {
        console.error('Error loading booking:', err)
        setError('Failed to load booking details. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    if (bookingId) {
      loadBookingDetails()
    }
  }, [bookingId])

  const handleDownloadConfirmation = () => {
    if (!booking) return
    
    // Create a simple text confirmation
    const confirmationText = `
TRAVELENDA BOOKING CONFIRMATION

Confirmation Number: ${booking.confirmationNumber}
Booking ID: ${booking.bookingId}

Hotel: ${booking.hotelName}
Address: ${booking.hotelAddress}

Guest: ${booking.guestInfo.firstName} ${booking.guestInfo.lastName}
Email: ${booking.guestInfo.email}
Phone: ${booking.guestInfo.phone}

Check-in: ${booking.checkinDate}
Check-out: ${booking.checkoutDate}
Guests: ${booking.adults} adults${booking.children > 0 ? `, ${booking.children} children` : ''}

Room: ${booking.roomName}
Total Amount: $${booking.totalAmount}
Status: ${booking.status}

Thank you for booking with Travelenda!
    `
    
    const blob = new Blob([confirmationText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `travelenda-booking-${booking.confirmationNumber}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    toast.success('Confirmation downloaded successfully!')
  }

  const handleShareBooking = async () => {
    if (!booking) return
    
    const shareData = {
      title: 'Travelenda Booking Confirmation',
      text: `My booking at ${booking.hotelName} is confirmed! Confirmation: ${booking.confirmationNumber}`,
      url: window.location.href
    }
    
    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(`${shareData.text} - ${shareData.url}`)
        toast.success('Booking details copied to clipboard!')
      }
    } catch (error) {
      console.error('Error sharing:', error)
      toast.error('Failed to share booking details')
    }
  }

  const calculateNights = (checkin: string, checkout: string) => {
    const checkinDate = new Date(checkin)
    const checkoutDate = new Date(checkout)
    const diffTime = Math.abs(checkoutDate.getTime() - checkinDate.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading booking details...</p>
        </div>
      </div>
    )
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Booking Not Found</h1>
          <p className="text-gray-600 mb-6">{error || 'The booking you are looking for does not exist.'}</p>
          <Button onClick={() => router.push('/')} className="bg-blue-600 hover:bg-blue-700">
            Go Home
          </Button>
        </div>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => router.push('/')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Button>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={handleDownloadConfirmation}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button variant="ghost" size="sm" onClick={handleShareBooking}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600 max-w-md mx-auto">
            Your reservation has been successfully confirmed. We've sent a confirmation email to {booking.guestInfo.email}.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Booking Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Confirmation Details */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-semibold">Booking Details</CardTitle>
                  <Badge className={getStatusColor(booking.status)}>
                    {booking.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Confirmation Number</p>
                    <p className="font-semibold text-lg">{booking.confirmationNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Booking ID</p>
                    <p className="font-semibold">{booking.bookingId}</p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Check-in</p>
                      <p className="font-medium">{new Date(booking.checkinDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Check-out</p>
                      <p className="font-medium">{new Date(booking.checkoutDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Guests</p>
                    <p className="font-medium">
                      {booking.adults} adult{booking.adults > 1 ? 's' : ''}
                      {booking.children > 0 && `, ${booking.children} child${booking.children > 1 ? 'ren' : ''}`}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="font-medium">
                      {calculateNights(booking.checkinDate, booking.checkoutDate)} night{calculateNights(booking.checkinDate, booking.checkoutDate) > 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Hotel Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Hotel Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-4">
                  {booking.hotelImage && (
                    <div className="w-24 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={booking.hotelImage}
                        alt={booking.hotelName}
                        width={96}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">{booking.hotelName}</h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${
                            i < (booking.hotelStarRating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                          }`} />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">{booking.hotelStarRating} Star Hotel</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                      <p className="text-gray-600 text-sm">{booking.hotelAddress}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Room Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Room Details</CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="font-semibold text-gray-900 mb-2">{booking.roomName}</n                <p className="text-gray-600 text-sm mb-3">{booking.roomDescription}</p>
                
                {booking.roomAmenities && booking.roomAmenities.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-2">Room Amenities</p>
                    <div className="flex flex-wrap gap-2">
                      {booking.roomAmenities.map((amenity, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Guest Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Guest Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Primary Guest</p>
                  <p className="font-medium">{booking.guestInfo.firstName} {booking.guestInfo.lastName}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium">{booking.guestInfo.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-medium">{booking.guestInfo.phone}</p>
                    </div>
                  </div>
                </div>
                
                {booking.specialRequests && (
                  <div>
                    <p className="text-sm text-gray-600">Special Requests</p>
                    <p className="font-medium">{booking.specialRequests}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Payment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Room Rate</span>
                    <span className="font-medium">${booking.roomRate || 0}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taxes & Fees</span>
                    <span className="font-medium">${booking.taxes || 0}</span>
                  </div>
                  
                  {booking.discountAmount && booking.discountAmount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-${booking.discountAmount}</span>
                    </div>
                  )}
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total Paid</span>
                    <span className="text-blue-600">${booking.totalAmount}</span>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Payment Method:</strong> {booking.paymentMethod || 'Credit Card'}</p>
                  {booking.paymentStatus && (
                    <p><strong>Payment Status:</strong> 
                      <Badge className={`ml-2 ${booking.paymentStatus === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {booking.paymentStatus}
                      </Badge>
                    </p>
                  )}
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <Button 
                    onClick={() => router.push('/dashboard/bookings')} 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    View All Bookings
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => router.push('/')} 
                    className="w-full"
                  >
                    Book Another Stay
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Important Information */}
        <Card className="max-w-4xl mx-auto mt-8">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Important Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-gray-600">
            <div>
              <p className="font-medium text-gray-900">Check-in Instructions:</p>
              <p>Please present a valid photo ID and the credit card used for booking at check-in. Early check-in and late check-out are subject to availability and may incur additional charges.</p>
            </div>
            
            <div>
              <p className="font-medium text-gray-900">Cancellation Policy:</p>
              <p>Cancellation policies vary by rate and date. Please review your booking confirmation email for specific cancellation terms.</p>
            </div>
            
            <div>
              <p className="font-medium text-gray-900">Contact Information:</p>
              <p>For any questions about your booking, please contact our customer service at support@travelenda.com or call +1 (555) 123-4567.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}