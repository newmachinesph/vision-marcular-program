# Macular Program marketing site

A single-page marketing site for Macular Program, a functional-medicine program for macular degeneration led by Dr. George Rozakis. It tells the story of the HOMING Protocol through a scroll-driven page: hero, a "tunnel" sequence, everyday-life scenes, patient stories, OCT scan comparisons, the doctor, and calls to action. It was built by New Machines as a front-end build for the client.

Stack: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, GSAP (ScrollTrigger) and Motion.

## What is in it

| Path | Contents |
|------|----------|
| `app/layout.tsx` | Site metadata, Open Graph and Twitter tags, `MedicalOrganization` JSON-LD |
| `app/page.tsx` | The home page, composed from the section components |
| `app/globals.css` | All styling and design tokens (CSS variables) |
| `components/site/` | `Nav`, `Hero`, `Spark`, `Orb`, `Scan`, `Reveal`, `Footer`, `journey.tsx` (tunnel, life scenes, reels), `sections.tsx` (need, HOMING, results, testimonials, doctor, compare, guide, final CTA) |
| `public/` | WebP and PNG imagery for the hero, life scenes and OCT strip |

## How it works

- The hero and the journey scenes are pinned sections animated with GSAP ScrollTrigger. `Spark` is a light that travels the page as you scroll.
- Motion is gated on `prefers-reduced-motion` and a desktop media query in `Spark`.
- Content (copy, quotes, statistics) is hard-coded in the components. There is no CMS and no backend.
- The call-to-action buttons link to `/blueprint` and `/checkout`. Those routes are not implemented in this repository, so those links 404 until they are added.
- The doctor portrait is an SVG placeholder (see `components/site/sections.tsx`).

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
```

`AGENTS.md` notes that this Next.js version has breaking changes and points at the docs shipped in `node_modules/next/dist/docs/`.

## Checks

```bash
npm run lint     # ESLint (eslint-config-next)
npm run build    # production build
```

There is no test suite.

## Deployment

A standard Next.js app with no required environment variables. `app/layout.tsx` sets `SITE_URL` to `https://macularprogram.com` for canonical and Open Graph URLs and references `/og-image.png`, which is not in `public/`. Deploy with `npm run build && npm start`, or on any Next.js host such as Vercel.

## Content notice

The copy, statistics, testimonials and imagery belong to the client (Macular Program) and are included to show the build. They are not medical advice.

## License

MIT. See [LICENSE](LICENSE).
