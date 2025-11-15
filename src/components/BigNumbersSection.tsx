// components/BigNumbersSection.tsx
"use client";

import { Users, MapPin, Star, Clock } from "lucide-react";
import { useEffect, useState } from "react";

export default function StatsSection() {
  const [counters, setCounters] = useState({
    passengers: 0,
    journeys: 0,
    cities: 0,
    rating: 0
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('stats-section');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const targetValues = {
      passengers: 250000,
      journeys: 1200,
      cities: 50,
      rating: 4.9
    };

    const duration = 2000;
    const steps = 60;
    const stepValues = {
      passengers: targetValues.passengers / steps,
      journeys: targetValues.journeys / steps,
      cities: targetValues.cities / steps,
      rating: targetValues.rating / steps
    };

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setCounters({
        passengers: Math.min(Math.floor(stepValues.passengers * currentStep), targetValues.passengers),
        journeys: Math.min(Math.floor(stepValues.journeys * currentStep), targetValues.journeys),
        cities: Math.min(Math.floor(stepValues.cities * currentStep), targetValues.cities),
        rating: Math.min(+(stepValues.rating * currentStep).toFixed(1), targetValues.rating)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible]);

  const stats = [
    {
      icon: Users,
      value: counters.passengers.toLocaleString() + "+",
      label: "Passengers Transported",
      color: "text-blue-500",
      bgColor: "bg-blue-100"
    },
    {
      icon: MapPin,
      value: counters.journeys + "+",
      label: "Journeys Completed",
      color: "text-green-500",
      bgColor: "bg-green-100"
    },
    {
      icon: Clock,
      value: counters.cities + "+",
      label: "Cities Served",
      color: "text-purple-500",
      bgColor: "bg-purple-100"
    },
    {
      icon: Star,
      value: counters.rating,
      label: "Customer Rating",
      color: "text-yellow-500",
      bgColor: "bg-yellow-100"
    }
  ];

  return (
    <section id="stats-section" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-indigo-200 rounded-full opacity-20 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Trusted Across Belgium
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied customers who choose Belgium Buses for their transportation needs
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-white hover:bg-white transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl animate-slide-up"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="flex justify-center mb-4">
                <div className={`p-3 ${stat.bgColor} rounded-xl`}>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center animate-fade-in" style={{animationDelay: '0.4s'}}>
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 border border-white hover:bg-white transition-all duration-300">
            <Clock className="h-5 w-5 text-green-500" />
            <span className="font-semibold text-gray-700">24/7 Customer Support Available</span>
          </div>
        </div>
      </div>
    </section>
  );
}