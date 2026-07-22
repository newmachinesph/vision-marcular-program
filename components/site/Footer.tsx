import Link from "next/link";
import Scan from "./Scan";

const COLUMNS: { head: string; links: [string, string][] }[] = [
  {
    head: "Program",
    links: [
      ["Free Vision Guide", "/blueprint"],
      ["About Dr. Rozakis", "/#about"],
      ["Patient Results", "/#results"],
      ["The HOMING Protocol", "/#homing"],
    ],
  },
  {
    head: "Resources",
    links: [
      ["Blog", "/blog"],
      ["Published Research", "/blog#research"],
      ["For Eye Doctors", "/blueprint?type=eye_care_professional"],
      ["Book a Consultation", "/checkout"],
    ],
  },
  {
    head: "Legal",
    links: [
      ["Privacy Policy", "/privacy"],
      ["Terms of Use", "/terms"],
      ["Medical Disclaimer", "/disclaimer"],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      {/* "Let's work together" style call-to-action */}
      <div className="container footer-cta">
        <Scan size={150} healed className="footer-cta-scan" />
        <Link href="/blueprint" className="footer-cta-link">
          Let&apos;s protect your<br />vision together
          <span className="footer-cta-arrow" aria-hidden="true">→</span>
        </Link>
      </div>

      <div className="container footer-grid">
        <div>
          <span className="nav-logo" style={{ color: "#eff4f1" }}>
            <svg width="30" height="22" viewBox="0 0 32 22" fill="none" aria-hidden="true">
              <path d="M1 11C1 11 7 2 16 2C25 2 31 11 31 11C31 11 25 20 16 20C7 20 1 11 1 11Z" stroke="var(--blue)" strokeWidth="2" fill="none" />
              <circle cx="16" cy="11" r="4" fill="var(--blue)" />
              <circle cx="16" cy="11" r="2" fill="#061018" />
            </svg>
            <span>Macular<span style={{ color: "var(--blue)" }}>Program</span>™</span>
          </span>
          <p style={{ color: "#c2d0d6", fontSize: "0.95rem", lineHeight: 1.7, maxWidth: 240, marginTop: "1rem" }}>
            A functional medicine approach to macular degeneration, backed by peer-reviewed research.
          </p>
          <div className="flex gap-3 mt-6">
            <a href="https://www.youtube.com/@macularprogram" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="footer-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.6 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.3.5 9.3.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.75 15.5v-7l6.5 3.5-6.5 3.5z" /></svg>
            </a>
            <a href="https://www.linkedin.com/in/george-rozakis-md-93a63167/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="footer-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.3zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" /></svg>
            </a>
          </div>
        </div>

        {COLUMNS.map((col) => (
          <nav key={col.head} aria-label={col.head}>
            <p className="footer-col-head">{col.head}</p>
            {col.links.map(([l, h]) => (
              <Link key={l} href={h} className="footer-link">{l}</Link>
            ))}
          </nav>
        ))}
      </div>

      <div className="container footer-legal">
        <p>© 2026 Macular Program™. All rights reserved.</p>
        <p style={{ maxWidth: 600 }}>
          This website is for informational purposes only and does not constitute medical advice.
          Always consult your ophthalmologist or retina specialist.
        </p>
      </div>
    </footer>
  );
}
