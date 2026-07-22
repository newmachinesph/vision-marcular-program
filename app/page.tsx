import Nav from "@/components/site/Nav";
import Hero from "@/components/site/Hero";
import OrbTravel from "@/components/site/OrbTravel";
import Footer from "@/components/site/Footer";
import {
  NeedSection,
  HomingSection,
  ResultsSection,
  TestimonialsSection,
  DoctorSection,
  CompareSection,
  GuideSection,
  FinalCTA,
} from "@/components/site/sections";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main className="page">
        {/* one orb travels the whole page, landing pad to landing pad, healing */}
        <OrbTravel />
        <Hero />
        <NeedSection />
        <HomingSection />
        <ResultsSection />
        <TestimonialsSection />
        <DoctorSection />
        <CompareSection />
        <GuideSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
