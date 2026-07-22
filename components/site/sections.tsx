import Link from "next/link";
import Reveal from "./Reveal";
import Scan from "./Scan";
import Orb from "./Orb";

const UpArrow = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M12 19V5M5 12l7-7 7 7" stroke="var(--blue)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const Check = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: 2 }}>
    <path d="M20 6L9 17l-5-5" stroke="var(--blue)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const Cross = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: 2 }}>
    <path d="M18 6L6 18M6 6l12 12" stroke="#c6aeae" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

/* ══ 1 · THE UNMET NEED — editorial split, orb lands in the bento ══ */
export function NeedSection() {
  const stats = [
    { num: "1 in 17", desc: "Patients actually helped by standard AREDS vitamins" },
    { num: "25 yrs", desc: "Since the standard of care has meaningfully changed" },
    { num: "10M+", desc: "Americans currently living with macular degeneration" },
  ];
  return (
    <section id="about" className="section sec-soft">
      <div className="wide need-grid">
        <Reveal className="need-copy">
          <p className="eyebrow">The unmet need</p>
          <h2 className="h2">
            Standard care hasn&apos;t changed in 25 years.{" "}
            <span className="accent">Your vision deserves better.</span>
          </h2>
          <p className="lead">
            The AREDS vitamin protocol is a start — but it helps roughly 1 in 17 patients. No blood
            testing. No root-cause analysis. No personalization. While eye doctors are brilliant, they
            simply don&apos;t have time to practice the deep functional medicine that macular cells
            actually need to survive and recover.
          </p>
          <div className="cta-row">
            <Link href="/blueprint" className="btn btn-primary">Get the Free Guide →</Link>
            <Link href="/checkout" className="btn btn-ghost">Book a Consultation</Link>
          </div>
        </Reveal>

        <Reveal delay={120} className="need-bento">
          {stats.map((s) => (
            <div key={s.num} className="card stat-tile">
              <span className="stat-num">{s.num}</span>
              <p className="stat-desc">{s.desc}</p>
            </div>
          ))}
          {/* landing pad #2 — the first flicker of change */}
          <div className="stat-tile orb-pad" data-orb-slot data-heal="0.25">
            <Orb heal={0.25} className="orb-static" />
            <div className="pad-caption">
              <span className="stat-num accent"><UpArrow /> 48%</span>
              <p className="stat-desc">Our patients who showed measurable vision improvement</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ══ 2 · HOMING — six causes orbit the eye, orb lands center ══ */
export function HomingSection() {
  const pillars = [
    { l: "H", t: "Hormones", d: "DHEA declines with age and was directly linked to AMD in a 2007 study. We restore the hormones your macula depends on — based on your actual bloodwork, not guesswork." },
    { l: "O", t: "Oxidative Stress", d: "Uncontrolled oxidation is like rust on your retinal cells. We go far beyond basic antioxidants to neutralize the specific oxidative pathways active in your macula." },
    { l: "M", t: "Methylation", d: "Methylation controls gene expression at the cellular level. Disruptions in this pathway are a major — and widely overlooked — driver of retinal cell death." },
    { l: "I", t: "Inflammation", d: "Chronic low-grade inflammation silently destroys cells over decades. Taming it requires targeted nutritional correction, not a generic anti-inflammatory supplement." },
    { l: "N", t: "Nutrition", d: "As we age, we absorb nutrients less efficiently. We personalize nutritional support based on your blood markers — not a generic supplement stack that worked for someone else." },
    { l: "G", t: "Epigenetics", d: "Every intervention above turns on protective genes and turns off destructive ones. This is medicine at the cellular blueprint level — what makes our published results possible." },
  ];
  return (
    <section id="homing" className="section sec-white">
      <div className="wide">
        <Reveal className="sec-head">
          <p className="eyebrow center">The solution</p>
          <h2 className="h2">
            The HOMING Protocol — <span className="accent">six root causes, one unified attack</span>
          </h2>
          <p className="lead">
            After 15 years of research and a peer-reviewed published study of 365 eyes, we identified
            the six biological pillars that drive macular degeneration. Address all six and your cells
            can stabilize — and often recover.
          </p>
        </Reveal>

        <div className="homing-orbit">
          <div className="homing-col">
            {pillars.slice(0, 3).map((p, i) => (
              <Reveal key={p.l} delay={i * 90}>
                <article className="card pillar">
                  <span className="homing-badge">{p.l}</span>
                  <div>
                    <h3>{p.t}</h3>
                    <p>{p.d}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {/* landing pad #3 — halfway healed, ringed by its six causes */}
          <div className="homing-center orb-pad" data-orb-slot data-heal="0.55">
            <Orb heal={0.55} className="orb-static" />
          </div>

          <div className="homing-col">
            {pillars.slice(3).map((p, i) => (
              <Reveal key={p.l} delay={i * 90}>
                <article className="card pillar">
                  <span className="homing-badge">{p.l}</span>
                  <div>
                    <h3>{p.t}</h3>
                    <p>{p.d}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══ 3 · RESULTS — the payoff: orb arrives fully healed ══ */
export function ResultsSection() {
  const left = [
    { num: "48%", desc: "of patients showed measurable vision improvement", up: true },
    { num: "95%", desc: "of patients achieved stable or improving vision", up: true },
  ];
  const right = [
    { num: "365", desc: "eyes studied in our published clinical research" },
    { num: "15+", desc: "years developing and validating the HOMING Protocol" },
  ];
  const scans = [
    "Dramatic retinal smoothing documented over 2 years (2021–2023)",
    "Follow-up #7 (Dec 2023): improvement that shocked her ophthalmologist",
    "The case that started it all: 9-month improvement (Sept 2014 – Aug 2015)",
    "4–5 weeks in: ophthalmologist said scans looked like two different patients",
  ];
  return (
    <section id="results" className="section sec-soft">
      <div className="wide">
        <Reveal className="sec-head">
          <p className="eyebrow center">Published clinical research</p>
          <h2 className="h2">
            365 eyes. Peer-reviewed. <span className="accent">Results that speak for themselves.</span>
          </h2>
          <p className="lead">
            The HOMING Protocol is published, peer-reviewed clinical science — conducted at Duke Eye
            Center and documented in ophthalmology literature.
          </p>
        </Reveal>

        <div className="results-stage">
          <div className="results-col">
            {left.map((s) => (
              <Reveal key={s.num}>
                <div className="card stat-tile">
                  <span className="stat-num accent">{s.up && <UpArrow />} {s.num}</span>
                  <p className="stat-desc">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* landing pad #4 — fully healed. The promise, kept. */}
          <div className="results-center orb-pad" data-orb-slot data-heal="1">
            <Orb heal={1} className="orb-static" />
            <p className="pad-note">Restored macular profile — as documented on OCT</p>
          </div>

          <div className="results-col">
            {right.map((s) => (
              <Reveal key={s.num}>
                <div className="card stat-tile">
                  <span className="stat-num">{s.num}</span>
                  <p className="stat-desc">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="sec-head" style={{ marginTop: "clamp(3rem, 6vw, 5rem)" }}>
          <p className="eyebrow center">Documented OCT scan improvements</p>
          <h3 className="h3">Real patients. Real scans. Real improvement.</h3>
        </Reveal>
        <div className="oct-row">
          {scans.map((caption, i) => (
            <Reveal key={i} delay={(i % 4) * 80}>
              <figure className="card oct-card">
                <div className="oct-visual">
                  <Scan size={110} healed />
                  <span className="oct-tag">OCT · {i + 1}</span>
                </div>
                <figcaption>{caption}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══ 4 · TESTIMONIALS — dark band ══ */
export function TestimonialsSection() {
  const items = [
    { quote: "My ophthalmologist was astonished. He said he had never seen this kind of improvement in his entire career. I maintained 20/20 vision and significantly reduced wavy lines.", name: "Patient", cond: "Dry AMD — Both Eyes" },
    { quote: "I was having almost a fishbowl effect out of my right eye. Within three months, the distortion was easing greatly. Within six months it was completely gone and my eyesight was crystal clear.", name: "Patty", cond: "Wet AMD — Featured on Cleveland News" },
    { quote: "I had been getting shots every eight weeks. After the program, my retina doctor started saying the fluid was reducing. The interval between injections got longer. It changed everything.", name: "Patient", cond: "Wet AMD — Injection Support" },
    { quote: "My doctor had told me there was nothing more to do. Then I found Dr. Rozakis. My scans improved over 2 years in ways my ophthalmologist had never seen before.", name: "Patient", cond: "Dry AMD — 2-Year Follow-up" },
  ];
  return (
    <section className="section sec-dark">
      <div className="wide">
        <Reveal className="sec-head">
          <p className="eyebrow eyebrow-light center">Patient stories</p>
          <h2 className="h2 h2-light">
            Patients told <span className="accent-light">&ldquo;there&apos;s nothing more to do.&rdquo;</span>
          </h2>
        </Reveal>
        <div className="quote-grid">
          {items.map((t, i) => (
            <Reveal key={i} delay={(i % 2) * 100}>
              <blockquote className="quote-card">
                <div className="quote-mark">&ldquo;</div>
                <div className="stars" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <svg key={s} width="16" height="16" viewBox="0 0 24 24" fill="var(--blue)" aria-hidden="true">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="quote-text">{t.quote}</p>
                <footer>
                  <div className="quote-name">{t.name}</div>
                  <div className="quote-cond">{t.cond}</div>
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══ 5 · DR. ROZAKIS ══ */
export function DoctorSection() {
  const badges = ["Duke Eye Center", "LASIK Innovator", "AMD Researcher", "Peer-Reviewed Author"];
  return (
    <section className="section sec-white">
      <div className="wide doctor-grid">
        <Reveal className="doctor-photo-wrap">
          <div className="doctor-photo">
            {/* Swap for a real portrait: /public/dr-rozakis.jpg as background */}
            <span className="doctor-monogram">GR</span>
            <Scan size={140} healed className="doctor-scan" />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <p className="eyebrow">Your doctor</p>
          <h2 className="h2">Dr. George Rozakis, MD</h2>
          <p className="doctor-role">Ophthalmologist · Biomedical Engineer · Duke Eye Center</p>
          <div className="pill-row">
            {badges.map((b) => <span key={b} className="pill">{b}</span>)}
          </div>
          <p className="lead">
            Dr. Rozakis trained at the Duke Eye Center and is also a biomedical engineer — a rare
            combination that lets him understand both the surgical and cellular science of vision.
            He pioneered LASIK surgery, winning an International Innovation Award in 1998, then
            turned that same drive toward macular degeneration in 2009.
          </p>
          <p className="lead">
            He developed the HOMING Protocol alongside Dr. Brian Bakke (PhD, Biochemistry; MS,
            Nutrition — whose master&apos;s thesis focused on macular degeneration) and Dr. Scott
            Sedlacek (OD). Their published research is the first peer-reviewed clinical evidence
            that functional medicine can produce measurable AMD improvement.
          </p>
          <div className="cta-row">
            <Link href="/blueprint" className="btn btn-primary">Get the Free Guide →</Link>
            <Link href="/checkout" className="btn btn-ghost">Book a Call</Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ══ 6 · VS COMPARISON ══ */
export function CompareSection() {
  const standard = [
    "AREDS vitamins — same for every patient",
    "No blood testing for root causes",
    "Check-ups every 6–12 months",
    "Eye injections when wet AMD develops",
    "“There’s nothing more we can do”",
    "Progressive vision loss accepted as inevitable",
  ];
  const program = [
    "Personalized protocol based on your bloodwork",
    "Blood testing reveals root causes: hormones, methylation, oxidation",
    "Active monitoring and protocol adjustments",
    "48% of patients show measurable improvement",
    "Reduced injection frequency in wet AMD patients",
    "Stable or improving vision — documented on OCT scans",
  ];
  return (
    <section className="section sec-soft">
      <div className="wide narrow">
        <Reveal className="sec-head">
          <p className="eyebrow center">The difference</p>
          <h2 className="h2">Standard care vs. The Macular Program™</h2>
          <p className="lead">
            Same diagnosis. Completely different outcome. Here&apos;s what changes when you treat the root cause.
          </p>
        </Reveal>
        <div className="compare-grid">
          <Reveal>
            <div className="card compare-card">
              <div className="compare-head">
                <span className="dot dot-gray" />
                <h3>Standard Eye Care</h3>
              </div>
              {standard.map((t) => (
                <div key={t} className="compare-row"><Cross /><p>{t}</p></div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="card compare-card compare-card-blue">
              <div className="compare-head">
                <span className="dot dot-blue" />
                <h3 className="accent">Macular Program™</h3>
              </div>
              {program.map((t) => (
                <div key={t} className="compare-row compare-row-ink"><Check /><p>{t}</p></div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ══ 7 · GUIDE SELECTOR ══ */
export function GuideSection() {
  const cards = [
    { n: "01", t: "Family History", s: "Prevention before diagnosis — reduce your risk now", href: "/blueprint?type=family_history" },
    { n: "02", t: "Drusen Found", s: "Recently told you have drusen or early AMD changes", href: "/blueprint?type=drusen_early" },
    { n: "03", t: "Dry AMD — Both Eyes", s: "Managing dry AMD and want to slow or reverse it", href: "/blueprint?type=dry_both_eyes" },
    { n: "04", t: "Dry + Wet Combination", s: "One eye dry, one eye wet — the highest-risk situation", href: "/blueprint?type=dry_one_wet_other" },
    { n: "05", t: "Wet AMD — Both Eyes", s: "Currently receiving injections and want fewer of them", href: "/blueprint?type=wet_both_eyes" },
    { n: "06", t: "Eye Care Professional", s: "A clinician who wants to offer patients a better path forward", href: "/blueprint?type=eye_care_professional" },
  ];
  return (
    <section className="section sec-white">
      <div className="wide">
        <Reveal className="sec-head">
          <p className="eyebrow center">Free — personalized for your situation</p>
          <h2 className="h2">We have a guide for exactly where you are</h2>
          <p className="lead">
            Choose the guide that matches your situation. We&apos;ll email it immediately — free. No spam, no pressure.
          </p>
        </Reveal>
        <div className="guide-grid">
          {cards.map((c, i) => (
            <Reveal key={c.n} delay={(i % 3) * 90}>
              <Link href={c.href} className="card guide-card">
                <span className="guide-num">{c.n}</span>
                <h3>{c.t}</h3>
                <p>{c.s}</p>
                <span className="guide-go">Get Free Guide →</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══ 8 · FINAL CTA — the orb re-emerges, healed, as the emblem ══ */
export function FinalCTA() {
  return (
    <section className="section sec-dark final-cta">
      <div className="final-orb-glow" aria-hidden="true" />
      <div className="wide final-inner">
        {/* landing pad #5 — re-emergence, gold */}
        <div className="final-orb-slot orb-pad" data-orb-slot data-heal="1" data-orb-gap="far">
          <Orb heal={1} className="orb-static" />
        </div>
        <Reveal className="final-copy">
          <p className="eyebrow eyebrow-light center">Your next step</p>
          <h2 className="final-head">
            Start with the free guide.{" "}
            <span className="accent-light">Your vision is worth the next 5 minutes.</span>
          </h2>
          <p className="final-sub">
            Download the guide specific to your situation — and discover what 15 years of clinical
            research has proven is possible for macular degeneration patients.
          </p>
          <div className="cta-row center">
            <Link href="/blueprint" className="btn btn-primary btn-glow">Get My Free Vision Guide →</Link>
            <Link href="/checkout" className="btn btn-light">Book a Consultation</Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
