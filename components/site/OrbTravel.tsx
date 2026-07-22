"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Orb from "./Orb";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const BASE = 480; // traveler's natural size in px — landings scale from this

/** Document-space landing target for a slot. */
function slotTarget(el: Element) {
  const r = el.getBoundingClientRect();
  return {
    x: r.left + window.scrollX + r.width / 2 - BASE / 2,
    y: r.top + window.scrollY + r.height / 2 - BASE / 2,
    scale: r.width / BASE,
  };
}

/**
 * Cookie-technique travel: one orb, absolutely positioned in the page flow,
 * glides between `[data-orb-slot]` landing pads and heals a step further at
 * every landing. A SINGLE master timeline drives the whole journey — one
 * writer for x/y/scale, so fast scrolling can never make competing scrubbed
 * tweens fight (the "jumping" bug). The far-away final-CTA pad re-emerges via
 * its own trigger, safely out of range of the master.
 * Desktop only; mobile + reduced-motion get static per-slot orbs.
 */
export default function OrbTravel() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const traveler = ref.current;
    if (!traveler) return;

    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const all = Array.from(document.querySelectorAll("[data-orb-slot]"));
        if (all.length < 2) return;

        const gapSlots = all.filter((s) => (s as HTMLElement).dataset.orbGap === "far");
        const slots = all.filter((s) => (s as HTMLElement).dataset.orbGap !== "far");

        document.body.classList.add("orb-travel-on");

        const dmg = traveler.querySelectorAll("[data-orb-damaged], [data-orb-halo-blue]");
        const good = traveler.querySelectorAll("[data-orb-healed], [data-orb-halo-gold]");
        const healAt = (s: Element) => Number((s as HTMLElement).dataset.heal ?? 1);

        let master: gsap.core.Timeline | null = null;
        const extras: ScrollTrigger[] = [];

        const build = () => {
          master?.scrollTrigger?.kill();
          master?.kill();
          extras.forEach((t) => t.kill());
          extras.length = 0;

          const vh = window.innerHeight;
          // scroll positions: where each glide starts / lands
          const marks = slots.map((slot) => {
            const sec = slot.closest("section") ?? slot;
            const secTop = sec.getBoundingClientRect().top + window.scrollY;
            const t = slotTarget(slot);
            return {
              target: t,
              heal: healAt(slot),
              glideStart: Math.max(0, secTop - vh * 0.92),
              land: Math.max(0, t.y + BASE / 2 - vh * 0.52),
            };
          });
          const total = marks[marks.length - 1].land || 1;

          gsap.set(traveler, { ...marks[0].target, autoAlpha: 1 });
          gsap.set(dmg, { opacity: 1 - marks[0].heal });
          gsap.set(good, { opacity: marks[0].heal });

          master = gsap.timeline({
            defaults: { ease: "power1.inOut" },
            scrollTrigger: { start: 0, end: () => total, scrub: 1 },
          });

          for (let i = 1; i < marks.length; i++) {
            const at = marks[i].glideStart / total;
            const dur = Math.max(0.001, (marks[i].land - marks[i].glideStart) / total);
            master.to(traveler, { ...marks[i].target, duration: dur }, at);
            master.to(dmg, { opacity: 1 - marks[i].heal, ease: "none", duration: dur }, at);
            master.to(good, { opacity: marks[i].heal, ease: "none", duration: dur }, at);
          }

          // far pads (final CTA): orb re-emerges in place — no cross-page flight
          gapSlots.forEach((slot) => {
            const t = slotTarget(slot);
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: slot.closest("section") ?? slot,
                start: "top 85%",
                end: "top 30%",
                scrub: 1,
              },
            });
            tl.fromTo(
              traveler,
              { x: t.x, y: t.y + 60, scale: t.scale * 0.4, autoAlpha: 0 },
              { x: t.x, y: t.y, scale: t.scale, autoAlpha: 1, ease: "power2.out", immediateRender: false },
            );
            tl.to(dmg, { opacity: 0, ease: "none" }, 0);
            tl.to(good, { opacity: 1, ease: "none" }, 0);
            if (tl.scrollTrigger) extras.push(tl.scrollTrigger);
          });

          ScrollTrigger.refresh();
        };

        build();

        // layout shifts (font swap, images) stale-date every landing — rebuild
        document.fonts?.ready.then(() => build());
        let raf = 0;
        const onResize = () => {
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(build);
        };
        window.addEventListener("resize", onResize);

        return () => {
          window.removeEventListener("resize", onResize);
          master?.scrollTrigger?.kill();
          master?.kill();
          extras.forEach((t) => t.kill());
          document.body.classList.remove("orb-travel-on");
        };
      },
    );
  });

  return (
    <div ref={ref} className="orb-traveler" style={{ width: BASE, height: BASE }}>
      <Orb traveler />
    </div>
  );
}
