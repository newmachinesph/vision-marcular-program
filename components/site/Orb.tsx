import { useId } from "react";

/**
 * The story object: a crystalline eye whose interior is an OCT-style retina.
 * Two stacked states — damaged (warped rings, clouded macula) and healed
 * (crisp rings, luminous gold core). `heal` (0..1) blends them statically;
 * the traveling instance is driven by GSAP through the `data-orb-*` groups.
 */
export default function Orb({
  heal = 0,
  traveler = false,
  className = "",
}: {
  heal?: number;
  traveler?: boolean;
  className?: string;
}) {
  const uid = useId().replace(/[:]/g, "");
  const id = (s: string) => `${s}-${uid}`;
  const rings = Array.from({ length: 9 }, (_, i) => 44 + i * 27);
  const damaged = 1 - heal;

  return (
    <div className={`orb ${className}`} aria-hidden="true">
      <span
        className="orb-halo orb-halo-blue"
        data-orb-halo-blue={traveler ? "" : undefined}
        style={traveler ? undefined : { opacity: damaged }}
      />
      <span
        className="orb-halo orb-halo-gold"
        data-orb-halo-gold={traveler ? "" : undefined}
        style={traveler ? undefined : { opacity: heal }}
      />

      <svg viewBox="0 0 600 600" width="100%" height="100%" role="presentation">
        <defs>
          <radialGradient id={id("iris")} cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#0d2440" />
            <stop offset="70%" stopColor="#0a1c33" />
            <stop offset="100%" stopColor="#050f1c" />
          </radialGradient>
          <radialGradient id={id("bad")} cx="50%" cy="45%" r="60%">
            <stop offset="0%" stopColor="#3a2a12" />
            <stop offset="45%" stopColor="#241a10" />
            <stop offset="100%" stopColor="#0a1220" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={id("good")} cx="50%" cy="45%" r="60%">
            <stop offset="0%" stopColor="#fff6e2" />
            <stop offset="30%" stopColor="#f4b942" />
            <stop offset="70%" stopColor="#29abe2" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#29abe2" stopOpacity="0" />
          </radialGradient>
          <filter id={id("warp")} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.012 0.02" numOctaves="2" seed="7" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="26" />
          </filter>
          <filter id={id("soft")}>
            <feGaussianBlur stdDeviation="7" />
          </filter>
        </defs>

        {/* glass body */}
        <circle cx="300" cy="300" r="286" fill={`url(#${id("iris")})`} stroke="rgba(41,171,226,0.3)" strokeWidth="1.5" />

        {/* damaged retina */}
        <g data-orb-damaged={traveler ? "" : undefined} style={traveler ? undefined : { opacity: damaged }}>
          <g filter={`url(#${id("warp")})`} stroke="rgba(41,171,226,0.34)" strokeWidth="1.4" fill="none">
            {rings.map((r) => <circle key={r} cx="300" cy="300" r={r} />)}
          </g>
          <circle cx="300" cy="300" r="96" fill={`url(#${id("bad")})`} filter={`url(#${id("soft")})`} />
          <circle cx="300" cy="300" r="52" fill="#160f08" opacity="0.85" filter={`url(#${id("soft")})`} />
        </g>

        {/* healed retina */}
        <g data-orb-healed={traveler ? "" : undefined} style={traveler ? undefined : { opacity: heal }}>
          <g stroke="rgba(41,171,226,0.85)" strokeWidth="1.5" fill="none">
            {rings.map((r, i) => (
              <circle key={r} cx="300" cy="300" r={r} opacity={0.4 + (i / rings.length) * 0.55} />
            ))}
          </g>
          <circle cx="300" cy="300" r="120" fill={`url(#${id("good")})`} />
          <circle cx="300" cy="300" r="34" fill="#fffaf0" filter={`url(#${id("soft")})`} />
        </g>

        {/* clinical reticle */}
        <g stroke="rgba(255,255,255,0.14)" strokeWidth="1">
          <line x1="300" y1="24" x2="300" y2="576" />
          <line x1="24" y1="300" x2="576" y2="300" />
        </g>
      </svg>
    </div>
  );
}
