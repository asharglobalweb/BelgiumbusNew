"use client";

import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/442038343226"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="
        fixed 
        bottom-6 left-4 
        md:bottom-8 md:left-8 
        z-[9999] 
        bg-green-500 hover:bg-green-600 
        text-white 
        p-3 md:p-4 
        rounded-full 
        shadow-xl 
        transition-all duration-300 
        transform hover:scale-110 hover:shadow-2xl
      "
    >
      <FaWhatsapp className="h-10 w-10 md:h-12 md:w-12" />
    </a>
  );
}
