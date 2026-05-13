import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import Partners from '@/components/sections/Partners';
import Numbers from '@/components/sections/Numbers';
import Services from '@/components/sections/Services';
import HowWeWork from '@/components/sections/HowWeWork';
import Pricing from '@/components/sections/Pricing';
import BeforeAfter from '@/components/sections/BeforeAfter';
import Licenses from '@/components/sections/Licenses';
import Team from '@/components/sections/Team';
import Reviews from '@/components/sections/Reviews';
import LeadCapture from '@/components/sections/LeadCapture';
import FAQ from '@/components/sections/FAQ';
import Contacts from '@/components/sections/Contacts';
import Footer from '@/components/layout/Footer';
import MobileStickyCTA from '@/components/layout/MobileStickyCTA';
import type { HeroVariant } from '@/lib/hero-variants';

export default function Home({ variant }: { variant: HeroVariant }) {
  return (
    <>
      <Header />
      <main className="flex flex-col flex-1">
        <Hero variant={variant} />
        <Partners />
        <Numbers />
        <Services />
        <HowWeWork />
        <Pricing />
        <BeforeAfter />
        <Licenses />
        <Team />
        <Reviews />
        <LeadCapture />
        <FAQ />
        <Contacts />
      </main>
      <Footer />
      <MobileStickyCTA />
    </>
  );
}
