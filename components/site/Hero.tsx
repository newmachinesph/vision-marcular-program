"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Orb from "./Orb";

gsap.registerPlugin(useGSAP);

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from("[data-hero-line]", { yPercent: 110, duration: 1, stagger: 0.12 }, 0.15)
        .from("[data-hero-fade]", { autoAlpha: 0, y: 24, duration: 0.8, stagger: 0.1 }, 0.7);
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="hero" aria-label="Introduction">
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="eyebrow eyebrow-light" data-hero-fade>
            Peer-reviewed · 365 eyes studied
          </p>
          <h1 className="hero-h1">
            <span className="hero-line"><span data-hero-line>Your Macula</span></span>
            <span className="hero-line"><span data-hero-line>Can <em>Heal.</em></span></span>
          </h1>
          <p className="hero-lead" data-hero-fade>
            <span className="accent-light">The science proves it.</span> A comprehensive
            functional-medicine approach to macular degeneration — built on 15 years of research
            and published clinical results.
          </p>
          <div className="hero-cta" data-hero-fade>
            <Link href="/blueprint" className="btn btn-primary">Get the Free Guide →</Link>
            <Link href="/checkout" className="btn btn-light">Book a Consultation</Link>
          </div>
        </div>

        {/* landing pad #1 — the orb starts here, fully damaged */}
        <div className="hero-orb-slot" data-orb-slot data-heal="0">
          <Orb heal={0} className="orb-static" />
        </div>
      </div>

      <div className="hero-foot" data-hero-fade>
        <span className="hero-ticker">
          Hormones · Oxidative stress · Methylation · Inflammation · Nutrition · Epigenetics
        </span>
        <span className="scroll-hint" aria-hidden="true">
          Scroll to see the science
          <span className="scroll-hint-line" />
        </span>
      </div>
    </section>
  );
}
