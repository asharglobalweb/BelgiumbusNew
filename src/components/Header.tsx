// components/Header.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone, ChevronDown, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: "Home", href: "/" },
    { 
      name: "Services", 
      href: "#services",
      submenu: [
        { name: "Corporate Events", href: "/corporate-events" },
        { name: "School Trips", href: "/school-trips" },
        { name: "Transfers", href: "/transfers" },
        { name: "Shuttles", href: "/shuttles" }
      ]
    },
    { name: "Fleet", href: "/fleet" },
    { name: "About Us", href: "/about-us" },
    { name: "Contact", href: "/contact" }
  ];

  const linkClasses = (href: string) => {
    const base = "px-4 py-2 rounded-lg text-base font-medium transition-all duration-300";
    const isActive = pathname === href;
    return isActive
      ? `${base} text-blue-600 bg-blue-50 font-semibold`
      : `${base} text-gray-700 hover:text-blue-600 hover:bg-gray-50`;
  };

  const mobileLinkClasses = (href: string) => {
    const base = "px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 flex items-center justify-between";
    const isActive = pathname === href;
    return isActive
      ? `${base} text-blue-600 bg-blue-50 font-semibold`
      : `${base} text-gray-700 hover:text-blue-600 hover:bg-gray-50`;
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-lg shadow-lg py-2"
          : "bg-white/90 backdrop-blur-sm py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative w-48 h-18 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/images/logo2.png"
              fill
              className="object-contain"
              alt="Belgium Buses - Premium Coach Hire Services"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation - Centered */}
        <nav className="hidden lg:flex items-center space-x-1 flex-1 justify-center">
          {navigation.map((item) => (
            <div 
              key={item.href} 
              className="relative group"
              onMouseEnter={() => setActiveDropdown(item.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {item.submenu ? (
                <>
                  <button className={`${linkClasses(item.href)} flex items-center gap-1`}>
                    {item.name}
                    <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                  </button>
                  <div className={`absolute top-full left-0 w-56 bg-white/95 backdrop-blur-lg rounded-xl shadow-2xl border border-gray-100 transition-all duration-300 transform ${
                    activeDropdown === item.name ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'
                  }`}>
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors first:rounded-t-xl last:rounded-b-xl"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link href={item.href} className={linkClasses(item.href)}>
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Desktop Contact */}
        <div className="hidden lg:flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-gray-700 bg-blue-50 px-6 py-3 rounded-xl hover:bg-blue-100 transition-all duration-300 group">
            <Phone className="h-5 w-5 text-blue-600 group-hover:scale-110 transition-transform" />
            <a
              href="tel:+442038343226"
              className="font-semibold hover:text-blue-600 transition-colors text-lg"
            >
              +44 20 3834 3226
            </a>
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors bg-gray-100 rounded-lg"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-lg shadow-xl border-t border-gray-200 transition-all duration-300 ${
          mobileOpen 
            ? "max-h-screen opacity-100 visible" 
            : "max-h-0 opacity-0 invisible"
        }`}
        style={{
          height: mobileOpen ? 'auto' : '0',
          overflow: mobileOpen ? 'visible' : 'hidden'
        }}
      >
        <nav className="px-4 py-6 space-y-2">
          {navigation.map((item) => (
            <div key={item.href}>
              {item.submenu ? (
                <>
                  {/* Services dropdown trigger for mobile */}
                  <button
                    className={mobileLinkClasses(item.href)}
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  >
                    <span>{item.name}</span>
                    <ChevronDown 
                      className={`h-4 w-4 transition-transform duration-300 ${
                        mobileServicesOpen ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>
                  
                  {/* Services dropdown content for mobile */}
                  <div
                    className={`transition-all duration-300 overflow-hidden ${
                      mobileServicesOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="ml-4 mt-2 space-y-1 border-l-2 border-gray-200 pl-4">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className="flex items-center space-x-2 px-4 py-3 text-gray-600 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50 group"
                          onClick={() => {
                            setMobileOpen(false);
                            setMobileServicesOpen(false);
                          }}
                        >
                          <ChevronRight className="h-3 w-3 text-gray-400 group-hover:text-blue-600 transition-colors" />
                          <span>{subItem.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <Link
                  href={item.href}
                  className={mobileLinkClasses(item.href)}
                  onClick={() => setMobileOpen(false)}
                >
                  <span>{item.name}</span>
                </Link>
              )}
            </div>
          ))}

          {/* Mobile Contact */}
          <div className="pt-4 border-t border-gray-200 mt-4">
            <div className="flex items-center space-x-2 text-gray-700 bg-blue-50 p-4 rounded-lg">
              <Phone className="h-5 w-5 text-blue-600" />
              <a 
                href="tel:+442038343226" 
                className="font-semibold text-lg hover:text-blue-600 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                +44 20 3834 3226
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}