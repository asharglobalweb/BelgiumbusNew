// app/transfers/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Private Transfers Belgium | Premium Airport & City Transportation",
  description: "Premium private transfer services across Belgium for Brussels Airport, Charleroi Airport, hotels, and destinations. Door-to-door convenience with meet & greet, professional drivers, and comfortable vehicles throughout Belgian cities.",
  keywords: [
    "private transfer Belgium",
    "Brussels airport transfer",
    "Zaventem airport pickup",
    "Charleroi airport service",
    "door to door transport Belgium",
    "luxury car transfer Brussels",
    "hotel transfer service Antwerp",
    "private driver Belgium",
    "meet and greet service Brussels",
    "executive transfer Belgium",
    "limousine service Brussels",
    "corporate car transfer Antwerp",
    "VIP transport Belgium",
    "Belgian airport transfers",
    "city-to-city transfers Belgium"
  ],
  openGraph: {
    title: "Private Transfers Belgium | Belgium Bus Rental",
    description: "Premium door-to-door private transfer service for airports, hotels, and destinations across Belgium.",
    type: "website",
    url: "/transfers",
  }
};

export default function TransferLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}