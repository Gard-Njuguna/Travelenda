'use client'

import Link from 'next/link'
import { ArrowLeft, Calendar, Cookie, Settings, Eye, BarChart3, Target, Shield } from 'lucide-react'
import { useState } from 'react'

export default function CookiePolicyPage() {
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true, // Always required
    analytics: true,
    marketing: false,
    personalization: true
  })

  const handlePreferenceChange = (type: string, value: boolean) => {
    if (type === 'essential') return // Essential cookies cannot be disabled
    setCookiePreferences(prev => ({ ...prev, [type]: value }))
  }

  const savePreferences = () => {
    // In a real app, this would save to localStorage and update cookie consent
    console.log('Cookie preferences saved:', cookiePreferences)
    alert('Cookie preferences saved successfully!')
  }

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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Cookie Policy</h1>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>Last updated: December 15, 2024</span>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          {/* Cookie Overview */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-8">
            <div className="flex items-start space-x-3">
              <Cookie className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-orange-800 mb-2">What Are Cookies?</h3>
                <p className="text-orange-700 text-sm leading-relaxed">
                  Cookies are small text files that are stored on your device when you visit our website. 
                  They help us provide you with a better experience by remembering your preferences, 
                  analyzing how you use our site, and personalizing content and advertisements.
                </p>
              </div>
            </div>
          </div>
          
          {/* Cookie Preference Center */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-blue-800">Cookie Preference Center</h2>
              <Settings className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-blue-700 text-sm mb-6">
              Manage your cookie preferences below. Essential cookies are required for the website to function 
              and cannot be disabled.
            </p>
            
            <div className="space-y-4">
              {/* Essential Cookies */}
              <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Essential Cookies</h3>
                    <p className="text-sm text-gray-600">
                      Required for basic site functionality, security, and user authentication.
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-3">Always Active</span>
                  <div className="w-12 h-6 bg-green-500 rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-transform"></div>
                  </div>
                </div>
              </div>
              
              {/* Analytics Cookies */}
              <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
                <div className="flex items-start space-x-3">
                  <BarChart3 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Analytics Cookies</h3>
                    <p className="text-sm text-gray-600">
                      Help us understand how visitors interact with our website to improve performance.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handlePreferenceChange('analytics', !cookiePreferences.analytics)}
                  className={`w-12 h-6 rounded-full relative transition-colors ${
                    cookiePreferences.analytics ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                    cookiePreferences.analytics ? 'translate-x-6' : 'translate-x-0.5'
                  }`}></div>
                </button>
              </div>
              
              {/* Marketing Cookies */}
              <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
                <div className="flex items-start space-x-3">
                  <Target className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Marketing Cookies</h3>
                    <p className="text-sm text-gray-600">
                      Used to deliver relevant advertisements and measure campaign effectiveness.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handlePreferenceChange('marketing', !cookiePreferences.marketing)}
                  className={`w-12 h-6 rounded-full relative transition-colors ${
                    cookiePreferences.marketing ? 'bg-purple-500' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                    cookiePreferences.marketing ? 'translate-x-6' : 'translate-x-0.5'
                  }`}></div>
                </button>
              </div>
              
              {/* Personalization Cookies */}
              <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
                <div className="flex items-start space-x-3">
                  <Eye className="w-5 h-5 text-orange-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Personalization Cookies</h3>
                    <p className="text-sm text-gray-600">
                      Remember your preferences and customize your experience.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handlePreferenceChange('personalization', !cookiePreferences.personalization)}
                  className={`w-12 h-6 rounded-full relative transition-colors ${
                    cookiePreferences.personalization ? 'bg-orange-500' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                    cookiePreferences.personalization ? 'translate-x-6' : 'translate-x-0.5'
                  }`}></div>
                </button>
              </div>
            </div>
            
            <div className="mt-6 flex space-x-4">
              <button
                onClick={savePreferences}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Preferences
              </button>
              <button
                onClick={() => setCookiePreferences({ essential: true, analytics: false, marketing: false, personalization: false })}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Reject All
              </button>
              <button
                onClick={() => setCookiePreferences({ essential: true, analytics: true, marketing: true, personalization: true })}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Accept All
              </button>
            </div>
          </div>
          
          {/* Detailed Cookie Information */}
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Types of Cookies We Use</h2>
              
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-3">
                    <Shield className="w-6 h-6 text-green-600 mr-3" />
                    <h3 className="text-xl font-semibold text-gray-800">Essential Cookies</h3>
                  </div>
                  <p className="text-gray-700 mb-4">
                    These cookies are necessary for the website to function and cannot be switched off. 
                    They are usually only set in response to actions made by you which amount to a request for services.
                  </p>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Examples:</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• <strong>Session cookies:</strong> Keep you logged in during your visit</li>
                      <li>• <strong>Security cookies:</strong> Protect against fraud and abuse</li>
                      <li>• <strong>Load balancing:</strong> Distribute traffic across our servers</li>
                      <li>• <strong>Cookie consent:</strong> Remember your cookie preferences</li>
                    </ul>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-3">
                    <BarChart3 className="w-6 h-6 text-blue-600 mr-3" />
                    <h3 className="text-xl font-semibold text-gray-800">Analytics Cookies</h3>
                  </div>
                  <p className="text-gray-700 mb-4">
                    These cookies help us understand how visitors interact with our website by collecting 
                    and reporting information anonymously.
                  </p>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">What we track:</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• <strong>Page views:</strong> Which pages are most popular</li>
                      <li>• <strong>User flow:</strong> How users navigate through our site</li>
                      <li>• <strong>Performance:</strong> Page load times and errors</li>
                      <li>• <strong>Demographics:</strong> General location and device information</li>
                    </ul>
                    
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-xs text-gray-600">
                        <strong>Third-party services:</strong> Google Analytics, Hotjar
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-3">
                    <Target className="w-6 h-6 text-purple-600 mr-3" />
                    <h3 className="text-xl font-semibold text-gray-800">Marketing Cookies</h3>
                  </div>
                  <p className="text-gray-700 mb-4">
                    These cookies are used to deliver advertisements more relevant to you and your interests. 
                    They may also be used to limit the number of times you see an advertisement.
                  </p>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">How we use them:</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• <strong>Targeted ads:</strong> Show relevant hotel and travel offers</li>
                      <li>• <strong>Retargeting:</strong> Remind you of hotels you viewed</li>
                      <li>• <strong>Campaign tracking:</strong> Measure advertising effectiveness</li>
                      <li>• <strong>Social media:</strong> Enable sharing and social login features</li>
                    </ul>
                    
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-xs text-gray-600">
                        <strong>Third-party services:</strong> Google Ads, Facebook Pixel, Twitter Analytics
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-3">
                    <Eye className="w-6 h-6 text-orange-600 mr-3" />
                    <h3 className="text-xl font-semibold text-gray-800">Personalization Cookies</h3>
                  </div>
                  <p className="text-gray-700 mb-4">
                    These cookies enable the website to provide enhanced functionality and personalization. 
                    They remember your choices and preferences to improve your experience.
                  </p>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Personalization features:</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• <strong>Search preferences:</strong> Remember your favorite destinations</li>
                      <li>• <strong>Language settings:</strong> Display content in your preferred language</li>
                      <li>• <strong>Currency:</strong> Show prices in your local currency</li>
                      <li>• <strong>Recent searches:</strong> Quick access to your search history</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookie Duration</h2>
              <p className="text-gray-700 mb-4">
                Cookies can be either session cookies or persistent cookies:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="font-semibold text-blue-800 mb-3">Session Cookies</h3>
                  <p className="text-blue-700 text-sm mb-3">
                    Temporary cookies that are deleted when you close your browser.
                  </p>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• Login sessions</li>
                    <li>• Shopping cart contents</li>
                    <li>• Form data</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 rounded-lg p-6">
                  <h3 className="font-semibold text-green-800 mb-3">Persistent Cookies</h3>
                  <p className="text-green-700 text-sm mb-3">
                    Stored on your device for a set period or until manually deleted.
                  </p>
                  <ul className="text-green-700 text-sm space-y-1">
                    <li>• Remember login (30 days)</li>
                    <li>• Preferences (1 year)</li>
                    <li>• Analytics (2 years)</li>
                  </ul>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Managing Cookies</h2>
              <p className="text-gray-700 mb-4">
                You have several options for managing cookies:
              </p>
              
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Browser Settings</h3>
                  <p className="text-gray-700 text-sm mb-2">
                    Most browsers allow you to control cookies through their settings:
                  </p>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Block all cookies</li>
                    <li>• Block third-party cookies only</li>
                    <li>• Delete cookies when closing browser</li>
                    <li>• Get notified before cookies are set</li>
                  </ul>
                </div>
                
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Our Cookie Center</h3>
                  <p className="text-gray-700 text-sm">
                    Use our cookie preference center above to customize which types of cookies you allow. 
                    Your preferences will be saved and respected across all your visits.
                  </p>
                </div>
                
                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Third-Party Opt-Outs</h3>
                  <p className="text-gray-700 text-sm mb-2">
                    You can opt out of interest-based advertising from participating companies:
                  </p>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• <a href="https://optout.aboutads.info/" className="text-blue-600 hover:text-blue-700">Digital Advertising Alliance</a></li>
                    <li>• <a href="https://www.youronlinechoices.com/" className="text-blue-600 hover:text-blue-700">Your Online Choices (EU)</a></li>
                    <li>• <a href="https://tools.google.com/dlpage/gaoptout" className="text-blue-600 hover:text-blue-700">Google Analytics Opt-out</a></li>
                  </ul>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Impact of Disabling Cookies</h2>
              <p className="text-gray-700 mb-4">
                While you can disable cookies, doing so may affect your experience on our website:
              </p>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="font-semibold text-yellow-800 mb-3">Potential Issues:</h3>
                <ul className="text-yellow-700 text-sm space-y-2">
                  <li>• <strong>Login problems:</strong> You may need to log in repeatedly</li>
                  <li>• <strong>Lost preferences:</strong> Settings won't be remembered between visits</li>
                  <li>• <strong>Reduced functionality:</strong> Some features may not work properly</li>
                  <li>• <strong>Generic experience:</strong> Content won't be personalized to your interests</li>
                  <li>• <strong>Repeated prompts:</strong> You may see the same notifications multiple times</li>
                </ul>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Updates to This Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update this Cookie Policy from time to time to reflect changes in our practices 
                or legal requirements. When we make significant changes, we will:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Update the "Last updated" date at the top of this page</li>
                <li>Notify you through our website or email</li>
                <li>Request your consent for new cookie types if required by law</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have questions about our use of cookies or this Cookie Policy, please contact us:
              </p>
              
              <div className="bg-blue-50 rounded-lg p-6">
                <div className="flex items-start space-x-3">
                  <Cookie className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-3">Cookie Support</h4>
                    <div className="text-blue-700 text-sm space-y-1">
                      <p><strong>Email:</strong> cookies@travelenda.com</p>
                      <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                      <p><strong>Live Chat:</strong> Available 24/7 on our website</p>
                    </div>
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
                href="/legal/terms"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
              >
                <span>Terms of Service</span>
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