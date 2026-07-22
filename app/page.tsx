import Nav from "@/components/site/Nav";
import Hero from "@/components/site/Hero";
import Footer from "@/components/site/Footer";
import { TunnelSection, LifeSection, ReelsSection } from "@/components/site/journey";
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
        {/* Act I — the promise, then the room fails (pinned, real photography) */}
        <Hero />

        {/* Act II — through the center, back to light */}
        <TunnelSection />
        <LifeSection />

        {/* Act III — the problem, the process, the proof */}
        <NeedSection />
        <HomingSection />
        <ResultsSection />
        <ReelsSection />
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
