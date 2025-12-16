// app/corporate/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corporate Bus Rental Belgium | Professional Business Transportation",
  description: "Professional corporate bus & coach hire for meetings, conferences, and business events across Belgium. Executive transport with WiFi, EU-certified drivers, and dedicated management for Brussels, Antwerp, and all business centers.",
  keywords: [
    "corporate bus rental Belgium",
    "business transportation services Brussels",
    "executive coach hire Antwerp",
    "corporate event transport Belgium",
    "company shuttle service Brussels",
    "business travel transport Belgium",
    "conference transportation Brussels",
    "executive bus service Antwerp",
    "corporate transfer Belgium",
    "MICE transport services Brussels",
    "corporate shuttle bus Flanders",
    "business event transport Belgium",
    "EU business transport",
    "Brussels EU quarter transport",
    "Belgian corporate mobility"
  ],
  openGraph: {
    title: "Corporate Bus Rental Belgium | Professional Business Transportation",
    description: "Executive transport solutions for corporate events and business travel across Belgium.",
    type: "website",
    url: "/corporate",
  }
};

export default function CorporateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}