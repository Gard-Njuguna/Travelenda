'use client'

import Link from 'next/link'
import { ArrowLeft, Calendar, Shield, AlertTriangle } from 'lucide-react'

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>Last updated: December 15, 2024</span>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          {/* Important Notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Notice</h3>
                <p className="text-yellow-700 text-sm leading-relaxed">
                  Please read these Terms of Service carefully before using Travelenda. By accessing or using our service, 
                  you agree to be bound by these terms. If you do not agree to these terms, please do not use our service.
                </p>
              </div>
            </div>
          </div>
          
          {/* Table of Contents */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Table of Contents</h2>
            <nav className="space-y-2">
              <a href="#acceptance" className="block text-blue-600 hover:text-blue-700 transition-colors">1. Acceptance of Terms</a>
              <a href="#description" className="block text-blue-600 hover:text-blue-700 transition-colors">2. Description of Service</a>
              <a href="#user-accounts" className="block text-blue-600 hover:text-blue-700 transition-colors">3. User Accounts</a>
              <a href="#booking-terms" className="block text-blue-600 hover:text-blue-700 transition-colors">4. Booking Terms</a>
              <a href="#payment" className="block text-blue-600 hover:text-blue-700 transition-colors">5. Payment and Pricing</a>
              <a href="#cancellation" className="block text-blue-600 hover:text-blue-700 transition-colors">6. Cancellation and Refunds</a>
              <a href="#user-conduct" className="block text-blue-600 hover:text-blue-700 transition-colors">7. User Conduct</a>
              <a href="#intellectual-property" className="block text-blue-600 hover:text-blue-700 transition-colors">8. Intellectual Property</a>
              <a href="#privacy" className="block text-blue-600 hover:text-blue-700 transition-colors">9. Privacy</a>
              <a href="#disclaimers" className="block text-blue-600 hover:text-blue-700 transition-colors">10. Disclaimers</a>
              <a href="#limitation-liability" className="block text-blue-600 hover:text-blue-700 transition-colors">11. Limitation of Liability</a>
              <a href="#termination" className="block text-blue-600 hover:text-blue-700 transition-colors">12. Termination</a>
              <a href="#governing-law" className="block text-blue-600 hover:text-blue-700 transition-colors">13. Governing Law</a>
              <a href="#contact" className="block text-blue-600 hover:text-blue-700 transition-colors">14. Contact Information</a>
            </nav>
          </div>
          
          {/* Terms Content */}
          <div className="space-y-8">
            <section id="acceptance">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                By accessing and using Travelenda ("we," "our," or "us"), you accept and agree to be bound by the terms 
                and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
              <p className="text-gray-700 leading-relaxed">
                These Terms of Service may be updated from time to time without notice. Your continued use of the service 
                constitutes acceptance of those changes.
              </p>
            </section>
            
            <section id="description">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Travelenda is an online travel booking platform that allows users to search, compare, and book 
                accommodations worldwide. We act as an intermediary between travelers and accommodation providers.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our services include but are not limited to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-4">
                <li>Hotel and accommodation search and booking</li>
                <li>Price comparison across multiple providers</li>
                <li>Customer support for booking-related inquiries</li>
                <li>Travel-related content and blog articles</li>
                <li>User account management and booking history</li>
              </ul>
            </section>
            
            <section id="user-accounts">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                To access certain features of our service, you may be required to create an account. You are responsible 
                for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                You agree to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Provide accurate, current, and complete information during registration</li>
                <li>Maintain and promptly update your account information</li>
                <li>Keep your password secure and confidential</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
                <li>Be responsible for all activities that occur under your account</li>
              </ul>
            </section>
            
            <section id="booking-terms">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Booking Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                When you make a booking through Travelenda, you enter into a contract directly with the accommodation 
                provider. We facilitate this transaction but are not a party to the contract between you and the provider.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                By making a booking, you agree to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Provide accurate guest information and contact details</li>
                <li>Comply with the accommodation provider's terms and conditions</li>
                <li>Respect the property's rules and policies</li>
                <li>Pay all applicable fees and charges</li>
                <li>Arrive at the specified check-in time or notify the property of delays</li>
              </ul>
            </section>
            
            <section id="payment">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Payment and Pricing</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                All prices displayed on Travelenda include applicable taxes and fees unless otherwise stated. 
                Prices are subject to change until your booking is confirmed.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Payment terms:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Payment is due at the time of booking unless otherwise specified</li>
                <li>We accept major credit cards and other payment methods as displayed</li>
                <li>Currency conversion rates are determined by your payment provider</li>
                <li>Additional charges may apply for certain payment methods</li>
                <li>All transactions are processed securely through encrypted connections</li>
              </ul>
            </section>
            
            <section id="cancellation">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cancellation and Refunds</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Cancellation and refund policies vary by accommodation provider and booking type. These policies 
                are clearly displayed during the booking process and in your confirmation email.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                General cancellation terms:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Free cancellation periods vary by property and rate type</li>
                <li>Some bookings may be non-refundable</li>
                <li>Cancellation fees may apply depending on timing and property policy</li>
                <li>Refunds are processed to the original payment method</li>
                <li>Processing time for refunds varies by payment provider</li>
              </ul>
            </section>
            
            <section id="user-conduct">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. User Conduct</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You agree not to use Travelenda for any unlawful purpose or in any way that could damage, 
                disable, overburden, or impair our service.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Prohibited activities include:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Making fraudulent or false bookings</li>
                <li>Using automated systems to access our service</li>
                <li>Attempting to gain unauthorized access to our systems</li>
                <li>Posting inappropriate or offensive content</li>
                <li>Violating any applicable laws or regulations</li>
                <li>Interfering with other users' use of the service</li>
              </ul>
            </section>
            
            <section id="intellectual-property">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Intellectual Property</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                All content on Travelenda, including but not limited to text, graphics, logos, images, and software, 
                is the property of Travelenda or its licensors and is protected by copyright and other intellectual property laws.
              </p>
              <p className="text-gray-700 leading-relaxed">
                You may not reproduce, distribute, modify, or create derivative works of our content without 
                express written permission.
              </p>
            </section>
            
            <section id="privacy">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Privacy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect 
                your personal information when you use our service.
              </p>
              <p className="text-gray-700 leading-relaxed">
                By using Travelenda, you consent to the collection and use of your information as described 
                in our <Link href="/legal/privacy" className="text-blue-600 hover:text-blue-700 transition-colors">Privacy Policy</Link>.
              </p>
            </section>
            
            <section id="disclaimers">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Disclaimers</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Travelenda provides its service "as is" without any warranties, express or implied. We do not 
                guarantee the accuracy, completeness, or reliability of any information on our platform.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We are not responsible for the quality, safety, or legality of accommodations listed on our platform, 
                or the truth or accuracy of listings or reviews.
              </p>
            </section>
            
            <section id="limitation-liability">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                To the maximum extent permitted by law, Travelenda shall not be liable for any indirect, incidental, 
                special, consequential, or punitive damages, including but not limited to loss of profits, data, or use.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our total liability for any claims arising from your use of our service shall not exceed the 
                amount you paid to us in the twelve months preceding the claim.
              </p>
            </section>
            
            <section id="termination">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Termination</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may terminate or suspend your account and access to our service at any time, without prior 
                notice, for conduct that we believe violates these Terms of Service or is harmful to other users.
              </p>
              <p className="text-gray-700 leading-relaxed">
                You may terminate your account at any time by contacting our customer support team.
              </p>
            </section>
            
            <section id="governing-law">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Governing Law</h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms of Service shall be governed by and construed in accordance with the laws of the 
                State of California, United States, without regard to its conflict of law provisions.
              </p>
            </section>
            
            <section id="contact">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Contact Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-start space-x-3">
                  <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Travelenda Legal Team</h4>
                    <p className="text-gray-700 text-sm mb-1">Email: legal@travelenda.com</p>
                    <p className="text-gray-700 text-sm mb-1">Phone: +1 (555) 123-4567</p>
                    <p className="text-gray-700 text-sm">
                      Address: 123 Travel Street, San Francisco, CA 94105, United States
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
          
          {/* Footer Navigation */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <Link
                href="/legal/privacy"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
              >
                <span>Privacy Policy</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
              >
                <span>Contact Support</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}