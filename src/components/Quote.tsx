// components/Quote.tsx
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { MapPin, Calendar, Users, Building2, GraduationCap, Plane, Home, ArrowRight, CheckCircle } from "lucide-react";

interface ContactFormProps {
  onSuccess?: () => void;
}

export default function ContactForm({ onSuccess }: ContactFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    reason_for_travel: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    company: "",
    pickup: "",
    destination: "",
    date: "",
    passengers: "",
    message: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.reason_for_travel) {
      newErrors.reason_for_travel = "Please select a reason for travel";
    }
    if (!formData.firstname) {
      newErrors.firstname = "First name is required";
    }
    if (!formData.lastname) {
      newErrors.lastname = "Last name is required";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    }
    if (!formData.company) {
      newErrors.company = "Company/School is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleReasonSelect = (reason: string) => {
    setFormData(prev => ({ ...prev, reason_for_travel: reason }));
    if (errors.reason_for_travel) {
      setErrors(prev => ({
        ...prev,
        reason_for_travel: ""
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setSubmitting(true);

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      formDataToSend.append("_subject", "New Quote Request - Belgium Buses");

      const response = await fetch("https://formspree.io/f/myzlwaoy", {
        method: "POST",
        body: formDataToSend,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        toast.success("Thank you! We will get back to you within 2 hours.");
        
        // Reset form
        setFormData({
          reason_for_travel: "",
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          company: "",
          pickup: "",
          destination: "",
          date: "",
          passengers: "",
          message: ""
        });
        
        onSuccess?.();
      } else {
        const errorData = await response.json();
        toast.error("Something went wrong. Please try again.");
        console.error("Form submission error:", errorData);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const travelReasons = [
    { value: "corporate", label: "Corporate Events", icon: Building2, color: "text-blue-600", bgColor: "bg-blue-100" },
    { value: "school", label: "School Trips", icon: GraduationCap, color: "text-green-600", bgColor: "bg-green-100" },
    { value: "airport", label: "Airport Transfers", icon: Plane, color: "text-purple-600", bgColor: "bg-purple-100" },
    { value: "private", label: "Private Hire", icon: Users, color: "text-indigo-600", bgColor: "bg-indigo-100" },
    { value: "home", label: "Home to School", icon: Home, color: "text-orange-600", bgColor: "bg-orange-100" },
    { value: "other", label: "Other", icon: MapPin, color: "text-gray-600", bgColor: "bg-gray-100" }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Travel Reason */}
      <div>
        <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
          <MapPin className="h-4 w-4 text-blue-600" />
          <span>Reason for Travel</span>
          <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          {travelReasons.map((reason) => {
            const IconComponent = reason.icon;
            const isSelected = formData.reason_for_travel === reason.value;
            
            return (
              <div
                key={reason.value}
                onClick={() => handleReasonSelect(reason.value)}
                className={`p-3 rounded-xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                  isSelected
                    ? "border-blue-600 bg-blue-50 shadow-md"
                    : "border-gray-300 hover:border-blue-400 bg-white"
                } ${errors.reason_for_travel ? 'border-red-500' : ''}`}
              >
                <div className="flex flex-col items-center space-y-2 relative">
                  <div className={`p-2 rounded-lg ${isSelected ? reason.bgColor : 'bg-gray-100'}`}>
                    <IconComponent className={`h-5 w-5 ${isSelected ? reason.color : 'text-gray-400'}`} />
                  </div>
                  <span className={`text-xs font-medium text-center ${
                    isSelected ? 'text-gray-900' : 'text-gray-600'
                  }`}>
                    {reason.label}
                  </span>
                  {isSelected && (
                    <CheckCircle className="h-4 w-4 text-green-500 absolute top-0 right-0" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {errors.reason_for_travel && (
          <p className="text-red-500 text-sm mt-2">{errors.reason_for_travel}</p>
        )}
        <input 
          type="hidden" 
          name="reason_for_travel" 
          value={formData.reason_for_travel} 
          required 
        />
      </div>

      {/* Personal Information */}
      <div className="space-y-4 p-4 bg-blue-50 rounded-xl">
        <h4 className="font-semibold text-gray-900 flex items-center">
          <Users className="h-4 w-4 mr-2 text-blue-600" />
          Personal Information
        </h4>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                errors.firstname ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
              } focus:ring-2 focus:ring-blue-200`}
              required
            />
            {errors.firstname && (
              <p className="text-red-500 text-sm mt-1">{errors.firstname}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                errors.lastname ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
              } focus:ring-2 focus:ring-blue-200`}
              required
            />
            {errors.lastname && (
              <p className="text-red-500 text-sm mt-1">{errors.lastname}</p>
            )}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
              errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
            } focus:ring-2 focus:ring-blue-200`}
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
              errors.phone ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
            } focus:ring-2 focus:ring-blue-200`}
            required
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Company/School <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
              errors.company ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
            } focus:ring-2 focus:ring-blue-200`}
            required
          />
          {errors.company && (
            <p className="text-red-500 text-sm mt-1">{errors.company}</p>
          )}
        </div>
      </div>

      {/* Trip Details */}
      <div className="space-y-4 p-4 bg-green-50 rounded-xl">
        <h4 className="font-semibold text-gray-900 flex items-center">
          <MapPin className="h-4 w-4 mr-2 text-green-600" />
          Trip Details
        </h4>

        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
            <MapPin className="h-4 w-4 text-blue-600" />
            <span>Pickup Location</span>
          </label>
          <input
            type="text"
            name="pickup"
            value={formData.pickup}
            onChange={handleInputChange}
            placeholder="Enter pickup address"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
          />
        </div>

        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
            <MapPin className="h-4 w-4 text-green-600" />
            <span>Destination</span>
          </label>
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleInputChange}
            placeholder="Enter destination"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
              <Calendar className="h-4 w-4 text-purple-600" />
              <span>Travel Date</span>
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
            />
          </div>

          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
              <Users className="h-4 w-4 text-orange-600" />
              <span>Passengers</span>
            </label>
            <select
              name="passengers"
              value={formData.passengers}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
            >
              <option value="">Select</option>
              <option value="1-15">1-15 Passengers</option>
              <option value="16-30">16-30 Passengers</option>
              <option value="31-50">31-50 Passengers</option>
              <option value="50+">50+ Passengers</option>
            </select>
          </div>
        </div>
      </div>

      {/* Additional Message */}
      <div>
        <label className="text-sm font-semibold text-gray-700 mb-2 block">
          Additional Message
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          placeholder="Tell us about your specific requirements, special requests, or any other details..."
          rows={4}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 resize-none"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
        <span className="relative flex items-center justify-center">
          {submitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Submitting...
            </>
          ) : (
            <>
              Get Instant Quote
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </span>
      </button>

      {/* Trust Badge */}
      <div className="text-center">
        <div className="inline-flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-full">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-600 font-medium">We respond within 2 hours</span>
        </div>
      </div>
    </form>
  );
}