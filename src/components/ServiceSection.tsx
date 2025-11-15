// components/ServiceSection.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Bus,
  Users,
  GraduationCap,
  Building2,
  Plane,
  Home,
} from "lucide-react";

const services = [
  {
    key: "corporate",
    title: "Corporate Events",
    description:
      "Make your corporate travel effortless with our premium coach hire services across Belgium. Whether it's for conferences, meetings, or company events, we offer dependable and comfortable transport for your team.",
    image: "/images/corporate21.png",
    icon: Building2,
    features: [
      "Conference Transport",
      "Team Building Events",
      "Corporate Shuttles",
      "Executive Travel",
    ],
  },
  {
    key: "school",
    title: "School Trips",
    description:
      "Turn every educational journey into a safe and enjoyable experience with our trusted school coach hire service. From museum visits to history trips, we make group travel simple and reliable.",
    image: "/images/school21.png",
    icon: GraduationCap,
    features: [
      "Educational Trips",
      "Sports Events",
      "Field Trips",
      "Safe & Secure",
    ],
  },
  {
    key: "transfers",
    title: "Transfers",
    description:
      "Enjoy seamless door-to-door transport with our professional transfer service anywhere in Belgium. From airport pickups to city transfers, we provide smooth, comfortable travel.",
    image: "/images/transfer21.png",
    icon: Plane,
    features: [
      "Brussels Airport",
      "Charleroi Airport",
      "Group Transfers",
      "Meet & Greet",
    ],
  },
  {
    key: "shuttle",
    title: "Shuttle Services",
    description:
      "Experience seamless travel with Belgium Buses — efficient, comfortable, and dependable shuttle solutions across Belgium for groups of all sizes. Perfect for scheduled routes, airport transfers, and group transportation.",
    image: "/images/shuttle21.png",
    icon: Users,
    features: [
      "Scheduled Routes",
      "Airport Shuttles",
      "Group Transportation",
      "Comfortable Travel",
    ],
  },
  {
    key: "home",
    title: "Home to School",
    description:
      "Simplify your family's routine with our safe and reliable home to school transport service. Our professional drivers ensure punctuality and peace of mind for parents.",
    image: "/images/home21.png",
    icon: Home,
    features: [
      "Daily Transport",
      "Safe for Children",
      "Reliable Service",
      "Parent Peace of Mind",
    ],
  },
];

export default function ServicesSection() {
  const [active, setActive] = useState(services[0].key);
  const current = services.find((s) => s.key === active)!;

  return (
    <section
      id="services"
      className="py-20 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-100 rounded-full opacity-20 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold mb-4 shadow-sm animate-fade-in">
            <Bus className="h-4 w-4 mr-2" />
            Our Services
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 animate-slide-up">
            Coach Hire Services in Belgium
          </h2>
          <p
            className="text-xl text-gray-600 max-w-2xl mx-auto animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            Discover reliable and affordable coach hire, minibus rental, and
            group transport services across Belgium.
          </p>
        </div>

        {/* Service Tabs */}
        <div
          className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          {services.map((service) => (
            <button
              key={service.key}
              onClick={() => setActive(service.key)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl border transition-all duration-300 font-medium transform hover:-translate-y-1 ${active === service.key
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-600 shadow-lg scale-105"
                  : "bg-white text-gray-700 border-gray-300 hover:border-blue-500 hover:shadow-md"
                }`}
            >
              <service.icon className="h-5 w-5" />
              <span>{service.title}</span>
            </button>
          ))}
        </div>

        {/* Service Content */}
        <div
          className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500 animate-slide-up"
          style={{ animationDelay: "0.6s" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Text Content */}
            <div className="flex flex-col justify-center space-y-6">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <current.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-4xl font-bold text-gray-900">
                  {current.title}
                </h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                {current.description}
              </p>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {current.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden shadow-lg group">
                <Image
                  src={current.image}
                  alt={`${current.title} - Belgium Buses`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  quality={100}
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl p-4 border border-gray-100 animate-pulse-slow">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <current.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Available
                    </p>
                    <p className="text-xs text-gray-600">Across Belgium</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
