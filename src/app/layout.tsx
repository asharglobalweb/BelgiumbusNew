// app/layout.tsx
import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import { Toaster } from "sonner";

const jostSans = Jost({
  variable: "--font-jost-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Belgium Bus Rental | Premium Coach & Minibus Charter Services Nationwide",
    template: "%s | Belgium Bus Rental"
  },
  description: "Professional bus and coach rental services across Belgium. Modern fleet, certified drivers, 24/7 support for Brussels, Antwerp, Ghent, Bruges, and all Belgian regions. Corporate transport, airport transfers, and group travel.",
  keywords: [
    "bus rental Belgium",
    "coach hire Belgium",
    "minibus rental Brussels",
    "group transport Belgium",
    "bus charter Antwerp",
    "Brussels Airport transfer",
    "corporate bus rental Belgium",
    "school bus Belgium",
    "tour bus services Belgium",
    "private coach charter Belgium",
    "luxury minibus hire Brussels",
    "event transportation Belgium",
    "Belgium transport services",
    "Flanders bus rental",
    "Wallonia coach hire",
    "Belgian group travel",
    "Brussels MICE transport",
    "Belgian excursions"
  ],
  openGraph: {
    title: "Belgium Bus Rental | Premium Coach & Minibus Services",
    description: "Reliable bus and coach rental across all Belgian regions with certified drivers and modern vehicles.",
    type: "website",
    locale: "en_BE",
  }
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