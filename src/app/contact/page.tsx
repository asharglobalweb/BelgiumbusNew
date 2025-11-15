// src/app/contact/page.tsx
"use client";

import { useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    MessageCircle,
    
    
    CheckCircle,
    Send,
    Building2,
    
    Star
} from "lucide-react";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        service: "",
        passengers: "",
        date: "",
        message: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log(formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const contactMethods = [
        {
            icon: Phone,
            title: "Call Us",
            description: "Speak directly with our team",
            details: "+442038343226",
            action: "tel:+442038343226",
            color: "text-green-600",
            bgColor: "bg-green-100"
        },
        {
            icon: Mail,
            title: "Email Us",
            description: "Send us your requirements",
            details: "info@belgiumbuses.com",
            action: "mailto:info@belgiumbuses.com",
            color: "text-blue-600",
            bgColor: "bg-blue-100"
        },
        {
            icon: MessageCircle,
            title: "Live Chat",
            description: "Get instant answers",
            details: "Available 24/7",
            action: "#chat",
            color: "text-purple-600",
            bgColor: "bg-purple-100"
        },
        {
            icon: MapPin,
            title: "Visit Us",
            description: "Our main office",
            details: "Rue d'Arenberg 3, 1000 Bruxelles, Belgium",
            action: "#map",
            color: "text-orange-600",
            bgColor: "bg-orange-100"
        }
    ];

    const services = [
        "Corporate Events",
        "Shuttle Services",
        "Transfers",
        "School Trips",
        "Home to School"
    ];

    return (
        <>
            <Breadcrumbs
                crumbs={[
                    { name: "Home", href: "/" },
                    { name: "Contact" },
                ]}
            />

            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20 -translate-y-48 translate-x-48"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200 rounded-full blur-3xl opacity-20 -translate-x-48 translate-y-48"></div>

                <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
                    <div className="space-y-6">
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold shadow-sm animate-fade-in">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Get In Touch
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight animate-slide-up">
                            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Book Your Ride?</span>
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
                            Let&apos;s discuss your transportation needs. Our team is ready to provide the perfect solution for your journey across Belgium.
                        </p>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto animate-slide-up" style={{ animationDelay: '0.4s' }}>
                            <div className="text-center p-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm">
                                <div className="text-lg font-bold text-blue-600">24/7</div>
                                <div className="text-xs text-gray-600">Support</div>
                            </div>
                            <div className="text-center p-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm">
                                <div className="text-lg font-bold text-green-600">1h</div>
                                <div className="text-xs text-gray-600">Response Time</div>
                            </div>
                            <div className="text-center p-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm">
                                <div className="text-lg font-bold text-purple-600">100%</div>
                                <div className="text-xs text-gray-600">Satisfaction</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Contact Section - Original Layout */}
            <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        {/* Contact Form - Left Side */}
                        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 animate-slide-up">
                            <div className="flex items-center space-x-3 mb-8">
                                <div className="p-3 bg-blue-100 rounded-xl">
                                    <Send className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-bold text-gray-900">Get Your Quote</h2>
                                    <p className="text-gray-600">We&apos;ll get back to you within 1 hour</p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} action="https://formspree.io/f/myzlwaoy" method="POST" className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                                            placeholder="Your full name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                                            placeholder="+32 XXX XXX XXX"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Service Needed *
                                        </label>
                                        <select
                                            name="service"
                                            required
                                            value={formData.service}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                                        >
                                            <option value="">Select a service</option>
                                            {services.map(service => (
                                                <option key={service} value={service}>{service}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Number of Passengers
                                        </label>
                                        <input
                                            type="number"
                                            name="passengers"
                                            value={formData.passengers}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                                            placeholder="e.g., 25"
                                            min="1"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Travel Date
                                        </label>
                                        <input
                                            type="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        name="message"
                                        required
                                        rows={4}
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 resize-none"
                                        placeholder="Tell us about your transportation needs, route details, and any special requirements..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 px-8 rounded-xl hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-2"
                                >
                                    <Send className="h-5 w-5" />
                                    <span>Get Free Quote</span>
                                </button>
                            </form>
                        </div>

                        {/* Contact Info & Features - Right Side */}
                        <div className="space-y-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                            {/* Office Info */}
                            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="p-3 bg-blue-100 rounded-xl">
                                        <Building2 className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900">Our Office</h3>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-start space-x-3">
                                        <MapPin className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                                        <div>
                                            <p className="font-semibold text-gray-900">Main Office</p>
                                            <p className="text-gray-600 leading-tight">Rue d&apos;Arenberg 3,<br />1000 Bruxelles, Belgium</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <Clock className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                                        <div>
                                            <p className="font-semibold text-gray-900">Business Hours</p>
                                            <p className="text-gray-600">Monday - Sunday: 24/7</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <Phone className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                                        <div>
                                            <p className="font-semibold text-gray-900">Phone Support</p>
                                            <p className="text-gray-600">+442038343226</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Why Choose Us */}
                            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl shadow-xl p-8 text-white">
                                <div className="flex items-center space-x-3 mb-6">
                                    <Star className="h-6 w-6 text-yellow-300" />
                                    <h3 className="text-2xl font-bold">Why Choose Belgium Buses?</h3>
                                </div>
                                <div className="space-y-4">
                                    {[
                                        "24/7 Customer Support",
                                        "1-Hour Response Time",
                                        "Professional Drivers",
                                        "Fully Insured Services",
                                        "Competitive Pricing",
                                        "Nationwide Coverage"
                                    ].map((feature,) => (
                                        <div key={feature} className="flex items-center space-x-3">
                                            <CheckCircle className="h-5 w-5 text-green-300 flex-shrink-0" />
                                            <span className="text-blue-50">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Methods */}
            <section className="py-16 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {contactMethods.map((method, index) => (
                            <a
                                key={method.title}
                                href={method.action}
                                className="group p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all duration-500 transform hover:-translate-y-2 animate-slide-up"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="flex flex-col items-center text-center space-y-4">
                                    <div className={`p-4 ${method.bgColor} rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
                                        <method.icon className={`h-8 w-8 ${method.color}`} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                                            {method.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-3">{method.description}</p>
                                        <p className="text-sm font-semibold text-gray-900 leading-tight break-words">
                                            {method.details}
                                        </p>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}