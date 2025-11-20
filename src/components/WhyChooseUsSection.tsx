// components/WhyChooseUsSection.tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import {
  ShieldCheck,
  User,
  Clock,
  Headset,
  CheckCircle,
  DollarSign,
  ThumbsUp,
  ChevronDown,
  
} from "lucide-react";

export default function WhyChooseUs() {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const features = [
    {
      Icon: DollarSign,
      title: "Best Price Guarantee",
      shortDesc: "Get the best value across Belgium with our price match guarantee.",
      content: "We're committed to providing the most competitive rates for coach hire in Belgium. If you find a lower quote for the same service from another licensed operator, we'll match it and still deliver our premium service. Our direct operations without middlemen allow us to offer better value while maintaining the highest standards of comfort and safety.",
      color: "text-green-600",
      bgColor: "bg-green-100",
      borderColor: "border-green-200"
    },
    {
      Icon: User,
      title: "Experienced Drivers",
      shortDesc: "Fully licensed professional drivers for safe and enjoyable journeys.",
      content: "All our drivers undergo rigorous training and hold full Belgian commercial driving licenses. With an average of 10+ years experience, they know Belgium's roads intimately. They're trained in defensive driving, first aid, and customer service to ensure your journey is not just safe but genuinely pleasant from start to finish.",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      borderColor: "border-blue-200"
    },
    {
      Icon: Clock,
      title: "24/7 Availability",
      shortDesc: "Round-the-clock service for all your travel needs across Belgium.",
      content: "Whether you need an early morning airport transfer, late-night event transportation, or weekend group travel, we're always available. Our operations team works around the clock to coordinate journeys across all 50+ cities we serve. Last-minute bookings? Emergency changes? We've got you covered anytime, day or night.",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      borderColor: "border-purple-200"
    },
    {
      Icon: Headset,
      title: "Dedicated Support",
      shortDesc: "24/7 customer service for bookings, updates, and assistance.",
      content: "Our multilingual support team is available 24/7 to handle everything from initial quotes to real-time journey updates. Need to make changes to your booking? Have questions about your route? Require special accommodations? Our dedicated support specialists are just a call or message away, ensuring seamless communication throughout your travel experience.",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      borderColor: "border-orange-200"
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-white via-blue-50/20 to-indigo-50/20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-10 right-10 w-56 h-56 bg-blue-200 rounded-full opacity-5 blur-2xl"></div>
      <div className="absolute bottom-10 left-10 w-56 h-56 bg-indigo-200 rounded-full opacity-5 blur-2xl"></div>
      
      <div className="max-w-6xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Content Section */}
        <div className="space-y-6 animate-slide-up">
          <div className="space-y-4">
            <span className="inline-flex items-center bg-white/80 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
              <ThumbsUp className="h-3 w-3 mr-1" />
              Why Choose Us
            </span>
            
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              The Belgium Bus Rental <span className="text-blue-600">Advantage</span>
            </h2>
            
            <p className="text-gray-600 leading-relaxed">
              Experience reliable, comfortable, and affordable group transport with professional service across Belgium.
            </p>
          </div>
          
          {/* Accordion Features */}
          <div className="space-y-3">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className={`group bg-white/80 rounded-xl shadow-sm border transition-all duration-300 overflow-hidden hover:shadow-md ${
                  openItems.includes(index) || hoveredItem === index 
                    ? `${feature.borderColor} border-2 shadow-md` 
                    : 'border-gray-100'
                }`}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggleItem(index)}
                  className={`w-full p-4 text-left flex items-center justify-between transition-all duration-300 ${
                    openItems.includes(index) || hoveredItem === index 
                      ? 'bg-blue-50/50' 
                      : 'hover:bg-gray-50/50'
                  }`}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`flex-shrink-0 ${feature.bgColor} p-3 rounded-lg transition-all duration-300 ${
                      openItems.includes(index) || hoveredItem === index 
                        ? 'scale-110 ring-2 ring-blue-200' 
                        : 'group-hover:scale-105'
                    }`}>
                      <feature.Icon className={`h-5 w-5 ${feature.color}`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-semibold text-base mb-1 transition-colors duration-300 ${
                        openItems.includes(index) || hoveredItem === index 
                          ? 'text-blue-600' 
                          : 'text-gray-900 group-hover:text-blue-600'
                      }`}>
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {feature.shortDesc}
                      </p>
                    </div>
                  </div>

                  <div className="flex-shrink-0 ml-4">
                    <div className={`transition-transform duration-500 ease-in-out ${
                      openItems.includes(index) ? 'rotate-180' : 'rotate-0'
                    }`}>
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </button>

                {/* Accordion Content */}
                <div 
                  className={`grid transition-all duration-500 ease-in-out ${
                    openItems.includes(index) 
                      ? 'grid-rows-[1fr] opacity-100' 
                      : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div 
                      className={`px-4 pb-4 transition-all duration-500 ${
                        openItems.includes(index) 
                          ? 'translate-y-0 delay-150' 
                          : 'translate-y-4'
                      }`}
                    >
                      <div className="pl-16 pr-4">
                        <div className="border-t border-gray-100 pt-4">
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {feature.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Compact Stats */}
          <div className="grid grid-cols-3 gap-3 pt-4">
            <div className="text-center p-3 bg-white/80 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
              <div className="text-lg font-bold text-blue-600">250K+</div>
              <div className="text-xs text-gray-600">Passengers</div>
            </div>
            <div className="text-center p-3 bg-white/80 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
              <div className="text-lg font-bold text-green-600">50+</div>
              <div className="text-xs text-gray-600">Cities</div>
            </div>
            <div className="text-center p-3 bg-white/80 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
              <div className="text-lg font-bold text-purple-600">24/7</div>
              <div className="text-xs text-gray-600">Service</div>
            </div>
          </div>
        </div>

        {/* Image Section - Fixed Alignment */}
        <div className="flex items-center justify-center lg:justify-end relative animate-slide-up" style={{animationDelay: '0.2s'}}>
          <div className="relative">
            {/* Main Image Container */}
            <div className="relative rounded-xl overflow-hidden shadow-lg transform transition-all duration-500 hover:scale-[1.02] hover:shadow-xl group">
              <Image
                src="/images/bus2.png"
                alt="Modern coach from Belgium Buses in Belgium"
                width={500}
                height={350}
                className="object-cover w-full h-auto transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            {/* Floating Badge 1 */}
            <div className="absolute -bottom-1 -left-4 bg-white rounded-xl shadow-lg p-5 border border-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-xl group/badge">
              <div className="flex items-center space-x-2">
                <div className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center group-hover/badge:scale-110 transition-transform duration-300">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">50+</p>
                  <p className="text-xs text-gray-600">Vehicles</p>
                </div>
              </div>
            </div>

            {/* Floating Badge 2 */}
            <div className="absolute -top-1 -right-4 bg-white rounded-xl shadow-lg p-5 border border-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-xl group/badge">
              <div className="flex items-center space-x-2">
                <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center group-hover/badge:scale-110 transition-transform duration-300">
                  <ShieldCheck className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">100%</p>
                  <p className="text-xs text-gray-600">Insured</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}