// components/Footer.tsx
"use client";

import { MapPin, Phone, Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const icons = [
    { Icon: FaWhatsapp, href: "https://wa.me/442038343226", id: "1" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main content grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Contact */}
          <div className="md:col-span-2 lg:col-span-1 text-center md:text-left">
            <div className="space-y-6">
              {/* Logo */}
              <Link href="/" className="flex justify-center md:justify-start items-center">
                <Image src="/images/logo2.png" width={180} height={58} alt="Belgium Buses Logo" />
              </Link>

              <div className="space-y-4">
                <div className="flex justify-center md:justify-start items-start space-x-3">
                  <MapPin className="h-6 w-6 text-blue-400 mt-0.5 flex-shrink-0" />
                  <address className="not-italic text-base">
                    Rue d&apos;Arenberg 3, 1000 Bruxelles, Belgium
                  </address>
                </div>
                <div className="flex justify-center md:justify-start items-center space-x-3">
                  <Phone className="h-6 w-6 text-blue-400" />
                  <a href="tel:+442038343226" className="text-base hover:text-white transition-colors">+44 20 3834 3226</a>
                </div>
                <div className="flex justify-center md:justify-start items-center space-x-3">
                  <Mail className="h-6 w-6 text-blue-400" />
                  <a href="mailto:info@belgiumbuses.com" className="text-base hover:text-white transition-colors">info@belgiumbuses.com</a>
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="text-center md:text-left">
            <h4 className="text-white font-semibold mb-6 text-lg">Services</h4>
            <ul className="space-y-3 text-base">
              <li><Link href="/corporate-events" className="hover:text-white transition-colors block py-1">Corporate events</Link></li>
              <li><Link href="/school-trips" className="hover:text-white transition-colors block py-1">School trips</Link></li>
              <li><Link href="/shuttles" className="hover:text-white transition-colors block py-1">Shuttles</Link></li>
              <li><Link href="/transfers" className="hover:text-white transition-colors block py-1">Transfers</Link></li>
              <li><Link href="/school-trips" className="hover:text-white transition-colors block py-1">Home to school</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="text-center md:text-left">
            <h4 className="text-white font-semibold mb-6 text-lg">Company</h4>
            <ul className="space-y-3 text-base">
              <li><Link href="/about-us" className="hover:text-white transition-colors block py-1">About Us</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors block py-1">Careers</Link></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="text-center md:text-left">
            <h4 className="text-white font-semibold mb-6 text-lg">Contact Us</h4>
            <div className="flex justify-center md:justify-start space-x-4">
              {icons.map(({ Icon, href, id }) => (
                <Link
                  key={id}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-green-400 transition-colors p-3 bg-gray-800 rounded-lg"
                >
                  <Icon className="h-7 w-7" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-500">
          © {new Date().getFullYear()} Belgium Buses. All rights reserved.
        </div>
      </div>
    </footer>
  );
}