"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const LINKS: [string, string][] = [
  ["About", "/#about"],
  ["Protocol", "/#homing"],
  ["Results", "/#results"],
  ["For Doctors", "/blueprint?type=eye_care_professional"],
];

function Logo({ light }: { light?: boolean }) {
  return (
    <span className="nav-logo" style={{ color: light ? "#fff" : "var(--ink)" }}>
      <svg width="34" height="24" viewBox="0 0 32 22" fill="none" aria-hidden="true">
        <path d="M1 11C1 11 7 2 16 2C25 2 31 11 31 11C31 11 25 20 16 20C7 20 1 11 1 11Z" stroke="var(--blue)" strokeWidth="2" fill="none" />
        <circle cx="16" cy="11" r="4" fill="var(--blue)" />
        <circle cx="16" cy="11" r="2" fill={light ? "#061018" : "#fff"} />
      </svg>
      <span>Macular<span style={{ color: "var(--blue)" }}>Program</span>™</span>
    </span>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`nav ${solid ? "nav-solid" : "nav-over"}`} aria-label="Main navigation">
      <div className="nav-inner">
        <Link href="/" aria-label="Macular Program home">
          <Logo light={!solid} />
        </Link>

        <div className="nav-links">
          {LINKS.map(([label, href]) => (
            <Link key={label} href={href} className="nav-link">{label}</Link>
          ))}
          <Link href="/blueprint" className="btn btn-primary nav-cta">Free Guide</Link>
        </div>

        <button
          className="nav-burger"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <svg width="26" height="20" viewBox="0 0 26 20" fill="none" aria-hidden="true">
            <rect y="0" width="26" height="2.6" rx="1.3" fill="currentColor" />
            <rect y="8.7" width="20" height="2.6" rx="1.3" fill="currentColor" />
            <rect y="17.4" width="26" height="2.6" rx="1.3" fill="currentColor" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="nav-drawer">
          {LINKS.map(([label, href]) => (
            <Link key={label} href={href} className="nav-drawer-link" onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
          <Link href="/blueprint" className="btn btn-primary" onClick={() => setOpen(false)} style={{ marginTop: "0.75rem", justifyContent: "center" }}>
            Get the Free Guide →
          </Link>
        </div>
      )}
    </nav>
  );
}
