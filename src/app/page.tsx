import Hero from '../components/Hero'
import ServiceSection from '../components/ServiceSection'
import WhyChooseUs from '../components/WhyChooseUsSection'
import HowItWorks from '../components/HowItWorksSection'
import FinalCta from '../components/FinalCtaSection'
import PartnersSwiper from '../components/Partners'
import BigNumbersSection from '../components/BigNumbersSection'

export const metadata = {
  title: "Belgium Bus Rental – Affordable Bus & Coach Hire Services Across Belgium",
  description:
    "Belgium Bus Rental offers reliable and affordable bus and coach hire services for groups, tours, corporate travel, airport transfers, school trips, and private events across Belgium. Modern fleet, professional drivers, and nationwide coverage. Get a free quote today!",
  keywords: [
    "Belgium Bus Rental",
    "bus hire Belgium",
    "coach hire Belgium",
    "charter bus Belgium",
    "rent a bus Belgium",
    "group transportation Belgium",
    "private bus Belgium",
    "tour bus Belgium",
    "corporate bus rental Belgium",
    "airport transfer bus Belgium",
  ],
 
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
