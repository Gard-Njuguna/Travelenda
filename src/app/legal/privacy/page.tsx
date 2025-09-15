'use client'

import Link from 'next/link'
import { ArrowLeft, Calendar, Shield, Eye, Lock, Database, Globe } from 'lucide-react'

export default function PrivacyPolicyPage() {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>Last updated: December 15, 2024</span>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          {/* Privacy Commitment */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <div className="flex items-start space-x-3">
              <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Our Privacy Commitment</h3>
                <p className="text-blue-700 text-sm leading-relaxed">
                  At Travelenda, we are committed to protecting your privacy and ensuring the security of your personal information. 
                  This Privacy Policy explains how we collect, use, share, and protect your information when you use our services.
                </p>
              </div>
            </div>
          </div>
          
          {/* Table of Contents */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Table of Contents</h2>
            <nav className="space-y-2">
              <a href="#information-collect" className="block text-blue-600 hover:text-blue-700 transition-colors">1. Information We Collect</a>
              <a href="#how-we-use" className="block text-blue-600 hover:text-blue-700 transition-colors">2. How We Use Your Information</a>
              <a href="#information-sharing" className="block text-blue-600 hover:text-blue-700 transition-colors">3. Information Sharing</a>
              <a href="#data-security" className="block text-blue-600 hover:text-blue-700 transition-colors">4. Data Security</a>
              <a href="#cookies" className="block text-blue-600 hover:text-blue-700 transition-colors">5. Cookies and Tracking</a>
              <a href="#your-rights" className="block text-blue-600 hover:text-blue-700 transition-colors">6. Your Rights and Choices</a>
              <a href="#data-retention" className="block text-blue-600 hover:text-blue-700 transition-colors">7. Data Retention</a>
              <a href="#international-transfers" className="block text-blue-600 hover:text-blue-700 transition-colors">8. International Data Transfers</a>
              <a href="#children-privacy" className="block text-blue-600 hover:text-blue-700 transition-colors">9. Children's Privacy</a>
              <a href="#policy-changes" className="block text-blue-600 hover:text-blue-700 transition-colors">10. Policy Changes</a>
              <a href="#contact-us" className="block text-blue-600 hover:text-blue-700 transition-colors">11. Contact Us</a>
            </nav>
          </div>
          
          {/* Privacy Policy Content */}
          <div className="space-y-8">
            <section id="information-collect">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Information You Provide</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We collect information you voluntarily provide when using our services:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li><strong>Account Information:</strong> Name, email address, phone number, password</li>
                    <li><strong>Booking Information:</strong> Guest details, travel dates, preferences, special requests</li>
                    <li><strong>Payment Information:</strong> Credit card details, billing address (processed securely by our payment partners)</li>
                    <li><strong>Communication:</strong> Messages, reviews, feedback, and support inquiries</li>
                    <li><strong>Profile Information:</strong> Travel preferences, loyalty program details, profile photos</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Information We Collect Automatically</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    When you use our services, we automatically collect certain information:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li><strong>Device Information:</strong> IP address, browser type, operating system, device identifiers</li>
                    <li><strong>Usage Information:</strong> Pages visited, search queries, booking history, time spent on site</li>
                    <li><strong>Location Information:</strong> General location based on IP address (with your consent for precise location)</li>
                    <li><strong>Cookies and Tracking:</strong> Information collected through cookies and similar technologies</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Information from Third Parties</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We may receive information from third-party sources:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li><strong>Social Media:</strong> Information from social login services (with your permission)</li>
                    <li><strong>Partners:</strong> Hotel and accommodation providers, payment processors</li>
                    <li><strong>Analytics:</strong> Aggregated data from analytics and advertising partners</li>
                  </ul>
                </div>
              </div>
            </section>
            
            <section id="how-we-use">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use your information to provide, improve, and personalize our services:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center mb-3">
                    <Database className="w-5 h-5 text-blue-600 mr-2" />
                    <h3 className="font-semibold text-gray-800">Service Provision</h3>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Process bookings and payments</li>
                    <li>• Manage your account</li>
                    <li>• Provide customer support</li>
                    <li>• Send booking confirmations</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center mb-3">
                    <Eye className="w-5 h-5 text-green-600 mr-2" />
                    <h3 className="font-semibold text-gray-800">Personalization</h3>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Customize search results</li>
                    <li>• Recommend relevant hotels</li>
                    <li>• Remember your preferences</li>
                    <li>• Provide targeted content</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center mb-3">
                    <Shield className="w-5 h-5 text-purple-600 mr-2" />
                    <h3 className="font-semibold text-gray-800">Security & Fraud Prevention</h3>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Detect fraudulent activity</li>
                    <li>• Verify identity</li>
                    <li>• Protect against abuse</li>
                    <li>• Ensure platform security</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center mb-3">
                    <Globe className="w-5 h-5 text-orange-600 mr-2" />
                    <h3 className="font-semibold text-gray-800">Communication</h3>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Send service updates</li>
                    <li>• Marketing communications</li>
                    <li>• Travel tips and offers</li>
                    <li>• Important notifications</li>
                  </ul>
                </div>
              </div>
            </section>
            
            <section id="information-sharing">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Information Sharing</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We share your information only in specific circumstances and with appropriate safeguards:
              </p>
              
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-gray-800 mb-2">With Accommodation Providers</h3>
                  <p className="text-gray-700 text-sm">
                    We share necessary booking information (name, contact details, stay dates) with hotels 
                    and accommodation providers to complete your reservation.
                  </p>
                </div>
                
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-gray-800 mb-2">With Service Providers</h3>
                  <p className="text-gray-700 text-sm">
                    We work with trusted third-party service providers for payment processing, customer support, 
                    analytics, and marketing services under strict confidentiality agreements.
                  </p>
                </div>
                
                <div className="border-l-4 border-yellow-500 pl-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Legal Requirements</h3>
                  <p className="text-gray-700 text-sm">
                    We may disclose information when required by law, to protect our rights, or to ensure 
                    the safety and security of our users and platform.
                  </p>
                </div>
                
                <div className="border-l-4 border-red-500 pl-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Business Transfers</h3>
                  <p className="text-gray-700 text-sm">
                    In the event of a merger, acquisition, or sale of assets, your information may be 
                    transferred as part of the business transaction.
                  </p>
                </div>
              </div>
            </section>
            
            <section id="data-security">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We implement comprehensive security measures to protect your personal information:
              </p>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-start space-x-3">
                  <Lock className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-green-800 mb-3">Security Measures</h3>
                    <ul className="text-green-700 text-sm space-y-2">
                      <li>• <strong>Encryption:</strong> All data transmission is encrypted using SSL/TLS protocols</li>
                      <li>• <strong>Secure Storage:</strong> Personal data is stored in secure, access-controlled environments</li>
                      <li>• <strong>Access Controls:</strong> Strict employee access controls and authentication requirements</li>
                      <li>• <strong>Regular Audits:</strong> Ongoing security assessments and vulnerability testing</li>
                      <li>• <strong>Incident Response:</strong> Comprehensive procedures for handling security incidents</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
            
            <section id="cookies">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Cookies and Tracking</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use cookies and similar technologies to enhance your experience and analyze usage patterns:
              </p>
              
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Essential Cookies</h3>
                  <p className="text-gray-700 text-sm">
                    Required for basic site functionality, security, and to remember your preferences.
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Analytics Cookies</h3>
                  <p className="text-gray-700 text-sm">
                    Help us understand how visitors use our site to improve performance and user experience.
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Marketing Cookies</h3>
                  <p className="text-gray-700 text-sm">
                    Used to deliver relevant advertisements and measure campaign effectiveness (with your consent).
                  </p>
                </div>
              </div>
              
              <p className="text-gray-700 text-sm mt-4">
                You can manage cookie preferences through your browser settings or our cookie preference center.
              </p>
            </section>
            
            <section id="your-rights">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights and Choices</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You have several rights regarding your personal information:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Access & Portability</h3>
                  <p className="text-gray-700 text-sm">
                    Request a copy of your personal data and receive it in a portable format.
                  </p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Correction</h3>
                  <p className="text-gray-700 text-sm">
                    Update or correct inaccurate personal information in your account.
                  </p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Deletion</h3>
                  <p className="text-gray-700 text-sm">
                    Request deletion of your personal data (subject to legal requirements).
                  </p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Opt-out</h3>
                  <p className="text-gray-700 text-sm">
                    Unsubscribe from marketing communications and limit data processing.
                  </p>
                </div>
              </div>
              
              <p className="text-gray-700 text-sm mt-4">
                To exercise these rights, please contact us at <a href="mailto:privacy@travelenda.com" className="text-blue-600 hover:text-blue-700">privacy@travelenda.com</a>.
              </p>
            </section>
            
            <section id="data-retention">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Data Retention</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We retain your personal information only as long as necessary for the purposes outlined in this policy:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Account Data:</strong> Retained while your account is active and for 3 years after closure</li>
                <li><strong>Booking Data:</strong> Kept for 7 years for legal and tax compliance purposes</li>
                <li><strong>Marketing Data:</strong> Retained until you opt-out or for 2 years of inactivity</li>
                <li><strong>Support Data:</strong> Maintained for 3 years to improve service quality</li>
              </ul>
            </section>
            
            <section id="international-transfers">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. International Data Transfers</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Your information may be transferred to and processed in countries other than your own. 
                We ensure appropriate safeguards are in place for international transfers, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Standard Contractual Clauses approved by relevant authorities</li>
                <li>Adequacy decisions by regulatory bodies</li>
                <li>Certification schemes and codes of conduct</li>
                <li>Binding corporate rules for intra-group transfers</li>
              </ul>
            </section>
            
            <section id="children-privacy">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Children's Privacy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our services are not intended for children under 16 years of age. We do not knowingly 
                collect personal information from children under 16. If we become aware that we have 
                collected such information, we will take steps to delete it promptly.
              </p>
              <p className="text-gray-700 leading-relaxed">
                If you are a parent or guardian and believe your child has provided us with personal 
                information, please contact us immediately.
              </p>
            </section>
            
            <section id="policy-changes">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Policy Changes</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may update this Privacy Policy from time to time to reflect changes in our practices 
                or legal requirements. We will notify you of material changes by:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Posting the updated policy on our website</li>
                <li>Sending email notifications to registered users</li>
                <li>Displaying prominent notices on our platform</li>
                <li>Requiring acceptance for significant changes</li>
              </ul>
            </section>
            
            <section id="contact-us">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              
              <div className="bg-blue-50 rounded-lg p-6">
                <div className="flex items-start space-x-3">
                  <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-3">Privacy Officer</h4>
                    <div className="text-blue-700 text-sm space-y-1">
                      <p><strong>Email:</strong> privacy@travelenda.com</p>
                      <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                      <p><strong>Mail:</strong> Privacy Officer, Travelenda<br />
                      123 Travel Street, San Francisco, CA 94105, United States</p>
                    </div>
                    <p className="text-blue-700 text-sm mt-3">
                      We will respond to your privacy inquiries within 30 days.
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
                href="/legal/terms"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
              >
                <span>Terms of Service</span>
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