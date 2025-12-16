// app/school-trips/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "School Bus Rental Belgium | Safe Student Transport for Educational Tours",
  description: "Safe, reliable bus rental for school trips and educational tours across Belgium. Professional drivers, modern coaches, and customized itineraries for student groups visiting Brussels, Bruges, Ghent, and historical sites.",
  keywords: [
    "school bus rental Belgium",
    "student transport services Flanders",
    "educational field trips Brussels",
    "school excursion transport Belgium",
    "student group charter Antwerp",
    "child-safe bus Belgium",
    "educational tours transport Brussels",
    "teacher travel planning Belgium",
    "school bus with driver Flanders",
    "Belgian educational transport",
    "international school transport Brussels",
    "excursion bus rental Belgium",
    "Flemish school trips",
    "Wallonia student transport",
    "Belgian heritage tours"
  ],
  openGraph: {
    title: "School Bus Rental Belgium | Belgium Bus Rental",
    description: "Safe and reliable transportation for school trips, educational tours, and student groups across Belgium.",
    type: "website",
    url: "/school-trips",
  }
};

export default function SchoolTripsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}