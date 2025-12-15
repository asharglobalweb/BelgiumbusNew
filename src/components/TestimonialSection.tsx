// components/TestimonialSection.tsx
"use client";
import { Star } from "lucide-react";
import { useState } from 'react';

export default function TestimonialSection() {
  const testimonials = [
    {
      key: 'passengers',
      name: "Anne Dubois",
      role: "Weekly Commuter, Brussels → Ghent",
      avatar: "avatar1",
      message: "As someone who travels every Monday and Thursday, I rely on punctuality. Belgium Buses hasn't let me down in 8 months. The 7:15 AM coach is always ready, and I can actually get work done with their reliable WiFi.",
    },
    {
      key: 'passengers',
      name: "Lars De Smet",
      role: "Student, University of Antwerp",
      avatar: "avatar2",
      message: "When my train was cancelled during exams, Belgium Buses got me to my parents in Bruges with just 30 minutes notice. The driver even helped with my heavy suitcase. This kind of flexibility is why I keep coming back.",
    },
    {
      key: 'passengers',
      name: "Sofie & Tom Van Dam",
      role: "Family with young children, Bruges",
      avatar: "avatar3",
      message: "Traveling with a 3-year-old and 5-year-old to Pairi Daiza was stressful to plan. The driver was so patient with our stroller, and the kids loved the comfortable seats. We arrived relaxed instead of frazzled!",
    },
    {
      key: 'corporate',
      name: "Michel Laurent",
      role: "Operations Director, Brussels EU Office",
      avatar: "avatar4",
      message: "We had to transport 45 international delegates from multiple hotels to the conference center for three consecutive days. The coordination was flawless, and the dedicated account manager saved us countless hours of logistics headaches.",
    },
    {
      key: 'corporate',
      name: "Isabelle Meert",
      role: "HR Director, Antwerp Tech Firm",
      avatar: "avatar5",
      message: "Our annual company retreat to the Ardennes required moving 80 employees. Not only were the coaches spotless and comfortable, but the real-time tracking let us coordinate meal breaks perfectly. Professional from start to finish.",
    },
    {
      key: 'corporate',
      name: "Jonas Verhoeven",
      role: "Event Manager, Ghent Conference Center",
      avatar: "avatar6",
      message: "Last-minute changes are the norm in events. When we suddenly needed an extra shuttle for 25 VIP guests, Belgium Buses had a coach here within 45 minutes. That responsiveness is why we have a standing contract with them.",
    },
    {
      key: 'school',
      name: "Mme. Elke Claes",
      role: "Year 5 Teacher, St. Mary's Primary, Bruges",
      avatar: "avatar7",
      message: "The safety briefing the driver gave our class before the trip to the Brussels Natural Sciences Museum put both parents and teachers at ease. Seat belts checked, emergency exits explained - it showed real professionalism.",
    },
    {
      key: 'school',
      name: "Mr. Thomas Janssens",
      role: "Athletics Director, Liège International School",
      avatar: "avatar8",
      message: "Transporting 35 teenagers plus sports equipment for away matches is challenging. Their coaches have proper storage for our gear, and the drivers understand we need to arrive energized, not exhausted from travel.",
    },
    {
      key: 'school',
      name: "Frau Karin Peeters",
      role: "Headmistress, Leuven Bilingual Academy",
      avatar: "avatar9",
      message: "We've used three different companies over the years. Belgium Buses stands out because they actually listen. When we requested specific pickup times to match our bell schedule, they made it work without any fuss.",
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
            Real Stories from Our Passengers
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Travel Experiences That Speak for Themselves
          </h2>
          <p className="text-gray-600 max-w-2xl text-lg">
            From daily commutes to special events, here&apos;s what people across Belgium are saying about their journeys with us.
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
              {key === 'passengers' ? 'Everyday Travelers' : key === 'corporate' ? 'Business Clients' : 'Schools & Groups'}
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
              <div className="font-semibold text-gray-900">1200+ Reviews</div>
              <div className="text-gray-600 text-sm">Trusted Across Belgium</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}