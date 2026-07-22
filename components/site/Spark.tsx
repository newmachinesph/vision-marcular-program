"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, useGSAP);

/**
 * The spark — the story's traveling light. Ignites in the hero as the room
 * dims, arcs through the tunnel, hovers over the returning life scenes, and
 * merges into the healed macula orb in Results (which pulses on receipt).
 *
 * Flight quality: curved motion paths (not straight lines), per-leg eases,
 * a constant idle float on the inner element, and a glow-flash merge.
 * Fixed-position + one master scrubbed timeline; waypoints re-measured on
 * font-load / image-load / resize.
 */
export default function Spark() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      // idle float — lives on the inner element so it never fights the path
      const float = gsap.to(".spark-inner", {
        y: 9,
        duration: 1.9,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      const build = () => {
        const W = window.innerWidth;
        const H = window.innerHeight;
        const P = (xvw: number, yvh: number) => ({ x: (W * xvw) / 100, y: (H * yvh) / 100 });
        const top = (sel: string) => {
          const e = document.querySelector(sel);
          return e ? e.getBoundingClientRect().top + window.scrollY : 0;
        };
        const heroH = document.querySelector<HTMLElement>(".hero-track")?.offsetHeight ?? 0;
        const tunnelTop = top(".tunnel-track");
        const tunnelH = document.querySelector<HTMLElement>(".tunnel-track")?.offsetHeight ?? 0;
        const lifeTop = top(".life-track");
        const lifeH = document.querySelector<HTMLElement>(".life-track")?.offsetHeight ?? 0;
        const orbEl = document.querySelector(".results-center .orb");
        const orbR = orbEl?.getBoundingClientRect();
        const orb = orbR
          ? { x: orbR.left + orbR.width / 2, y: H * 0.5 }
          : { x: W / 2, y: H / 2 };
        const resultsY = top("#results") - H * 0.5;
        const total = resultsY + 200;
        const at = (y: number) => y / total;
        const dur = (px: number) => px / total;

        const path = (pts: { x: number; y: number }[], curviness = 1.4) => ({
          motionPath: { path: pts, curviness },
        });

        const tl = gsap.timeline({
          scrollTrigger: { start: 0, end: () => total, scrub: 1, invalidateOnRefresh: true },
        });

        tl
          // ignition — as the dimming begins
          .set(el, { xPercent: -50, yPercent: -50, ...P(76, 42), scale: 0.7, autoAlpha: 0 }, 0)
          .to(el, { autoAlpha: 1, scale: 1, ease: "power2.out", duration: dur(heroH * 0.16) }, at(heroH * 0.12))
          // restless drift while the room fails — a slow, worried arc
          .to(el, { ...path([P(76, 42), P(67, 34), P(58, 48)], 1.6), ease: "sine.inOut", duration: dur(heroH * 0.55) }, at(heroH * 0.3))
          // swoop down into the tunnel mouth, swelling toward the light
          .to(el, { ...path([P(58, 48), P(44, 62), P(50, 52)], 1.5), scale: 1.5, ease: "power1.inOut", duration: dur(tunnelH * 0.55) }, at(tunnelTop + tunnelH * 0.05))
          // burst through the bright center — accelerating rise
          .to(el, { ...path([P(50, 52), P(52, 38), P(50, 28)], 1.2), scale: 0.85, ease: "power2.in", duration: dur(tunnelH * 0.35) }, at(tunnelTop + tunnelH * 0.6))
          // sweeping arc up to its perch above the life scenes
          .to(el, { ...path([P(50, 28), P(72, 8), P(86, 14)], 1.5), scale: 0.55, ease: "power2.out", duration: dur(lifeH * 0.22) }, at(lifeTop))
          // alive on its perch — gentle wander while life returns below
          .to(el, { ...path([P(86, 14), P(83, 19), P(85, 15)], 1.8), ease: "sine.inOut", duration: dur(lifeH * 0.6) }, at(lifeTop + lifeH * 0.25))
          // final approach — a long inward arc to the healed orb
          .to(el, { ...path([P(85, 15), P(62, 26), { x: orb.x, y: orb.y }], 1.3), scale: 1.4, ease: "power1.in", duration: dur(H * 1.3) }, at(resultsY - H * 1.4))
          // merge: glow flash, collapse — and the orb pulses on receipt
          .to(el, { scale: 2.2, autoAlpha: 0, ease: "power2.in", duration: dur(H * 0.35) }, at(resultsY - H * 0.4));

        if (orbEl) {
          tl.fromTo(orbEl, { scale: 1 }, { scale: 1.05, yoyo: true, repeat: 1, ease: "sine.inOut", duration: dur(H * 0.3) }, at(resultsY - H * 0.35));
        }
        return tl;
      };

      let tl = build();
      const rebuild = () => { tl.scrollTrigger?.kill(); tl.kill(); tl = build(); ScrollTrigger.refresh(); };
      let raf = 0;
      const onResize = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(rebuild); };
      window.addEventListener("resize", onResize);
      // late layout shifts (fonts, image decode) stale-date the waypoints — rebuild
      document.fonts?.ready.then(() => rebuild());
      window.addEventListener("load", rebuild, { once: true });
      return () => {
        window.removeEventListener("resize", onResize);
        window.removeEventListener("load", rebuild);
        float.kill();
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });
  });

  return (
    <div ref={ref} className="spark" aria-hidden="true">
      <span className="spark-inner">
        <span className="spark-core" />
        <span className="spark-halo" />
      </span>
    </div>
  );
}
