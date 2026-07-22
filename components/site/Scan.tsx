/** Concentric-ring retina motif — echoes the hero object across the page. */
export default function Scan({
  size = 120,
  healed = false,
  className = "",
}: {
  size?: number;
  healed?: boolean;
  className?: string;
}) {
  const rings = Array.from({ length: 7 }, (_, i) => 8 + i * 8);
  const stroke = healed ? "rgba(41,171,226,0.85)" : "rgba(41,171,226,0.4)";
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" className={className} aria-hidden="true">
      {rings.map((r, i) => (
        <circle
          key={r}
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke={stroke}
          strokeWidth="1.3"
          opacity={healed ? 0.35 + (i / rings.length) * 0.6 : 0.5}
        />
      ))}
      <circle cx="60" cy="60" r="5" fill={healed ? "var(--gold)" : "var(--blue)"} />
    </svg>
  );
}
