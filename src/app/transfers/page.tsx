// src/app/transfers/page.tsx
"use client";

import { useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import TestimonialSection from '../../components/TestimonialSection';
import FinalCta from '../../components/FinalCtaSection';
import QuoteModal from '@/components/QuoteModal';
import { 
  Shield, 
  Users, 
  MapPin, 
  Clock, 
  Star, 
  CheckCircle, 
  Car,
  Wifi,
  Target,
  Calendar,
  DoorOpen,
  Coffee
} from "lucide-react";
import Image from "next/image";

const transfer = {
  title: 'Door-to-Door',
  span: 'Transfers',
  subTitle: 'Reliable transfers across Belgium by Belgium Buses — premium comfort, professional drivers, and on-time service wherever you go.',
  image: '/images/transfer1.png',
};

const transferDetail = {
  h2: 'About Our Transfer Service',
  title: 'Travel in comfort and style with Belgium Buses. Our door-to-door transfers cover airports, hotels, and corporate destinations across Belgium — punctual, professional, and stress-free.',
  features: [
    'Meet & greet service included',
    'Real-time flight and traffic tracking',
    'Complimentary Wi-Fi and refreshments',
    'Fixed, transparent pricing — no surprises',
    'Professional uniformed drivers',
    'Luxury vehicles for executive transfers'
  ],
  images: [
    { image: "/images/transfer2.png" },
    { image: "/images/transfer3.png" }
  ]
};

// Transfer-specific features
const transferFeatures = [
  {
    icon: DoorOpen,
    title: "Door-to-Door Service",
    description: "Direct transfers from your starting point to destination with no intermediate stops",
    color: "text-blue-600",
    bgColor: "bg-blue-100"
  },
  {
    icon: Wifi,
    title: "Premium Comfort",
    description: "Complimentary WiFi, refreshments, and luxury seating for a relaxed journey",
    color: "text-purple-600",
    bgColor: "bg-purple-100"
  },
  {
    icon: Target,
    title: "Punctual & Reliable",
    description: "Guaranteed on-time arrivals for flights, meetings, and important events",
    color: "text-green-600",
    bgColor: "bg-green-100"
  },
  {
    icon: Users,
    title: "Meet & Greet",
    description: "Professional drivers with personalized meet and greet service included",
    color: "text-orange-600",
    bgColor: "bg-orange-100"
  }
];

const transferDestinations = [
  "Brussels Airport (BRU) Transfers",
  "Charleroi Airport (CRL) Transfers",
  "Antwerp Central Station",
  "Ghent City Center",
  "Bruges Historic District",
  "Hotel & Resort Transfers",
  "Corporate Office Transfers",
  "Event Venue Transfers"
];

export default function Transfer() {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <>
      <Breadcrumbs
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Transfers" },
        ]}
      />
      
      {/* Hero Section - Matching Corporate Design */}
      <section className="relative min-h-[80vh] bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20 -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200 rounded-full blur-3xl opacity-20 -translate-x-48 translate-y-48"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 text-center lg:text-left">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold shadow-sm animate-fade-in">
                  <Car className="h-4 w-4 mr-2" />
                  Premium Personal Transport
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight animate-slide-up">
                  {transfer.title}{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                    {transfer.span}
                  </span>
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl leading-relaxed animate-slide-up" style={{animationDelay: '0.2s'}}>
                  {transfer.subTitle}
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 max-w-md animate-slide-up" style={{animationDelay: '0.4s'}}>
                <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm">
                  <div className="text-2xl font-bold text-blue-600">1000+</div>
                  <div className="text-sm text-gray-600">Daily Transfers</div>
                </div>
                <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm">
                  <div className="text-2xl font-bold text-green-600">99%</div>
                  <div className="text-sm text-gray-600">On-time Rate</div>
                </div>
                <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm">
                  <div className="text-2xl font-bold text-purple-600">60+</div>
                  <div className="text-sm text-gray-600">Destinations</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up" style={{animationDelay: '0.6s'}}>
                <QuoteModal />
                {/* <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group">
                  <Calendar className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                  Book Transfer
                </button> */}
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className="relative animate-float">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-700">
                <Image
                  src={transfer.image}
                  width={600}
                  height={500}
                  alt="Door-to-door transfers with Belgium Buses - Premium personal transport"
                  className="w-full h-auto"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Floating Cards - Fixed z-index to appear above image */}
              <div className="absolute -top-4 -left-4 bg-white rounded-2xl shadow-2xl p-4 transform rotate-3 hover:rotate-0 transition-transform duration-300 border border-gray-100 animate-pulse-slow z-20">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <Coffee className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">Refresh</p>
                    <p className="text-sm text-gray-600">Included</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-2xl p-4 transform -rotate-3 hover:rotate-0 transition-transform duration-300 border border-gray-100 animate-pulse-slow z-20" style={{animationDelay: '1s'}}>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Target className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">99%</p>
                    <p className="text-sm text-gray-600">On-time</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-white to-blue-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/10 to-indigo-500/10"></div>
        <div className="absolute top-10 right-10 w-64 h-64 bg-blue-200 rounded-full opacity-10 blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <span className="inline-flex items-center bg-white/80 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold shadow-sm mb-6">
              <Star className="h-4 w-4 mr-2" />
              Why Choose Our Transfer Services
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Designed for <span className="text-blue-600">Personal Comfort</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Premium door-to-door transportation solutions ensuring comfort, reliability, and personalized service throughout Belgium
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {transferFeatures.map((feature, index) => (
              <div 
                key={feature.title}
                onMouseEnter={() => setActiveFeature(index)}
                className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all duration-500 transform hover:-translate-y-2 animate-slide-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="flex justify-center mb-4">
                  <div className={`p-4 ${feature.bgColor} rounded-2xl transition-all duration-300 ${activeFeature === index ? 'scale-110 ring-2 ring-blue-200' : ''}`}>
                    <feature.icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Content Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div className="space-y-8 animate-slide-up">
              <div className="space-y-6">
                <span className="inline-flex items-center bg-white/80 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
                  <Car className="h-4 w-4 mr-2" />
                  Premium Door-to-Door Transport
                </span>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  {transferDetail.h2}
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {transferDetail.title}
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 gap-4">
                {transferDetail.features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mt-1">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{feature}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Popular Destinations */}
              <div className="pt-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Popular Transfer Destinations</h3>
                <div className="grid grid-cols-2 gap-3">
                  {transferDestinations.map((destination, index) => (
                    <div key={index} className="flex items-center space-x-2 text-gray-600">
                      <MapPin className="h-4 w-4 text-blue-500 flex-shrink-0" />
                      <span className="text-sm">{destination}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="relative animate-slide-up" style={{animationDelay: '0.2s'}}>
              <div className="space-y-6">
                {transferDetail.images.map((img, index) => (
                  <div 
                    key={index} 
                    className={`relative rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-[1.02] ${
                      index === 1 ? 'rotate-1' : '-rotate-1'
                    } hover:rotate-0`}
                  >
                    <Image
                      src={img.image}
                      alt={`Transfer service ${index + 1}`}
                      width={600}
                      height={400}
                      className="w-full h-auto"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                ))}
              </div>

              {/* Floating Info Card */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-2xl p-6 border border-gray-100 animate-pulse-slow z-20">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">24/7</p>
                    <p className="text-sm text-gray-600">Transfers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="space-y-6 animate-slide-up">
            <div className="inline-flex items-center bg-white/80 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
              <DoorOpen className="h-4 w-4 mr-2" />
              Ready to Book Your Transfer?
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
              Let's Take You <span className="text-blue-600">Where You Need</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get a personalized quote for your door-to-door transfer needs across Belgium
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <QuoteModal />
              <a 
                href="tel:+442038343226"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105 group"
              >
                <Car className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                Call for Transfer Quotes
              </a>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-6 mt-12">
            <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm">
              <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="font-semibold text-gray-900">Fully Insured</div>
            </div>
            <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="font-semibold text-gray-900">Professional Drivers</div>
            </div>
            <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm">
              <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <div className="font-semibold text-gray-900">4.9/5 Rated</div>
            </div>
          </div>
        </div>
      </section>

      <TestimonialSection />
      <FinalCta />
    </>
  );
}