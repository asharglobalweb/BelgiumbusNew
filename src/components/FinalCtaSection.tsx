// components/FinalCtaSection.tsx
"use client";

import Image from "next/image";
import ContactModal from "@/components/QuoteModal";
import { Phone, MessageCircle, CheckCircle, MapPin, Star, Bus, Clock } from "lucide-react";

export default function FinalCta() {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-blue-100 rounded-full opacity-40 animate-float"></div>
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-indigo-100 rounded-full opacity-40 animate-float" style={{animationDelay: '2s'}}></div>
      
      {/* Animated Road */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-gray-100 to-gray-200">
        {/* Road Lines */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-road-line"></div>
      </div>

      {/* Animated Bus */}
      <div className="absolute bottom-8 left-0 animate-bus-drive" style={{animationDuration: '20s'}}>
        <div className="relative">
          {/* Bus Body */}
          <div className="w-20 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg relative">
            {/* Windows */}
            <div className="absolute top-1 left-2 w-4 h-3 bg-blue-200 rounded"></div>
            <div className="absolute top-1 left-7 w-4 h-3 bg-blue-200 rounded"></div>
            <div className="absolute top-1 right-2 w-4 h-3 bg-blue-200 rounded"></div>
            {/* Wheels */}
            <div className="absolute -bottom-2 left-3 w-4 h-4 bg-gray-800 rounded-full border-2 border-gray-600"></div>
            <div className="absolute -bottom-2 right-3 w-4 h-4 bg-gray-800 rounded-full border-2 border-gray-600"></div>
            {/* Headlights */}
            <div className="absolute -bottom-1 left-1 w-2 h-1 bg-yellow-300 rounded-full"></div>
          </div>
          {/* Road Shadow */}
          <div className="absolute -bottom-4 left-2 right-2 h-2 bg-gray-400 opacity-30 rounded-full blur-sm"></div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content - Text */}
          <div className="space-y-8 animate-slide-up">
            <div className="space-y-4">
              <span className="inline-flex items-center bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold">
                <CheckCircle className="h-4 w-4 mr-2" />
                Start Your Journey
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Ready to Explore <span className="text-blue-600">Belgium</span>?
              </h2>
              <p className="text-gray-700 text-xl leading-relaxed">
                Get a personalized quote from <strong className="text-blue-600">Belgium Buses</strong> and travel across the country with comfort, safety, and style.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">50+ Cities Covered</p>
                  <p className="text-gray-600">From Brussels to every corner of Belgium</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">24/7 Service</p>
                  <p className="text-gray-600">Always available for your travel needs</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Star className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">4.9/5 Rating</p>
                  <p className="text-gray-600">Trusted by thousands of passengers</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <ContactModal />
              <a 
                href="tel:+442038343226"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105 group"
              >
                <Phone className="h-5 w-5 mr-2 group-hover:animate-pulse" />
                Call +44 20 3834 3226
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Instant quotes</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium">No hidden fees</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <MessageCircle className="h-4 w-4 text-purple-500" />
                <span className="text-sm font-medium">24/7 support</span>
              </div>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="flex justify-center lg:justify-end animate-slide-up" style={{animationDelay: '0.2s'}}>
            <div className="relative">
              <div className="relative w-80 h-80 bg-white rounded-3xl shadow-xl p-8">
                <Image
                  src="/images/contact_support_transparent.png"
                  alt="Customer support at Belgium Buses - Get your quote today"
                  fill
                  className="object-contain"
                />
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -left-4 bg-white rounded-2xl shadow-lg p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Bus className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">50+</p>
                      <p className="text-xs text-gray-600">Vehicles</p>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-lg p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">100%</p>
                      <p className="text-xs text-gray-600">Insured</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
            <div className="text-2xl font-bold text-blue-600">250K+</div>
            <div className="text-gray-600">Passengers</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
            <div className="text-2xl font-bold text-green-600">1200+</div>
            <div className="text-gray-600">Journeys</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
            <div className="text-2xl font-bold text-purple-600">50+</div>
            <div className="text-gray-600">Cities</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
            <div className="text-2xl font-bold text-orange-600">14+</div>
            <div className="text-gray-600">Years</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes bus-drive {
          0% {
            transform: translateX(-100px);
          }
          100% {
            transform: translateX(calc(100vw + 100px));
          }
        }
        
        @keyframes road-line {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-bus-drive {
          animation: bus-drive 20s linear infinite;
        }

        .animate-road-line {
          animation: road-line 2s linear infinite;
        }
      `}</style>
    </section>
  );
}