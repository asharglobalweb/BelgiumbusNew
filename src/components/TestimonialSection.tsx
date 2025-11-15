// components/TestimonialSection.tsx
"use client";
import { Star } from "lucide-react";
import { useState } from 'react';

export default function TestimonialSection() {
  const testimonials = [
    {
      key: 'passengers',
      name: "Anne Dubois",
      role: "Regular Commuter, Brussels",
      avatar: "avatar1",
      message: "I travel often between Brussels and Ghent for work. Belgium Buses is always punctual and the coaches are very comfortable.",
    },
    {
      key: 'passengers',
      name: "Lars De Smet",
      role: "University Student, Antwerp",
      avatar: "avatar2",
      message: "Affordable and reliable service for students. The drivers are helpful and the WiFi is a big plus.",
    },
    {
      key: 'passengers',
      name: "Sofie Van Dam",
      role: "Family Traveller, Bruges",
      avatar: "avatar3",
      message: "We used Belgium Buses for a family trip to Bruges — the coach was spotless and the journey was smooth.",
    },
    {
      key: 'corporate',
      name: "Michel Laurent",
      role: "Operations Manager, Brussels",
      avatar: "avatar4",
      message: "Professional service for our corporate events. Belgium Buses handled everything with precision and care.",
    },
    {
      key: 'corporate',
      name: "Isabelle Meert",
      role: "HR Director, Antwerp",
      avatar: "avatar5",
      message: "Our conference transport was seamless. The drivers were courteous and the timetable was perfect.",
    },
    {
      key: 'corporate',
      name: "Jonas Verhoeven",
      role: "Event Coordinator, Ghent",
      avatar: "avatar6",
      message: "Great service for events in Ghent. The coaches were comfortable and our delegates were impressed.",
    },
    {
      key: 'school',
      name: "Mme. Claes",
      role: "Primary School Teacher, Bruges",
      avatar: "avatar7",
      message: "Our school trip was organised professionally and safely. The children were comfortable throughout the journey.",
    },
    {
      key: 'school',
      name: "Mr. Janssens",
      role: "Sports Coach, Liège",
      avatar: "avatar8",
      message: "We use Belgium Buses for away matches. They understand the importance of punctuality and safety.",
    },
    {
      key: 'school',
      name: "Frau Peeters",
      role: "Headmistress, Leuven",
      avatar: "avatar9",
      message: "Excellent communication and reliable drivers. Parents were very happy with the service.",
    },
  ];

  const categories = ['passengers', 'corporate', 'school'];
  const [active, setActive] = useState(categories[0]);
  const filtered = testimonials.filter(t => t.key === active);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <div className="flex flex-col items-center mb-12">
          <span className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4 shadow-sm">
            Client Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-gray-600 max-w-2xl text-lg">
            Don&apos;t just take our word for it. Here&apos;s what our customers have to say about their experience with Belgium Buses.
          </p>
        </div>

        {/* Category Filters */}
        <div className="mb-12 flex justify-center gap-4 flex-wrap">
          {categories.map(key => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`px-6 py-3 rounded-full transition-all duration-300 focus:outline-none border transform hover:-translate-y-1 ${
                active === key 
                ? 'bg-blue-600 text-white border-blue-600 shadow-lg' 
                : 'bg-white text-gray-600 border-gray-300 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 shadow-sm'
              }`}
            >
              {key === 'passengers' ? 'From passengers' : key === 'corporate' ? 'From companies' : 'From schools'}
            </button>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filtered.map((t, idx) => (
            <div 
              key={idx} 
              className="flex flex-col bg-white rounded-2xl shadow-lg p-8 text-left h-full transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 hover:shadow-xl"
            >
              {/* Testimonial Text */}
              <p className="text-gray-700 mb-6 flex-grow text-lg leading-relaxed italic">
                {`"${t.message}"`}
              </p>
              
              {/* Stars */}
              <div className="flex mb-6">
                {Array(5).fill(0).map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                ))}
              </div>
              
              {/* Author Info */}
              <div className="flex items-center gap-4 mt-auto pt-6 border-t border-gray-100">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                  {t.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-lg">{t.name}</p>
                  <p className="text-gray-600 text-sm">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Overall Rating Badge */}
        <div className="mt-16">
          <div className="inline-flex items-center space-x-4 bg-white rounded-2xl shadow-lg px-8 py-4 border border-gray-100">
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-900">4.9/5</div>
              <div className="text-gray-600 text-sm">Average Rating</div>
            </div>
            <div className="flex">
              {Array(5).fill(0).map((_, i) => (
                <Star key={i} className="h-7 w-7 text-yellow-400 fill-current" />
              ))}
            </div>
            <div className="text-left">
              <div className="font-semibold text-gray-900">500+ Reviews</div>
              <div className="text-gray-600 text-sm">Across Belgium</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}