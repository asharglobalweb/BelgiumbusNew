"use client";

import { useState, useEffect, useRef } from "react";
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
  Star,
  Search,
  ChevronDown,
} from "lucide-react";
import { toast } from "sonner";

// Proper reCAPTCHA type declaration
declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (
        siteKey: string,
        options: { action: string }
      ) => Promise<string>;
    };
  }
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "1", // Set default to +1 initially
    service: "",
    passengers: "",
    date: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [, setIsDetecting] = useState(true); // Add loading state
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [minDate, setMinDate] = useState("");

  // Set minimum date to today on component mount
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setMinDate(today);
  }, []);

  // Complete list of all country codes in the world
  const countryCodes = [
    { code: "93", name: "Afghanistan" },
    { code: "355", name: "Albania" },
    { code: "213", name: "Algeria" },
    { code: "1-684", name: "American Samoa" },
    { code: "376", name: "Andorra" },
    { code: "244", name: "Angola" },
    { code: "1-264", name: "Anguilla" },
    { code: "672", name: "Antarctica" },
    { code: "1-268", name: "Antigua and Barbuda" },
    { code: "54", name: "Argentina" },
    { code: "374", name: "Armenia" },
    { code: "297", name: "Aruba" },
    { code: "61", name: "Australia" },
    { code: "43", name: "Austria" },
    { code: "994", name: "Azerbaijan" },
    { code: "1-242", name: "Bahamas" },
    { code: "973", name: "Bahrain" },
    { code: "880", name: "Bangladesh" },
    { code: "1-246", name: "Barbados" },
    { code: "375", name: "Belarus" },
    { code: "32", name: "Belgium" },
    { code: "501", name: "Belize" },
    { code: "229", name: "Benin" },
    { code: "1-441", name: "Bermuda" },
    { code: "975", name: "Bhutan" },
    { code: "591", name: "Bolivia" },
    { code: "387", name: "Bosnia and Herzegovina" },
    { code: "267", name: "Botswana" },
    { code: "55", name: "Brazil" },
    { code: "246", name: "British Indian Ocean Territory" },
    { code: "1-284", name: "British Virgin Islands" },
    { code: "673", name: "Brunei" },
    { code: "359", name: "Bulgaria" },
    { code: "226", name: "Burkina Faso" },
    { code: "257", name: "Burundi" },
    { code: "855", name: "Cambodia" },
    { code: "237", name: "Cameroon" },
    { code: "1", name: "Canada" },
    { code: "238", name: "Cape Verde" },
    { code: "1-345", name: "Cayman Islands" },
    { code: "236", name: "Central African Republic" },
    { code: "235", name: "Chad" },
    { code: "56", name: "Chile" },
    { code: "86", name: "China" },
    { code: "61", name: "Christmas Island" },
    { code: "61", name: "Cocos Islands" },
    { code: "57", name: "Colombia" },
    { code: "269", name: "Comoros" },
    { code: "682", name: "Cook Islands" },
    { code: "506", name: "Costa Rica" },
    { code: "385", name: "Croatia" },
    { code: "53", name: "Cuba" },
    { code: "599", name: "Curacao" },
    { code: "357", name: "Cyprus" },
    { code: "420", name: "Czech Republic" },
    { code: "243", name: "Democratic Republic of the Congo" },
    { code: "45", name: "Denmark" },
    { code: "253", name: "Djibouti" },
    { code: "1-767", name: "Dominica" },
    { code: "1-809", name: "Dominican Republic" },
    { code: "670", name: "East Timor" },
    { code: "593", name: "Ecuador" },
    { code: "20", name: "Egypt" },
    { code: "503", name: "El Salvador" },
    { code: "240", name: "Equatorial Guinea" },
    { code: "291", name: "Eritrea" },
    { code: "372", name: "Estonia" },
    { code: "251", name: "Ethiopia" },
    { code: "500", name: "Falkland Islands" },
    { code: "298", name: "Faroe Islands" },
    { code: "679", name: "Fiji" },
    { code: "358", name: "Finland" },
    { code: "33", name: "France" },
    { code: "689", name: "French Polynesia" },
    { code: "241", name: "Gabon" },
    { code: "220", name: "Gambia" },
    { code: "995", name: "Georgia" },
    { code: "49", name: "Germany" },
    { code: "233", name: "Ghana" },
    { code: "350", name: "Gibraltar" },
    { code: "30", name: "Greece" },
    { code: "299", name: "Greenland" },
    { code: "1-473", name: "Grenada" },
    { code: "1-671", name: "Guam" },
    { code: "502", name: "Guatemala" },
    { code: "44-1481", name: "Guernsey" },
    { code: "224", name: "Guinea" },
    { code: "245", name: "Guinea-Bissau" },
    { code: "592", name: "Guyana" },
    { code: "509", name: "Haiti" },
    { code: "504", name: "Honduras" },
    { code: "852", name: "Hong Kong" },
    { code: "36", name: "Hungary" },
    { code: "354", name: "Iceland" },
    { code: "91", name: "India" },
    { code: "62", name: "Indonesia" },
    { code: "98", name: "Iran" },
    { code: "964", name: "Iraq" },
    { code: "353", name: "Ireland" },
    { code: "44-1624", name: "Isle of Man" },
    { code: "972", name: "Israel" },
    { code: "39", name: "Italy" },
    { code: "225", name: "Ivory Coast" },
    { code: "1-876", name: "Jamaica" },
    { code: "81", name: "Japan" },
    { code: "44-1534", name: "Jersey" },
    { code: "962", name: "Jordan" },
    { code: "7", name: "Kazakhstan" },
    { code: "254", name: "Kenya" },
    { code: "686", name: "Kiribati" },
    { code: "383", name: "Kosovo" },
    { code: "965", name: "Kuwait" },
    { code: "996", name: "Kyrgyzstan" },
    { code: "856", name: "Laos" },
    { code: "371", name: "Latvia" },
    { code: "961", name: "Lebanon" },
    { code: "266", name: "Lesotho" },
    { code: "231", name: "Liberia" },
    { code: "218", name: "Libya" },
    { code: "423", name: "Liechtenstein" },
    { code: "370", name: "Lithuania" },
    { code: "352", name: "Luxembourg" },
    { code: "853", name: "Macau" },
    { code: "389", name: "Macedonia" },
    { code: "261", name: "Madagascar" },
    { code: "265", name: "Malawi" },
    { code: "60", name: "Malaysia" },
    { code: "960", name: "Maldives" },
    { code: "223", name: "Mali" },
    { code: "356", name: "Malta" },
    { code: "692", name: "Marshall Islands" },
    { code: "222", name: "Mauritania" },
    { code: "230", name: "Mauritius" },
    { code: "262", name: "Mayotte" },
    { code: "52", name: "Mexico" },
    { code: "691", name: "Micronesia" },
    { code: "373", name: "Moldova" },
    { code: "377", name: "Monaco" },
    { code: "976", name: "Mongolia" },
    { code: "382", name: "Montenegro" },
    { code: "1-664", name: "Montserrat" },
    { code: "212", name: "Morocco" },
    { code: "258", name: "Mozambique" },
    { code: "95", name: "Myanmar" },
    { code: "264", name: "Namibia" },
    { code: "674", name: "Nauru" },
    { code: "977", name: "Nepal" },
    { code: "31", name: "Netherlands" },
    { code: "599", name: "Netherlands Antilles" },
    { code: "687", name: "New Caledonia" },
    { code: "64", name: "New Zealand" },
    { code: "505", name: "Nicaragua" },
    { code: "227", name: "Niger" },
    { code: "234", name: "Nigeria" },
    { code: "683", name: "Niue" },
    { code: "850", name: "North Korea" },
    { code: "1-670", name: "Northern Mariana Islands" },
    { code: "47", name: "Norway" },
    { code: "968", name: "Oman" },
    { code: "92", name: "Pakistan" },
    { code: "680", name: "Palau" },
    { code: "970", name: "Palestine" },
    { code: "507", name: "Panama" },
    { code: "675", name: "Papua New Guinea" },
    { code: "595", name: "Paraguay" },
    { code: "51", name: "Peru" },
    { code: "63", name: "Philippines" },
    { code: "64", name: "Pitcairn" },
    { code: "48", name: "Poland" },
    { code: "351", name: "Portugal" },
    { code: "1-787", name: "Puerto Rico" },
    { code: "974", name: "Qatar" },
    { code: "242", name: "Republic of the Congo" },
    { code: "262", name: "Reunion" },
    { code: "40", name: "Romania" },
    { code: "7", name: "Russia" },
    { code: "250", name: "Rwanda" },
    { code: "590", name: "Saint Barthelemy" },
    { code: "290", name: "Saint Helena" },
    { code: "1-869", name: "Saint Kitts and Nevis" },
    { code: "1-758", name: "Saint Lucia" },
    { code: "590", name: "Saint Martin" },
    { code: "508", name: "Saint Pierre and Miquelon" },
    { code: "1-784", name: "Saint Vincent and the Grenadines" },
    { code: "685", name: "Samoa" },
    { code: "378", name: "San Marino" },
    { code: "239", name: "Sao Tome and Principe" },
    { code: "966", name: "Saudi Arabia" },
    { code: "221", name: "Senegal" },
    { code: "381", name: "Serbia" },
    { code: "248", name: "Seychelles" },
    { code: "232", name: "Sierra Leone" },
    { code: "65", name: "Singapore" },
    { code: "1-721", name: "Sint Maarten" },
    { code: "421", name: "Slovakia" },
    { code: "386", name: "Slovenia" },
    { code: "677", name: "Solomon Islands" },
    { code: "252", name: "Somalia" },
    { code: "27", name: "South Africa" },
    { code: "82", name: "South Korea" },
    { code: "211", name: "South Sudan" },
    { code: "34", name: "Spain" },
    { code: "94", name: "Sri Lanka" },
    { code: "249", name: "Sudan" },
    { code: "597", name: "Suriname" },
    { code: "47", name: "Svalbard and Jan Mayen" },
    { code: "268", name: "Swaziland" },
    { code: "46", name: "Sweden" },
    { code: "41", name: "Switzerland" },
    { code: "963", name: "Syria" },
    { code: "886", name: "Taiwan" },
    { code: "992", name: "Tajikistan" },
    { code: "255", name: "Tanzania" },
    { code: "66", name: "Thailand" },
    { code: "228", name: "Togo" },
    { code: "690", name: "Tokelau" },
    { code: "676", name: "Tonga" },
    { code: "1-868", name: "Trinidad and Tobago" },
    { code: "216", name: "Tunisia" },
    { code: "90", name: "Turkey" },
    { code: "993", name: "Turkmenistan" },
    { code: "1-649", name: "Turks and Caicos Islands" },
    { code: "688", name: "Tuvalu" },
    { code: "1-340", name: "U.S. Virgin Islands" },
    { code: "256", name: "Uganda" },
    { code: "380", name: "Ukraine" },
    { code: "971", name: "United Arab Emirates" },
    { code: "44", name: "United Kingdom" },
    { code: "1", name: "United States" },
    { code: "598", name: "Uruguay" },
    { code: "998", name: "Uzbekistan" },
    { code: "678", name: "Vanuatu" },
    { code: "379", name: "Vatican" },
    { code: "58", name: "Venezuela" },
    { code: "84", name: "Vietnam" },
    { code: "681", name: "Wallis and Futuna" },
    { code: "212", name: "Western Sahara" },
    { code: "967", name: "Yemen" },
    { code: "260", name: "Zambia" },
    { code: "263", name: "Zimbabwe" },
  ];

  // Filtered countries based on search
  const filteredCountries = countryCodes.filter(
    (country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.code.includes(searchQuery)
  );

  // Get selected country name
  //   const selectedCountry = countryCodes.find(
  //     (country) => country.code === formData.countryCode
  //   );

  // Load reCAPTCHA - REPLACE WITH YOUR ACTUAL SITE KEY
  useEffect(() => {
    const loadRecaptcha = () => {
      if (window.grecaptcha) {
        setRecaptchaLoaded(true);
        return;
      }

      const script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/api.js?render=site_key`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setRecaptchaLoaded(true);
      };
      script.onerror = () => {
        console.error("Failed to load reCAPTCHA");
        setRecaptchaLoaded(false);
      };
      document.head.appendChild(script);
    };

    loadRecaptcha();
  }, []);

  // Detect user's country on component mount (works in background)
  useEffect(() => {
    detectUserCountry();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const detectUserCountry = async () => {
    setIsDetecting(true);
    try {
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();

      console.log("IP Detection Result:", data); // Debug log

      if (data.country_calling_code) {
        // Auto-set the country code in the form silently
        setFormData((prev) => ({
          ...prev,
          countryCode: data.country_calling_code,
        }));
        console.log("Auto-filled country code:", data.country_calling_code); // Debug log
      } else {
        console.log("No country calling code found in response"); // Debug log
      }
    } catch (error) {
      console.error("IP detection failed:", error); // Debug log
      // Keep the default +1 if detection fails
    } finally {
      setIsDetecting(false);
    }
  };

  const handleCountrySelect = (code: string) => {
    setFormData((prev) => ({
      ...prev,
      countryCode: code,
    }));
    setIsDropdownOpen(false);
    setSearchQuery("");
  };

  const getRecaptchaToken = async (): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!window.grecaptcha) {
        reject(new Error("reCAPTCHA not loaded"));
        return;
      }

      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute("site_key", {
            action: "submit",
          })
          .then((token: string) => {
            resolve(token);
          })
          .catch((error: unknown) => {
            reject(error);
          });
      });
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Date validation
    if (formData.date) {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset time part for accurate comparison

      if (selectedDate < today) {
        toast.error("Please select a future date for travel");
        return;
      }
    }

    // Basic validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.service ||
      !formData.message
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setSubmitting(true);

    try {
      // Get reCAPTCHA token
      let recaptchaToken = "";
      if (recaptchaLoaded) {
        try {
          recaptchaToken = await getRecaptchaToken();
        } catch (error) {
          console.error("reCAPTCHA error:", error);
          toast.error("Security verification failed. Please try again.");
          setSubmitting(false);
          return;
        }
      }

      // Prepare form data for PHP submission - FIXED: Include countryCode explicitly
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("countryCode", formData.countryCode); // This was missing!
      formDataToSend.append("service", formData.service);
      formDataToSend.append("passengers", formData.passengers);
      formDataToSend.append("date", formData.date);
      formDataToSend.append("message", formData.message);
      formDataToSend.append("recaptcha_token", recaptchaToken);
      formDataToSend.append("form_type", "contact_page");
      formDataToSend.append(
        "_subject",
        "New Contact Form Submission - Belgium Bus Rental"
      );

      // Submit to PHP endpoint with better error handling
      const response = await fetch("/contact.php", {
        method: "POST",
        body: formDataToSend,
      });

      // Check if response is OK
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        toast.success("Thank you! We will get back to you within 1 hour.");

        // Reset form but keep country code
        setFormData({
          name: "",
          email: "",
          phone: "",
          countryCode: formData.countryCode, // Keep the country code
          service: "",
          passengers: "",
          date: "",
          message: "",
        });
      } else {
        toast.error(
          result.message || "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      console.error("Form submission error:", error);
      // More specific error messages
      if (error instanceof TypeError) {
        if (error.message.includes("Failed to fetch")) {
          toast.error(
            "Network error. Please check your connection and try again."
          );
        } else {
          toast.error("Server connection failed. Please try again later.");
        }
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
      bgColor: "bg-green-100",
    },
    {
      icon: Mail,
      title: "Email Us",
      description: "Send us your requirements",
      details: "info@busrentalbelgium.com",
      action: "mailto:info@busrentalbelgium.com",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant answers",
      details: "Available 24/7",
      action: "#chat",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Our main office",
      details: "Rue d'Arenberg 3, 1000 Bruxelles, Belgium",
      action: "#map",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  const services = [
    "Corporate Events",
    "Shuttle Services",
    "Transfers",
    "School Trips",
    "Home to School",
  ];

  return (
    <>
      <Breadcrumbs
        crumbs={[{ name: "Home", href: "/" }, { name: "Contact" }]}
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
              Ready to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Book Your Ride?
              </span>
            </h1>
            <p
              className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              Let&apos;s discuss your transportation needs. Our team is ready to
              provide the perfect solution for your journey across Belgium.
            </p>

            {/* Quick Stats */}
            <div
              className="grid grid-cols-3 gap-4 max-w-md mx-auto animate-slide-up"
              style={{ animationDelay: "0.4s" }}
            >
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
                  <h2 className="text-3xl font-bold text-gray-900">
                    Get Your Quote
                  </h2>
                  <p className="text-gray-600">
                    We&apos;ll get back to you within 1 hour
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Add reCAPTCHA badge */}
                <div
                  className="g-recaptcha"
                  data-sitekey="site_key"
                  data-size="invisible"
                ></div>

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

                {/* Phone Number - Single Column */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="flex space-x-2">
                    {/* Custom Country Code Dropdown */}
                    <div className="relative w-32" ref={dropdownRef}>
                      <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 flex items-center justify-between bg-white hover:bg-gray-50 h-[52px]"
                      >
                        <span className="text-gray-700 font-medium">
                          {formData.countryCode
                            ? `+${formData.countryCode.replace("+", "")}`
                            : "+1"}
                        </span>
                        <ChevronDown
                          className={`h-4 w-4 text-gray-400 transition-transform ${
                            isDropdownOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Dropdown Menu */}
                      {isDropdownOpen && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-xl shadow-lg z-50 max-h-80 overflow-hidden w-80">
                          {/* Search Input */}
                          <div className="p-3 border-b border-gray-200">
                            <div className="relative">
                              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <input
                                type="text"
                                placeholder="Search country or code..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                autoFocus
                              />
                            </div>
                          </div>

                          {/* Country List */}
                          <div className="max-h-60 overflow-y-auto">
                            {filteredCountries.length > 0 ? (
                              filteredCountries.map((country) => (
                                <button
                                  key={`${country.code}-${country.name}`}
                                  type="button"
                                  onClick={() =>
                                    handleCountrySelect(country.code)
                                  }
                                  className={`w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors flex items-center justify-between border-b border-gray-100 last:border-b-0 ${
                                    formData.countryCode === country.code
                                      ? "bg-blue-50 text-blue-600"
                                      : "text-gray-700"
                                  }`}
                                >
                                  <div className="flex items-center space-x-3">
                                    <span className="font-medium text-gray-900">
                                      +{country.code}
                                    </span>
                                    <span className="text-gray-600">
                                      {country.name}
                                    </span>
                                  </div>
                                  {formData.countryCode === country.code && (
                                    <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0" />
                                  )}
                                </button>
                              ))
                            ) : (
                              <div className="px-4 py-3 text-gray-500 text-center">
                                No countries found
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                      placeholder="Phone number"
                    />
                  </div>
                </div>

                {/* Service Needed - Single Column */}
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
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
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
                      min={minDate} // This prevents past date selection
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
                  disabled={submitting || !recaptchaLoaded}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 px-8 rounded-xl hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {submitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>Get Free Quote</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info & Features - Right Side */}
            <div
              className="space-y-8 animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              {/* Office Info */}
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Building2 className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Our Office
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Main Office</p>
                      <p className="text-gray-600 leading-tight">
                        Rue d&apos;Arenberg 3,
                        <br />
                        1000 Bruxelles, Belgium
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">
                        Business Hours
                      </p>
                      <p className="text-gray-600">Monday - Sunday: 24/7</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">
                        Phone Support
                      </p>
                      <p className="text-gray-600">+442038343226</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why Choose Us */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl shadow-xl p-8 text-white">
                <div className="flex items-center space-x-3 mb-6">
                  <Star className="h-6 w-6 text-yellow-300" />
                  <h3 className="text-2xl font-bold">
                    Why Choose Belgium Bus Rental?
                  </h3>
                </div>
                <div className="space-y-4">
                  {[
                    "24/7 Customer Support",
                    "1-Hour Response Time",
                    "Professional Drivers",
                    "Fully Insured Services",
                    "Competitive Pricing",
                    "Nationwide Coverage",
                  ].map((feature) => (
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
                  <div
                    className={`p-4 ${method.bgColor} rounded-2xl group-hover:scale-110 transition-transform duration-300`}
                  >
                    <method.icon className={`h-8 w-8 ${method.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                      {method.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {method.description}
                    </p>
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
