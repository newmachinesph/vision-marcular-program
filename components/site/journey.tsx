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

/* ══ TUNNEL — fly through the center, toward the light ══════════ */
export function TunnelSection() {
  const ref = useRef<HTMLElement>(null);
  const RINGS = 8;

  useGSAP(
    () => {
      if (reduced()) return;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
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
          <p className="eyebrow eyebrow-light">Come through the center</p>
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
      const scenes = gsap.utils.toArray<HTMLElement>("[data-life-scene]");
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // header settles first, then scene flows into scene — one continuous take
      tl.fromTo("[data-life-head]", { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.5 }, 0)
        .to("[data-life-head]", { autoAlpha: 0, y: -40, duration: 0.5 }, 1.2);

      scenes.forEach((scene, i) => {
        const at = 1 + i * 1.5;
        // first scene arrives still amber-blurred and CLEARS — vision returning
        tl.fromTo(
          scene,
          i === 0
            ? { autoAlpha: 0, scale: 1.08, filter: "blur(16px) sepia(0.8) brightness(0.7)" }
            : { autoAlpha: 0, scale: 1.08 },
          { autoAlpha: 1, scale: 1, filter: "blur(0px) sepia(0) brightness(1)", duration: 0.8 },
          at,
        );
        // depth parallax: each plane drifts at its own speed across the scene's span
        scene.querySelectorAll<HTMLElement>("[data-depth]").forEach((layer) => {
          const d = Number(layer.dataset.depth ?? 0.5);
          tl.fromTo(layer, { yPercent: d * 7 }, { yPercent: d * -7, ease: "none", duration: 1.95 }, at);
        });
        if (i < scenes.length - 1) {
          tl.to(scene, { autoAlpha: 0, scale: 0.98, duration: 0.6 }, at + 1.35);
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
                        ? `url(/life-${s.key}-mid.png), url(/life-${s.key}.png), var(--life-fallback)`
                        : `url(/life-${s.key}-${l.suffix}.png)${l.suffix === "bg" ? ", var(--life-fallback)" : ""}`,
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
const REELS = [
  { title: "“My ophthalmologist was astonished”", meta: "Dry AMD · 20/20 maintained", views: "24K" },
  { title: "Patty: the fishbowl effect, gone", meta: "Wet AMD · Cleveland News", views: "1.3M" },
  { title: "Fewer injections, longer intervals", meta: "Wet AMD · Injection support", views: "92K" },
  { title: "“Nothing more to do” — then this", meta: "Dry AMD · 2-year scans", views: "540K" },
  { title: "Inside the HOMING Protocol", meta: "Dr. Rozakis explains", views: "76K" },
  { title: "Reading the fine print again", meta: "Patient story", views: "18K" },
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
