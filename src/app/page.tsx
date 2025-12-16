// app/page.tsx
import Hero from '../components/Hero'
import ServiceSection from '../components/ServiceSection'
import WhyChooseUs from '../components/WhyChooseUsSection'
import HowItWorks from '../components/HowItWorksSection'
import FinalCta from '../components/FinalCtaSection'
import PartnersSwiper from '../components/Partners'
import BigNumbersSection from '../components/BigNumbersSection'

export const metadata = {
  title: "Belgium Bus Rental & Coach Hire | Premium Group Transportation Services",
  description: "Professional bus rental, coach hire, and minibus services across Belgium. Modern vehicles, EU-certified drivers, 24/7 support for Brussels Airport transfers, corporate events in Antwerp, school trips to Bruges, and tours across Flanders and Wallonia.",
  keywords: [
    "Belgium bus rental",
    "coach hire Belgium",
    "minibus rental Brussels",
    "group transportation Belgium",
    "bus charter Antwerp",
    "Brussels Airport transfer bus",
    "corporate transport Belgium",
    "school bus rental Flanders",
    "tour bus rental Belgium",
    "private coach charter Brussels",
    "luxury bus hire Antwerp",
    "event transportation services Belgium",
    "Belgium MICE transport",
    "Brussels city transport",
    "Ghent bus services",
    "Bruges tour transport",
    "Liège group transportation",
    "Belgian excursion transport"
  ],
  openGraph: {
    title: "Belgium Bus Rental | Premium Group Transportation Services",
    description: "Professional bus and coach rental services across all Belgian regions with EU-certified drivers.",
    type: "website",
    url: "https://busrentalbelgium.com",
  }
};

export default function Home() {
  return (
    <>
      <Hero />
      <ServiceSection />
      <PartnersSwiper />
      <WhyChooseUs />
      <HowItWorks />
      <BigNumbersSection />
      <FinalCta />
    </>
  );
}