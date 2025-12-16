// app/shuttle-services/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shuttle Bus Services Belgium | Scheduled Group & Airport Transfers",
  description: "Reliable scheduled shuttle services across Belgium for Brussels Airport transfers, inter-city travel between Brussels, Antwerp, Ghent, and group transport. Comfortable shared rides with licensed drivers across all Belgian regions.",
  keywords: [
    "shuttle bus Belgium",
    "Brussels Airport shuttle service",
    "shared transport Belgium",
    "group shuttle bus hire Brussels",
    "intercity shuttle service Belgium",
    "airport shuttle bus Brussels",
    "affordable shuttle bus Antwerp",
    "scheduled shuttle services Belgium",
    "regular shuttle bus routes Flanders",
    "hotel shuttle service Brussels",
    "CBD shuttle service Antwerp",
    "Bruges shuttle transport",
    "Belgian city connections",
    "Zaventem airport transfers",
    "Charleroi airport shuttle"
  ],
  openGraph: {
    title: "Shuttle Bus Services Belgium | Belgium Bus Rental",
    description: "Comfortable and convenient shared shuttle services for airports, cities, and group travel across Belgium.",
    type: "website",
    url: "/shuttle-services",
  }
};

export default function ShuttleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}