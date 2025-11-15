import Hero from '../components/Hero'
import ServiceSection from '../components/ServiceSection'
import WhyChooseUs from '../components/WhyChooseUsSection'
import HowItWorks from '../components/HowItWorksSection'
import FinalCta from '../components/FinalCtaSection'
import PartnersSwiper from '../components/Partners'
import BigNumbersSection from '../components/BigNumbersSection'

export default function Home() {
  return (
    <>
  <Hero/>
  <ServiceSection/>
  <PartnersSwiper/>
  <WhyChooseUs/>
  <HowItWorks/>
  <BigNumbersSection/>
  <FinalCta/>
  </>
  );
}
