"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { toast } from "sonner";
import {
  MapPin,
  Calendar,
  Users,
  Building2,
  GraduationCap,
  Plane,
  Home,
  ArrowRight,
  CheckCircle,
  ChevronDown,
  Search,
} from "lucide-react";

// Proper reCAPTCHA and Google Maps type declaration
declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (
        siteKey: string,
        options: { action: string }
      ) => Promise<string>;
    };
    google: typeof google;
    initMap?: () => void;
  }
}

interface ContactFormProps {
  onSuccess?: () => void;
}

// Country data with codes
const countries = [
  { code: "AF", name: "Afghanistan", dialCode: "+93" },
  { code: "AL", name: "Albania", dialCode: "+355" },
  { code: "DZ", name: "Algeria", dialCode: "+213" },
  { code: "AD", name: "Andorra", dialCode: "+376" },
  { code: "AO", name: "Angola", dialCode: "+244" },
  { code: "AG", name: "Antigua and Barbuda", dialCode: "+1" },
  { code: "AR", name: "Argentina", dialCode: "+54" },
  { code: "AM", name: "Armenia", dialCode: "+374" },
  { code: "AU", name: "Australia", dialCode: "+61" },
  { code: "AT", name: "Austria", dialCode: "+43" },
  { code: "AZ", name: "Azerbaijan", dialCode: "+994" },
  { code: "BS", name: "Bahamas", dialCode: "+1" },
  { code: "BH", name: "Bahrain", dialCode: "+973" },
  { code: "BD", name: "Bangladesh", dialCode: "+880" },
  { code: "BB", name: "Barbados", dialCode: "+1" },
  { code: "BY", name: "Belarus", dialCode: "+375" },
  { code: "BE", name: "Belgium", dialCode: "+32" },
  { code: "BZ", name: "Belize", dialCode: "+501" },
  { code: "BJ", name: "Benin", dialCode: "+229" },
  { code: "BT", name: "Bhutan", dialCode: "+975" },
  { code: "BO", name: "Bolivia", dialCode: "+591" },
  { code: "BA", name: "Bosnia and Herzegovina", dialCode: "+387" },
  { code: "BW", name: "Botswana", dialCode: "+267" },
  { code: "BR", name: "Brazil", dialCode: "+55" },
  { code: "BN", name: "Brunei", dialCode: "+673" },
  { code: "BG", name: "Bulgaria", dialCode: "+359" },
  { code: "BF", name: "Burkina Faso", dialCode: "+226" },
  { code: "BI", name: "Burundi", dialCode: "+257" },
  { code: "CV", name: "Cabo Verde", dialCode: "+238" },
  { code: "KH", name: "Cambodia", dialCode: "+855" },
  { code: "CM", name: "Cameroon", dialCode: "+237" },
  { code: "CA", name: "Canada", dialCode: "+1" },
  { code: "CF", name: "Central African Republic", dialCode: "+236" },
  { code: "TD", name: "Chad", dialCode: "+235" },
  { code: "CL", name: "Chile", dialCode: "+56" },
  { code: "CN", name: "China", dialCode: "+86" },
  { code: "CO", name: "Colombia", dialCode: "+57" },
  { code: "KM", name: "Comoros", dialCode: "+269" },
  { code: "CG", name: "Congo", dialCode: "+242" },
  { code: "CD", name: "Congo (Democratic Republic)", dialCode: "+243" },
  { code: "CR", name: "Costa Rica", dialCode: "+506" },
  { code: "CI", name: "Côte d'Ivoire", dialCode: "+225" },
  { code: "HR", name: "Croatia", dialCode: "+385" },
  { code: "CU", name: "Cuba", dialCode: "+53" },
  { code: "CY", name: "Cyprus", dialCode: "+357" },
  { code: "CZ", name: "Czech Republic", dialCode: "+420" },
  { code: "DK", name: "Denmark", dialCode: "+45" },
  { code: "DJ", name: "Djibouti", dialCode: "+253" },
  { code: "DM", name: "Dominica", dialCode: "+1" },
  { code: "DO", name: "Dominican Republic", dialCode: "+1" },
  { code: "EC", name: "Ecuador", dialCode: "+593" },
  { code: "EG", name: "Egypt", dialCode: "+20" },
  { code: "SV", name: "El Salvador", dialCode: "+503" },
  { code: "GQ", name: "Equatorial Guinea", dialCode: "+240" },
  { code: "ER", name: "Eritrea", dialCode: "+291" },
  { code: "EE", name: "Estonia", dialCode: "+372" },
  { code: "SZ", name: "Eswatini", dialCode: "+268" },
  { code: "ET", name: "Ethiopia", dialCode: "+251" },
  { code: "FJ", name: "Fiji", dialCode: "+679" },
  { code: "FI", name: "Finland", dialCode: "+358" },
  { code: "FR", name: "France", dialCode: "+33" },
  { code: "GA", name: "Gabon", dialCode: "+241" },
  { code: "GM", name: "Gambia", dialCode: "+220" },
  { code: "GE", name: "Georgia", dialCode: "+995" },
  { code: "DE", name: "Germany", dialCode: "+49" },
  { code: "GH", name: "Ghana", dialCode: "+233" },
  { code: "GR", name: "Greece", dialCode: "+30" },
  { code: "GD", name: "Grenada", dialCode: "+1" },
  { code: "GT", name: "Guatemala", dialCode: "+502" },
  { code: "GN", name: "Guinea", dialCode: "+224" },
  { code: "GW", name: "Guinea-Bissau", dialCode: "+245" },
  { code: "GY", name: "Guyana", dialCode: "+592" },
  { code: "HT", name: "Haiti", dialCode: "+509" },
  { code: "HN", name: "Honduras", dialCode: "+504" },
  { code: "HU", name: "Hungary", dialCode: "+36" },
  { code: "IS", name: "Iceland", dialCode: "+354" },
  { code: "IN", name: "India", dialCode: "+91" },
  { code: "ID", name: "Indonesia", dialCode: "+62" },
  { code: "IR", name: "Iran", dialCode: "+98" },
  { code: "IQ", name: "Iraq", dialCode: "+964" },
  { code: "IE", name: "Ireland", dialCode: "+353" },
  { code: "IL", name: "Israel", dialCode: "+972" },
  { code: "IT", name: "Italy", dialCode: "+39" },
  { code: "JM", name: "Jamaica", dialCode: "+1" },
  { code: "JP", name: "Japan", dialCode: "+81" },
  { code: "JO", name: "Jordan", dialCode: "+962" },
  { code: "KZ", name: "Kazakhstan", dialCode: "+7" },
  { code: "KE", name: "Kenya", dialCode: "+254" },
  { code: "KI", name: "Kiribati", dialCode: "+686" },
  { code: "KP", name: "North Korea", dialCode: "+850" },
  { code: "KR", name: "South Korea", dialCode: "+82" },
  { code: "KW", name: "Kuwait", dialCode: "+965" },
  { code: "KG", name: "Kyrgyzstan", dialCode: "+996" },
  { code: "LA", name: "Laos", dialCode: "+856" },
  { code: "LV", name: "Latvia", dialCode: "+371" },
  { code: "LB", name: "Lebanon", dialCode: "+961" },
  { code: "LS", name: "Lesotho", dialCode: "+266" },
  { code: "LR", name: "Liberia", dialCode: "+231" },
  { code: "LY", name: "Libya", dialCode: "+218" },
  { code: "LI", name: "Liechtenstein", dialCode: "+423" },
  { code: "LT", name: "Lithuania", dialCode: "+370" },
  { code: "LU", name: "Luxembourg", dialCode: "+352" },
  { code: "MG", name: "Madagascar", dialCode: "+261" },
  { code: "MW", name: "Malawi", dialCode: "+265" },
  { code: "MY", name: "Malaysia", dialCode: "+60" },
  { code: "MV", name: "Maldives", dialCode: "+960" },
  { code: "ML", name: "Mali", dialCode: "+223" },
  { code: "MT", name: "Malta", dialCode: "+356" },
  { code: "MH", name: "Marshall Islands", dialCode: "+692" },
  { code: "MR", name: "Mauritania", dialCode: "+222" },
  { code: "MU", name: "Mauritius", dialCode: "+230" },
  { code: "MX", name: "Mexico", dialCode: "+52" },
  { code: "FM", name: "Micronesia", dialCode: "+691" },
  { code: "MD", name: "Moldova", dialCode: "+373" },
  { code: "MC", name: "Monaco", dialCode: "+377" },
  { code: "MN", name: "Mongolia", dialCode: "+976" },
  { code: "ME", name: "Montenegro", dialCode: "+382" },
  { code: "MA", name: "Morocco", dialCode: "+212" },
  { code: "MZ", name: "Mozambique", dialCode: "+258" },
  { code: "MM", name: "Myanmar", dialCode: "+95" },
  { code: "NA", name: "Namibia", dialCode: "+264" },
  { code: "NR", name: "Nauru", dialCode: "+674" },
  { code: "NP", name: "Nepal", dialCode: "+977" },
  { code: "NL", name: "Netherlands", dialCode: "+31" },
  { code: "NZ", name: "New Zealand", dialCode: "+64" },
  { code: "NI", name: "Nicaragua", dialCode: "+505" },
  { code: "NE", name: "Niger", dialCode: "+227" },
  { code: "NG", name: "Nigeria", dialCode: "+234" },
  { code: "MK", name: "North Macedonia", dialCode: "+389" },
  { code: "NO", name: "Norway", dialCode: "+47" },
  { code: "OM", name: "Oman", dialCode: "+968" },
  { code: "PK", name: "Pakistan", dialCode: "+92" },
  { code: "PW", name: "Palau", dialCode: "+680" },
  { code: "PS", name: "Palestine", dialCode: "+970" },
  { code: "PA", name: "Panama", dialCode: "+507" },
  { code: "PG", name: "Papua New Guinea", dialCode: "+675" },
  { code: "PY", name: "Paraguay", dialCode: "+595" },
  { code: "PE", name: "Peru", dialCode: "+51" },
  { code: "PH", name: "Philippines", dialCode: "+63" },
  { code: "PL", name: "Poland", dialCode: "+48" },
  { code: "PT", name: "Portugal", dialCode: "+351" },
  { code: "QA", name: "Qatar", dialCode: "+974" },
  { code: "RO", name: "Romania", dialCode: "+40" },
  { code: "RU", name: "Russia", dialCode: "+7" },
  { code: "RW", name: "Rwanda", dialCode: "+250" },
  { code: "KN", name: "Saint Kitts and Nevis", dialCode: "+1" },
  { code: "LC", name: "Saint Lucia", dialCode: "+1" },
  { code: "VC", name: "Saint Vincent and the Grenadines", dialCode: "+1" },
  { code: "WS", name: "Samoa", dialCode: "+685" },
  { code: "SM", name: "San Marino", dialCode: "+378" },
  { code: "ST", name: "Sao Tome and Principe", dialCode: "+239" },
  { code: "SA", name: "Saudi Arabia", dialCode: "+966" },
  { code: "SN", name: "Senegal", dialCode: "+221" },
  { code: "RS", name: "Serbia", dialCode: "+381" },
  { code: "SC", name: "Seychelles", dialCode: "+248" },
  { code: "SL", name: "Sierra Leone", dialCode: "+232" },
  { code: "SG", name: "Singapore", dialCode: "+65" },
  { code: "SK", name: "Slovakia", dialCode: "+421" },
  { code: "SI", name: "Slovenia", dialCode: "+386" },
  { code: "SB", name: "Solomon Islands", dialCode: "+677" },
  { code: "SO", name: "Somalia", dialCode: "+252" },
  { code: "ZA", name: "South Africa", dialCode: "+27" },
  { code: "SS", name: "South Sudan", dialCode: "+211" },
  { code: "ES", name: "Spain", dialCode: "+34" },
  { code: "LK", name: "Sri Lanka", dialCode: "+94" },
  { code: "SD", name: "Sudan", dialCode: "+249" },
  { code: "SR", name: "Suriname", dialCode: "+597" },
  { code: "SE", name: "Sweden", dialCode: "+46" },
  { code: "CH", name: "Switzerland", dialCode: "+41" },
  { code: "SY", name: "Syria", dialCode: "+963" },
  { code: "TW", name: "Taiwan", dialCode: "+886" },
  { code: "TJ", name: "Tajikistan", dialCode: "+992" },
  { code: "TZ", name: "Tanzania", dialCode: "+255" },
  { code: "TH", name: "Thailand", dialCode: "+66" },
  { code: "TL", name: "Timor-Leste", dialCode: "+670" },
  { code: "TG", name: "Togo", dialCode: "+228" },
  { code: "TO", name: "Tonga", dialCode: "+676" },
  { code: "TT", name: "Trinidad and Tobago", dialCode: "+1" },
  { code: "TN", name: "Tunisia", dialCode: "+216" },
  { code: "TR", name: "Turkey", dialCode: "+90" },
  { code: "TM", name: "Turkmenistan", dialCode: "+993" },
  { code: "TV", name: "Tuvalu", dialCode: "+688" },
  { code: "UG", name: "Uganda", dialCode: "+256" },
  { code: "UA", name: "Ukraine", dialCode: "+380" },
  { code: "AE", name: "United Arab Emirates", dialCode: "+971" },
  { code: "GB", name: "United Kingdom", dialCode: "+44" },
  { code: "US", name: "United States", dialCode: "+1" },
  { code: "UY", name: "Uruguay", dialCode: "+598" },
  { code: "UZ", name: "Uzbekistan", dialCode: "+998" },
  { code: "VU", name: "Vanuatu", dialCode: "+678" },
  { code: "VA", name: "Vatican City", dialCode: "+379" },
  { code: "VE", name: "Venezuela", dialCode: "+58" },
  { code: "VN", name: "Vietnam", dialCode: "+84" },
  { code: "YE", name: "Yemen", dialCode: "+967" },
  { code: "ZM", name: "Zambia", dialCode: "+260" },
  { code: "ZW", name: "Zimbabwe", dialCode: "+263" },
];

export default function ContactForm({ onSuccess }: ContactFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [searchQuery, setSearchQuery] = useState("");
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
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Refs for Google Maps Autocomplete
  const pickupInputRef = useRef<HTMLInputElement>(null);
  const destinationInputRef = useRef<HTMLInputElement>(null);
  const pickupAutocompleteRef = useRef<google.maps.places.Autocomplete | null>(
    null
  );
  const destinationAutocompleteRef =
    useRef<google.maps.places.Autocomplete | null>(null);

  // Initialize autocomplete - wrapped in useCallback to prevent infinite re-renders
  const initializeAutocomplete = useCallback(() => {
    if (!window.google?.maps?.places) {
      console.error("Google Maps Places API not available");
      return;
    }

    console.log("Initializing autocomplete...");

    // Initialize without geolocation first for immediate functionality
    const initializeAutocompleteWithBias = (
      userLocation: { lat: number; lng: number } | null
    ) => {
      try {
        const defaultBounds = userLocation
          ? new google.maps.Circle({
              center: userLocation,
              radius: 50000, // 50km radius
            }).getBounds()
          : null;

        // Initialize pickup autocomplete
        if (pickupInputRef.current) {
          // Clear existing autocomplete if any
          if (pickupAutocompleteRef.current) {
            google.maps.event.clearInstanceListeners(pickupAutocompleteRef.current);
          }

          pickupAutocompleteRef.current = new google.maps.places.Autocomplete(
            pickupInputRef.current,
            {
              bounds: defaultBounds || undefined,
              fields: ["formatted_address", "geometry", "name"],
              types: ["establishment", "geocode"],
            }
          );

          pickupAutocompleteRef.current.addListener("place_changed", () => {
            const place = pickupAutocompleteRef.current?.getPlace();
            if (place && place.formatted_address) {
              setFormData((prev) => ({
                ...prev,
                pickup: place.formatted_address as string,
              }));
            }
          });
        }

        // Initialize destination autocomplete
        if (destinationInputRef.current) {
          // Clear existing autocomplete if any
          if (destinationAutocompleteRef.current) {
            google.maps.event.clearInstanceListeners(
              destinationAutocompleteRef.current
            );
          }

          destinationAutocompleteRef.current = new google.maps.places.Autocomplete(
            destinationInputRef.current,
            {
              bounds: defaultBounds || undefined,
              fields: ["formatted_address", "geometry", "name"],
              types: ["establishment", "geocode"],
            }
          );

          destinationAutocompleteRef.current.addListener("place_changed", () => {
            const place = destinationAutocompleteRef.current?.getPlace();
            if (place && place.formatted_address) {
              setFormData((prev) => ({
                ...prev,
                destination: place.formatted_address as string,
              }));
            }
          });
        }
        
        console.log("Autocomplete initialized successfully");
      } catch (error) {
        console.error("Error initializing autocomplete:", error);
      }
    };

    initializeAutocompleteWithBias(null);

    // Try geolocation separately with better Safari handling
    if (navigator.geolocation) {
      // Safari requires user gesture for geolocation, so we'll try but not block on it
      setTimeout(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log("Geolocation successful, updating autocomplete bias");
            const userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            // Re-initialize with location bias
            initializeAutocompleteWithBias(userLocation);
          },
          () => {
            console.warn("Geolocation failed, continuing without bias");
            // Don't show error to user, just continue without location bias
          },
          {
            enableHighAccuracy: false, // Better for Safari
            timeout: 10000,
            maximumAge: 300000, // 5 minutes
          }
        );
      }, 1000);
    }
  }, []);

  // Load Google Maps Places API - COMPLETELY REWRITTEN for Safari
  useEffect(() => {
    let script: HTMLScriptElement | null = null;

    const loadGoogleMaps = () => {
      // Check if Google Maps is already loaded globally
      if (window.google && window.google.maps && window.google.maps.places) {
        console.log("Google Maps already loaded");
        initializeAutocomplete();
        return;
      }

      // Check if script is already in the document
      const existingScript = document.querySelector(
        'script[src*="maps.googleapis.com"]'
      ) as HTMLScriptElement;
      
      if (existingScript) {
        console.log("Google Maps script already exists");
        // If script exists but Google isn't loaded, wait for it
        if (!window.google?.maps?.places) {
          const waitForLoad = setInterval(() => {
            if (window.google?.maps?.places) {
              clearInterval(waitForLoad);
              initializeAutocomplete();
            }
          }, 100);
          
          setTimeout(() => {
            clearInterval(waitForLoad);
            if (!window.google?.maps?.places) {
              console.warn("Google Maps failed to load from existing script");
            }
          }, 10000);
        } else {
          initializeAutocomplete();
        }
        return;
      }

      // Load fresh script with better error handling
      console.log("Loading Google Maps API...");
      script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=google_api_key&libraries=places&callback=initMap`;
      script.async = true;
      script.defer = true;
      script.id = "google-maps-script";
      script.crossOrigin = "anonymous";

      // Add global callback for Safari with proper typing
      window.initMap = () => {
        console.log("Google Maps callback triggered");
        initializeAutocomplete();
      };

      const loadTimeout = setTimeout(() => {
        if (!window.google?.maps?.places) {
          console.error("Google Maps loading timeout");
          toast.error(
            "Location services taking too long to load. You can still type addresses manually."
          );
        }
      }, 15000);

      script.onload = () => {
        clearTimeout(loadTimeout);
        console.log("Google Maps Places API loaded successfully");
        // Double check and initialize
        if (window.google?.maps?.places) {
          initializeAutocomplete();
        }
      };

      script.onerror = () => {
        clearTimeout(loadTimeout);
        console.error("Failed to load Google Maps Places API");
        toast.error(
          "Location services unavailable. You can still type addresses manually."
        );
      };

      document.head.appendChild(script);
    };

    loadGoogleMaps();

    return () => {
      // Cleanup
      if (window.initMap) {
        delete window.initMap;
      }
    };
  }, [initializeAutocomplete]);

  // Load reCAPTCHA
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

  // Auto-detect user's country - IMPROVED for Safari
  useEffect(() => {
    const detectUserCountry = async () => {
      let detectedCountryCode = "";

      try {
        // Method 1: Try IP-based geolocation with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const ipResponse = await fetch("https://ipapi.co/json/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (ipResponse.ok) {
          const ipData = await ipResponse.json();
          detectedCountryCode = ipData.country_code;
          console.log("IP-based detection:", ipData.country_code, ipData.country_name);
        }
      } catch {
        console.log("IP geolocation failed, using fallback methods");
      }

      // Method 2: Browser timezone (reliable in Safari)
      if (!detectedCountryCode) {
        try {
          const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
          if (timezone) {
            // Enhanced timezone to country mapping
            const timezoneToCountry: { [key: string]: string } = {
              // UAE timezones
              "Asia/Dubai": "AE",
              "Asia/Abu_Dhabi": "AE",
              "Asia/Sharjah": "AE",
              // Other Middle East
              "Asia/Qatar": "QA",
              "Asia/Riyadh": "SA",
              "Asia/Kuwait": "KW",
              "Asia/Bahrain": "BH",
              "Asia/Muscat": "OM",
              // Europe
              "Europe/London": "GB",
              "Europe/Paris": "FR",
              "Europe/Berlin": "DE",
              "Europe/Madrid": "ES",
              "Europe/Rome": "IT",
              // Americas
              "America/New_York": "US",
              "America/Los_Angeles": "US",
              "America/Toronto": "CA",
              // Asia
              "Asia/Tokyo": "JP",
              "Asia/Singapore": "SG",
              "Asia/Shanghai": "CN",
              "Asia/Kolkata": "IN",
            };

            detectedCountryCode = timezoneToCountry[timezone] || "";
            if (detectedCountryCode) {
              console.log("Timezone detection:", timezone, "->", detectedCountryCode);
            }
          }
        } catch {
          console.log("Timezone detection failed");
        }
      }

      // Method 3: Browser language
      if (!detectedCountryCode) {
        try {
          const languages = navigator.languages || [navigator.language];
          for (const lang of languages) {
            const countryCode = lang.split("-")[1]?.toUpperCase();
            if (countryCode && countries.some(c => c.code === countryCode)) {
              detectedCountryCode = countryCode;
              console.log("Language detection:", lang, "->", countryCode);
              break;
            }
          }
        } catch {
          console.log("Language detection failed");
        }
      }

      // Find and set the country
      if (detectedCountryCode) {
        const detectedCountry = countries.find(
          (country) => country.code === detectedCountryCode
        );

        if (detectedCountry) {
          console.log("Setting detected country:", detectedCountry.name);
          setSelectedCountry(detectedCountry);
          return;
        }
      }

      // Final fallback based on timezone hint for Middle East
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const isMiddleEast = timezone?.includes("Dubai") || 
                          timezone?.includes("Abu_Dhabi") || 
                          timezone?.includes("Qatar") || 
                          timezone?.includes("Riyadh");

      if (isMiddleEast) {
        const uaeCountry = countries.find((country) => country.code === "AE");
        if (uaeCountry) {
          console.log("Middle East timezone detected, defaulting to UAE");
          setSelectedCountry(uaeCountry);
        }
      }
    };

    detectUserCountry();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowCountryDropdown(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (showCountryDropdown && searchInputRef.current) {
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 100);
    }
  }, [showCountryDropdown]);

  // COMPLETELY REWRITTEN DATE VALIDATION
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
    
    // FIXED DATE VALIDATION: Only validate if date is provided
    if (formData.date) {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      
      // Reset both dates to start of day for accurate comparison
      const selectedDateStart = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
      const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      
      // Compare timestamps - only show error if selected date is BEFORE today
      if (selectedDateStart.getTime() < todayStart.getTime()) {
        newErrors.date = "Please select today or a future date";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleLocationInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "pickup" | "destination"
  ) => {
    handleInputChange(e);

    if (!e.target.value) {
      setFormData((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  // COMPLETELY REWRITTEN DATE HANDLING
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDateString = e.target.value;
    
    if (!selectedDateString) {
      handleInputChange(e);
      return;
    }

    // Parse the date using the input value directly (YYYY-MM-DD format)
    const selectedDate = new Date(selectedDateString + 'T00:00:00'); // Add time to avoid timezone issues
    const today = new Date();
    
    // Reset both to start of day for comparison
    const selectedDateStart = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    // Check if date is valid
    if (isNaN(selectedDate.getTime())) {
      setErrors((prev) => ({
        ...prev,
        date: "Please select a valid date",
      }));
      return;
    }

    // Only show error if date is BEFORE today
    if (selectedDateStart.getTime() < todayStart.getTime()) {
      setErrors((prev) => ({
        ...prev,
        date: "Please select today or a future date",
      }));
    } else {
      // Clear error if date is valid (today or future)
      if (errors.date) {
        setErrors((prev) => ({
          ...prev,
          date: "",
        }));
      }
      handleInputChange(e);
    }
  };

  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setFormData((prev) => ({
      ...prev,
      phone: value,
    }));

    if (errors.phone) {
      setErrors((prev) => ({
        ...prev,
        phone: "",
      }));
    }
  };

  const handleReasonSelect = (reason: string) => {
    setFormData((prev) => ({ ...prev, reason_for_travel: reason }));
    if (errors.reason_for_travel) {
      setErrors((prev) => ({
        ...prev,
        reason_for_travel: "",
      }));
    }
  };

  const handleCountrySelect = (country: (typeof countries)[0]) => {
    setSelectedCountry(country);
    setShowCountryDropdown(false);
    setSearchQuery("");
  };

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.dialCode.includes(searchQuery) ||
      country.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRecaptchaToken = async (): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!window.grecaptcha) {
        reject(new Error("reCAPTCHA not loaded"));
        return;
      }

      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute("site_key", { action: "submit" })
          .then((token: string) => {
            resolve(token);
          })
          .catch(() => {
            reject(new Error("reCAPTCHA execution failed"));
          });
      });
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly");
      return;
    }

    // Additional date validation
    if (formData.date) {
      const selectedDate = new Date(formData.date + 'T00:00:00');
      const today = new Date();
      
      const selectedDateStart = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
      const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());

      if (selectedDateStart.getTime() < todayStart.getTime()) {
        toast.error("Please select today or a future date for travel");
        return;
      }
    }

    setSubmitting(true);

    try {
      let recaptchaToken = "";
      if (recaptchaLoaded) {
        try {
          recaptchaToken = await getRecaptchaToken();
        } catch {
          toast.error("Security verification failed. Please try again.");
          setSubmitting(false);
          return;
        }
      }

      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      formDataToSend.append(
        "phone_with_code",
        `${selectedCountry.dialCode}${formData.phone}`
      );
      formDataToSend.append(
        "countryCode",
        selectedCountry.dialCode.replace("+", "")
      );
      formDataToSend.append("recaptcha_token", recaptchaToken);
      formDataToSend.append("form_type", "quote_form");
      formDataToSend.append(
        "_subject",
        "New Quote Request - Belgium Bus Rental"
      );

      const response = await fetch("/contact.php", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        toast.success("Thank you! We will get back to you within 2 hours.");

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
          message: "",
        });

        onSuccess?.();
      } else {
        toast.error(
          result.message || "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      console.error("Form submission error:", error);
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

  const travelReasons = [
    {
      value: "corporate",
      label: "Corporate Events",
      icon: Building2,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      value: "school",
      label: "School Trips",
      icon: GraduationCap,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      value: "airport",
      label: "Airport Transfers",
      icon: Plane,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      value: "private",
      label: "Private Hire",
      icon: Users,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
    },
    {
      value: "home",
      label: "Home to School",
      icon: Home,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      value: "other",
      label: "Other",
      icon: MapPin,
      color: "text-gray-600",
      bgColor: "bg-gray-100",
    },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Add reCAPTCHA badge */}
      <div
        className="g-recaptcha"
        data-sitekey="site_key"
        data-size="invisible"
      ></div>

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
                } ${errors.reason_for_travel ? "border-red-500" : ""}`}
              >
                <div className="flex flex-col items-center space-y-2 relative">
                  <div
                    className={`p-2 rounded-lg ${
                      isSelected ? reason.bgColor : "bg-gray-100"
                    }`}
                  >
                    <IconComponent
                      className={`h-5 w-5 ${
                        isSelected ? reason.color : "text-gray-400"
                      }`}
                    />
                  </div>
                  <span
                    className={`text-xs font-medium text-center ${
                      isSelected ? "text-gray-900" : "text-gray-600"
                    }`}
                  >
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
          <p className="text-red-500 text-sm mt-2">
            {errors.reason_for_travel}
          </p>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                errors.firstname
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-blue-500"
              } focus:ring-2 focus:ring-blue-200`}
              required
            />
            {errors.firstname && (
              <p className="text-red-500 text-sm mt-1">{errors.firstname}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                errors.lastname
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-blue-500"
              } focus:ring-2 focus:ring-blue-200`}
              required
            />
            {errors.lastname && (
              <p className="text-red-500 text-sm mt-1">{errors.lastname}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
              errors.email
                ? "border-red-500 focus:border-red-500"
                : "border-gray-300 focus:border-blue-500"
            } focus:ring-2 focus:ring-blue-200`}
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="flex space-x-3" ref={dropdownRef}>
            {/* Country Code Dropdown */}
            <div className="relative flex-shrink-0 w-32">
              <button
                type="button"
                onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                className="flex items-center justify-between w-full px-3 py-3 rounded-xl border border-gray-300 transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              >
                <span className="text-sm font-medium text-gray-700">
                  {selectedCountry.dialCode}
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-gray-500 transition-transform ${
                    showCountryDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showCountryDropdown && (
                <div className="absolute top-full left-0 mt-1 w-80 bg-white border border-gray-300 rounded-xl shadow-lg z-10">
                  {/* Search Input */}
                  <div className="p-2 border-b border-gray-200">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Search country..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                      />
                    </div>
                  </div>

                  {/* Country List */}
                  <div className="max-h-60 overflow-y-auto">
                    {filteredCountries.map((country) => (
                      <div
                        key={country.code}
                        onClick={() => handleCountrySelect(country)}
                        className={`flex items-center space-x-3 px-4 py-2 cursor-pointer hover:bg-blue-50 ${
                          selectedCountry.code === country.code
                            ? "bg-blue-100"
                            : ""
                        }`}
                      >
                        <span className="text-sm font-medium text-gray-700 w-16">
                          {country.dialCode}
                        </span>
                        <span className="text-sm text-gray-600 flex-1">
                          {country.name}
                        </span>
                        <span className="text-xs text-gray-400 uppercase">
                          {country.code}
                        </span>
                      </div>
                    ))}
                    {filteredCountries.length === 0 && (
                      <div className="px-4 py-3 text-sm text-gray-500 text-center">
                        No countries found
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Phone Input */}
            <div className="flex-1">
              <input
                type="tel"
                name="phone"
                onFocus={() => setShowCountryDropdown(false)}
                value={formData.phone}
                onChange={handlePhoneChange}
                placeholder="Enter phone number"
                className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                  errors.phone
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-blue-500"
                } focus:ring-2 focus:ring-blue-200`}
                required
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
            Company/School <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
              errors.company
                ? "border-red-500 focus:border-red-500"
                : "border-gray-300 focus:border-blue-500"
            } focus:ring-2 focus:ring-blue-200`}
            required
          />
          {errors.company && (
            <p className="text-red-500 text-sm mt-1">{errors.company}</p>
          )}
        </div>
      </div>

      {/* Trip Details - FIXED ALIGNMENT */}
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
            ref={pickupInputRef}
            type="text"
            name="pickup"
            value={formData.pickup}
            onChange={(e) => handleLocationInputChange(e, "pickup")}
            placeholder="Enter pickup address or location"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
          />
        </div>

        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
            <MapPin className="h-4 w-4 text-green-600" />
            <span>Destination</span>
          </label>
          <input
            ref={destinationInputRef}
            type="text"
            name="destination"
            value={formData.destination}
            onChange={(e) => handleLocationInputChange(e, "destination")}
            placeholder="Enter destination address or location"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
          />
        </div>

        {/* FIXED: Proper grid alignment with consistent styling */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
              <Calendar className="h-4 w-4 text-purple-600" />
              <span>Travel Date</span>
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleDateChange}
              min={getTodayDate()}
              className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                errors.date
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-blue-500"
              } focus:ring-2 focus:ring-blue-200`}
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1 text-left">
                {errors.date}
              </p>
            )}
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
        disabled={submitting || !recaptchaLoaded}
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
          <span className="text-xs text-gray-600 font-medium">
            We respond within 2 hours
          </span>
        </div>
      </div>
    </form>
  );
}