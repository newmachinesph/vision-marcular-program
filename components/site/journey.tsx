"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Reveal from "./Reveal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * The entrance: a panel arrives small in the bottom-left corner and grows to
 * full bleed as it climbs into place. Its track carries a -100vh margin, so the
 * whole rise plays over the PREVIOUS section while that one is still pinned —
 * the outgoing scene never moves, the incoming one grows on top of it.
 */
/**
 * A pinned section plays out over its track MINUS a trailing viewport. That tail
 * is the hold: the beats are finished and sitting still while the next panel
 * rises over them. Without it a section is still animating when the next one
 * starts climbing, and neither reads.
 */
const holdEnd = (track: HTMLElement | null) => () =>
  `+=${(track?.offsetHeight ?? 0) - window.innerHeight * 2}`;

const riseIn = (el: string, trigger: Element | null) => {
  // the -108% lift pulls the panel into view a viewport early, so it would sit
  // parked in the corner through the whole hold — fade it in as the rise starts
  gsap.fromTo(
    el,
    { autoAlpha: 0 },
    {
      autoAlpha: 1,
      ease: "none",
      scrollTrigger: { trigger, start: "top bottom", end: "top 80%", scrub: true },
    },
  );

  return gsap.fromTo(
    el,
    // the stage's own bottom edge starts a full viewport BELOW the fold, so the
    // -108% lift is what keeps the shrunken panel sitting in the visible
    // bottom-left corner; it unwinds to 0 exactly as the panel reaches full size
    { scale: 0.3, yPercent: -108 },
    {
      scale: 1,
      yPercent: 0,
      ease: "none",
      // lands a hair before the pin so the panel is already full-bleed at handoff
      scrollTrigger: { trigger, start: "top bottom", end: "top 2%", scrub: true },
    },
  );
};

/* ══ TUNNEL — fly through the center, toward the light ══════════ */
export function TunnelSection() {
  const ref = useRef<HTMLElement>(null);
  const RINGS = 8;

  useGSAP(
    () => {
      if (reduced()) return;
      riseIn(".tunnel-stage", ref.current);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: holdEnd(ref.current),
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
      tl.fromTo(
        "[data-ring]",
        { scale: 0.12, autoAlpha: 0 },
        { scale: 3.2, autoAlpha: 1, ease: "power1.in", stagger: 0.09 },
        0,
      )
        .to("[data-tunnel-bg]", { opacity: 1, ease: "none" }, 0.25)
        .fromTo("[data-tunnel-copy-a]", { autoAlpha: 1 }, { autoAlpha: 0, y: -30 }, 0.3)
        .fromTo("[data-tunnel-copy-b]", { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0 }, 0.62);
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="tunnel-track" aria-label="Through the center">
      <div className="tunnel-stage">
        {/* dark start → the generated light at the end of the tunnel */}
        <div className="tunnel-bg-light" data-tunnel-bg aria-hidden="true" />
        <div className="tunnel-rings" aria-hidden="true">
          {Array.from({ length: RINGS }).map((_, i) => (
            <span key={i} data-ring className="tunnel-ring" style={{ opacity: 0 }} />
          ))}
        </div>
        <div className="tunnel-copy" data-tunnel-copy-a>
          <h2 className="tunnel-head">It doesn&apos;t have to end this way.</h2>
        </div>
        <div className="tunnel-copy" data-tunnel-copy-b>
          <p className="eyebrow eyebrow-white">Come through the center</p>
          <h2 className="tunnel-head tunnel-head-light">Your cells can find their way back.</h2>
        </div>
      </div>
    </section>
  );
}

/* ══ LIFE — the world returns, vibrant and up close ═════════════
   Cards clear from blurred/amber to crisp as they reveal. Drop the
   generated /public/life-*.png files — gradients fall back until then. */
/**
 * Multi-layered parallax illustration scenes. Per scene, three planes:
 *   bg  (depth 0.3, slow)  → /life-<key>-bg.png   — full-bleed environment
 *   mid (depth 0.6)        → /life-<key>-mid.png  — the subject (falls back to /life-<key>.png)
 *   fg  (depth 1, fast)    → /life-<key>-fg.png   — foreground accent crossing the frame
 * Missing files fail silently to gradients — scenes work before assets land.
 */
const LIFE_SCENES = [
  { key: "book", title: "Reading your book", note: "Every line, exactly where you look" },
  { key: "newspaper", title: "The morning paper", note: "Headlines, box scores, crosswords" },
  { key: "knitting", title: "Knitting again", note: "Every loop, every stitch" },
  { key: "baking", title: "One tablespoon, level", note: "The small print in your own kitchen" },
  { key: "grandchild", title: "Their faces", note: "The detail you refuse to lose" },
  { key: "photos", title: "Old photographs", note: "And the new ones still to come" },
];

const LAYERS = [
  { suffix: "bg", depth: 0.3, cls: "life-layer-bg" },
  { suffix: "mid", depth: 0.6, cls: "life-layer-mid" },
  { suffix: "fg", depth: 1, cls: "life-layer-fg" },
] as const;

export function LifeSection() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reduced()) return;
      riseIn(".life-stage", ref.current);
      // the panel carries its copy up with it — an empty white rectangle rising
      // over the tunnel reads as a glitch
      gsap.fromTo(
        "[data-life-head]",
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top 82%", end: "top 24%", scrub: true },
        },
      );

      const scenes = gsap.utils.toArray<HTMLElement>("[data-life-scene]");
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          // no hold — nothing rises over life, the page just resumes below it
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // header already arrived with the rise — it just steps aside for the scenes
      tl.to("[data-life-head]", { autoAlpha: 0, y: -40, duration: 0.5 }, 1.2);

      scenes.forEach((scene, i) => {
        const at = 1 + i * 1.5;
        // each image lands the same way the panels do — small in the bottom-left
        // corner, growing to full bleed
        tl.fromTo(
          scene,
          { autoAlpha: 0, scale: 0.28 },
          { autoAlpha: 1, scale: 1, ease: "power2.out", duration: 0.8 },
          at,
        );
        // plane depth: bg sits behind, fg floats in front — true 3D parallax
        scene.querySelectorAll<HTMLElement>("[data-depth]").forEach((layer) => {
          const d = Number(layer.dataset.depth ?? 0.5);
          gsap.set(layer, { z: (d - 0.6) * 280, scale: 1 - (d - 0.6) * 0.22 });
          tl.fromTo(layer, { yPercent: d * 7 }, { yPercent: d * -7, ease: "none", duration: 1.95 }, at);
        });
        if (i < scenes.length - 1) {
          tl.to(scene, { autoAlpha: 0, scale: 1.14, ease: "power1.in", duration: 0.6 }, at + 1.35);
        }
      });

      // mouse parallax — planes lean toward the cursor, deeper = further
      const stage = ref.current!.querySelector(".life-stage") as HTMLElement;
      const movers = gsap.utils.toArray<HTMLElement>("[data-depth]").map((el) => ({
        d: Number(el.dataset.depth ?? 0.5),
        x: gsap.quickTo(el, "x", { duration: 0.6, ease: "power2.out" }),
      }));
      const onMove = (e: PointerEvent) => {
        const nx = (e.clientX / window.innerWidth - 0.5) * 2; // -1..1
        movers.forEach((m) => m.x(nx * m.d * -18));
      };
      stage.addEventListener("pointermove", onMove, { passive: true });
      return () => stage.removeEventListener("pointermove", onMove);
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="life-track" aria-label="Seeing life again">
      <div className="life-stage">
        <div className="life-head sec-head" data-life-head>
          <p className="eyebrow center">What clear vision gives back</p>
          <h2 className="h2">
            This is what you&apos;re protecting. <span className="accent">Life, up close.</span>
          </h2>
          <p className="lead">
            Not an eye chart. Your book. Your recipes. Your grandchildren&apos;s faces. The small,
            close things that make a day worth seeing.
          </p>
        </div>

        <div className="life-scenes">
          {LIFE_SCENES.map((s) => (
            <figure key={s.key} className="life-scene" data-life-scene>
              {LAYERS.map((l) => (
                <div
                  key={l.suffix}
                  className={`life-layer ${l.cls}`}
                  data-depth={l.depth}
                  style={{
                    backgroundImage:
                      l.suffix === "mid"
                        ? `url(/life-${s.key}-mid.webp), url(/life-${s.key}.webp), var(--life-fallback)`
                        : `url(/life-${s.key}-${l.suffix}.webp)${l.suffix === "bg" ? ", var(--life-fallback)" : ""}`,
                  }}
                  role={l.suffix === "mid" ? "img" : undefined}
                  aria-label={l.suffix === "mid" ? s.title : undefined}
                  aria-hidden={l.suffix !== "mid"}
                />
              ))}
              <figcaption>
                <strong>{s.title}</strong>
                <span>{s.note}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══ REELS — slow marquee of patient-story reels ════════════════ */
// real patients from the recorded interview transcripts
const REELS = [
  { title: "Patty: the fishbowl effect, gone", meta: "Wet AMD · Cleveland News", views: "1.3M" },
  { title: "Muriel: “like two different patients”", meta: "Wet AMD · Nurse practitioner", views: "540K" },
  { title: "Margaret: a clean grid after 2 years", meta: "Dry AMD · St. Louis", views: "92K" },
  { title: "Jim: the black spots, half the size", meta: "Dry AMD · Veterinarian, 51 yrs", views: "76K" },
  { title: "Barbara: “I can see again”", meta: "Early-onset AMD · Telemedicine", views: "24K" },
  { title: "Inside the HOMING Protocol", meta: "Dr. Rozakis explains", views: "18K" },
];

export function ReelsSection() {
  const row = [...REELS, ...REELS]; // duplicated for a seamless loop
  return (
    <section className="section sec-dark reels-sec" aria-label="Patient stories in motion">
      <div className="wide">
        <Reveal className="sec-head">
          <p className="eyebrow eyebrow-light center">Latest reels</p>
          <h2 className="h2 h2-light">
            Real patients. <span className="accent-light">On camera.</span>
          </h2>
        </Reveal>
      </div>

      <div className="reels-marquee" aria-hidden="false">
        <div className="reels-row">
          {row.map((r, i) => (
            <a
              key={i}
              className="reel-card"
              href="https://www.youtube.com/@macularprogram"
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={i < REELS.length ? 0 : -1}
              aria-hidden={i >= REELS.length}
            >
              <span className="reel-brand">Reels</span>
              <span className="reel-thumb" aria-hidden="true">
                <span className="reel-play">▶</span>
              </span>
              <span className="reel-title">{r.title}</span>
              <span className="reel-meta">{r.meta}</span>
              <span className="reel-views">{r.views} views</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
