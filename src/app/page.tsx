import Hero from '../components/Hero'
import ServiceSection from '../components/ServiceSection'
import WhyChooseUs from '../components/WhyChooseUsSection'
import HowItWorks from '../components/HowItWorksSection'
import FinalCta from '../components/FinalCtaSection'
import PartnersSwiper from '../components/Partners'
import BigNumbersSection from '../components/BigNumbersSection'

export const metadata = {
  title: "Belgium Bus Rental and Coach Hire | Modern Fleet, Nationwide Coverage",
  description: "Need a reliable bus or coach in Belgium? Get affordable, professional rental for corporate events, school trips, airport transfers, and private tours. Modern vehicles & experienced drivers. Get a free, instant quote!",
  keywords: [
    
    "bus hire Belgium", "coach hire Belgium", "minibus rental Belgium", "charter bus Belgium",
    
    "corporate bus rental Belgium", "airport transfer bus Belgium", "school bus hire Belgium", "private tour bus Belgium",
    "event transportation Belgium", "Brussels airport shuttle", "group travel Belgium",
    
    "executive coach hire", "16 seater minibus", "luxury bus rental", "shuttle bus service",
   
    "bus rental Brussels", "coach hire Antwerp", "minibus Ghent", "Bruges tour bus", "Charleroi airport transfer",
    
    "reliable bus company", "affordable coach hire", "professional drivers", "modern fleet Belgium"
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
