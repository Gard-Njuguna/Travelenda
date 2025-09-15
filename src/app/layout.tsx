import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as SonnerToaster } from 'sonner'
import { AuthProvider } from '@/contexts/AuthContext'

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "Travelenda - Discover Amazing Hotels Worldwide",
    template: "%s | Travelenda"
  },
  description: "Find and book the perfect hotel for your next adventure. Compare prices from 2+ million properties worldwide and save with Travelenda.",
  keywords: ["hotels", "booking", "travel", "accommodation", "vacation", "business travel"],
  authors: [{ name: "Travelenda Team" }],
  creator: "Travelenda",
  publisher: "Travelenda",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Travelenda - Discover Amazing Hotels Worldwide',
    description: 'Find and book the perfect hotel for your next adventure. Compare prices from 2+ million properties worldwide.',
    siteName: 'Travelenda',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Travelenda - Hotel Booking Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Travelenda - Discover Amazing Hotels Worldwide',
    description: 'Find and book the perfect hotel for your next adventure. Compare prices from 2+ million properties worldwide.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-white text-gray-900">
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
          <SonnerToaster 
            position="top-right" 
            richColors 
            closeButton 
            duration={4000}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
