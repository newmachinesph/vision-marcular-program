"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Act I — split stage. Copy lives in a solid navy panel on the left (always
 * legible, per CEO); the real living room warps on the right. The distortion
 * gets a long solo before any copy arrives, and the whole take breathes over
 * 550vh of scroll.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from("[data-hero-line]", { yPercent: 110, duration: 1, stagger: 0.12 }, 0.2)
        .from("[data-hero-fade]", { autoAlpha: 0, y: 24, duration: 0.8, stagger: 0.1 }, 0.8);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      tl
        // the promise steps aside…
        .to("[data-beat-promise]", { autoAlpha: 0, y: -50, duration: 0.5 }, 0.6)
        // …then the room fails SLOWLY — a long wordless stretch first
        .to("[data-warp-map]", { attr: { scale: 44 }, ease: "none", duration: 2.4 }, 0.7)
        .to("[data-hero-dim]", { opacity: 0.55, ease: "none", duration: 2.2 }, 0.9)
        .to("[data-hero-amber]", { opacity: 0.85, ease: "none", duration: 2.0 }, 1.0)
        .to("[data-hero-scotoma]", { opacity: 1, scale: 1.3, ease: "none", duration: 1.8 }, 1.4)
        // copy arrives only after the distortion has been felt
        .fromTo("[data-beat-fear]", { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 2.5)
        .to("[data-beat-fear]", { autoAlpha: 0, y: -40, duration: 0.5 }, 3.6)
        .fromTo("[data-beat-fact]", { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 4.0);
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="hero-track" aria-label="Introduction">
      <svg width="0" height="0" aria-hidden="true">
        <filter id="amd-warp">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.02" numOctaves="2" seed="4" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" data-warp-map scale="0" />
        </filter>
      </svg>

      <div className="hero-stage">
        {/* right: the room that fails */}
        <div className="hero-scene" aria-hidden="true">
          <div className="hero-room" data-hero-room />
          <div className="hero-dim" data-hero-dim />
          <div className="hero-amber" data-hero-amber />
          <div className="hero-scotoma" data-hero-scotoma />
        </div>

        {/* left: solid panel — copy is always on solid color */}
        <div className="hero-panel">
          <div className="hero-beat" data-beat-promise>
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
            <p className="scroll-hint" data-hero-fade aria-hidden="true">
              Scroll — watch the room the way AMD sees it
              <span className="scroll-hint-line" />
            </p>
          </div>

          <div className="hero-beat" data-beat-fear>
            <p className="eyebrow eyebrow-amber">This is macular degeneration</p>
            <h2 className="scare-head">
              The world doesn&apos;t go dark all at once.{" "}
              <span className="scare-amberword">It goes wavy. Amber. Then missing.</span>
            </h2>
            <p className="scare-sub">
              Straight lines bend. Faces blur at the center. The words on a page dissolve exactly
              where you look.
            </p>
          </div>

          <div className="hero-beat" data-beat-fact>
            <p className="eyebrow eyebrow-amber">Right now</p>
            <h2 className="scare-head">
              This is how <span className="scare-amberword">10 million Americans</span> see.
            </h2>
            <p className="scare-sub">
              And the standard of care hasn&apos;t meaningfully changed in 25 years.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
