"use client";

import { MapPin, Phone, Mail } from "lucide-react";
// import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  // const icons = [
  //   { Icon: FaWhatsapp, href: "https://wa.me/442038343226", id: "1" },
  // ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main content grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-9 lg:gap-12">
          {/* Contact - unchanged */}
          <div className="md:col-span-2 lg:col-span-1 text-center md:text-left">
            <div className="space-y-6">
              {/* Logo */}
              <Link href="/" className="flex justify-center md:justify-start items-center">
                <Image src="/images/logo2.png" width={180} height={58} alt="France Bus Rental Logo" />
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
                  <a href="mailto:info@busrentalbelgium.com" className="text-base hover:text-white transition-colors">info@busrentalbelgium.com</a>
                </div>
              </div>
            </div>
          </div>

          {/* Services - centered */}
          <div className="text-center">
            <h4 className="text-white font-semibold mb-6 text-lg">Services</h4>
            <ul className="space-y-3 text-base">
              <li><Link href="/corporate-events" className="hover:text-white transition-colors block py-1">Corporate events</Link></li>
              <li><Link href="/school-trips" className="hover:text-white transition-colors block py-1">School trips</Link></li>
              <li><Link href="/shuttles" className="hover:text-white transition-colors block py-1">Shuttles</Link></li>
              <li><Link href="/transfers" className="hover:text-white transition-colors block py-1">Transfers</Link></li>
              <li><Link href="/school-trips" className="hover:text-white transition-colors block py-1">Home to school</Link></li>
            </ul>
          </div>

          {/* Company - centered */}
          <div className="text-center">
            <h4 className="text-white font-semibold mb-6 text-lg">Menu</h4>
            <ul className="space-y-3 text-base">
              <li><Link href="/fleet" className="hover:text-white transition-colors block py-1">Fleet</Link></li>
              <li><Link href="/about-us" className="hover:text-white transition-colors block py-1">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors block py-1">Contact</Link></li>
              {/* <li><Link href="#" className="hover:text-white transition-colors block py-1">Careers</Link></li> */}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-500">
          © {new Date().getFullYear()} Belgium Bus Rental. All rights reserved.
        </div>
      </div>
    </footer>
  );
}