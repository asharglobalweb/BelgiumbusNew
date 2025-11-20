import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import { Toaster } from "sonner"; // ✅ ADD THIS IMPORT

const jostSans = Jost({
  variable: "--font-jost-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Belgium Bus Rental",
  description: "Belgium Bus Rental",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${jostSans.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
        <WhatsAppButton />
        
        {/* ✅ ADD THIS TOASTER COMPONENT */}
        <Toaster 
          position="top-right"
          expand={false}
          richColors
          closeButton
          duration={4000}
          theme="light"
        />
      </body>
    </html>
  );
}