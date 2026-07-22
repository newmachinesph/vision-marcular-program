import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const SITE_URL = "https://macularprogram.com";
const SITE_NAME = "Macular Program™";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Macular Program™ — Your Macula Can Heal. The Science Proves It.",
    template: "%s | Macular Program™",
  },
  description:
    "Dr. George Rozakis and the Macular Program™ team have helped hundreds of patients stabilize and improve their vision using the HOMING Protocol — a comprehensive functional medicine approach to macular degeneration. 48% of patients showed measurable improvement.",
  keywords:
    "macular degeneration, AMD treatment, dry macular degeneration, wet macular degeneration, HOMING protocol, functional medicine eye care, vision improvement",
  authors: [{ name: "Dr. George Rozakis, MD" }],
  creator: "Dr. George Rozakis, MD",
  publisher: SITE_NAME,
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Macular Program™ — Your Macula Can Heal. The Science Proves It.",
    description:
      "A comprehensive functional medicine approach to macular degeneration. 48% of patients showed measurable improvement.",
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Macular Program™" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@macularprogram",
    title: "Macular Program™ — Your Macula Can Heal. The Science Proves It.",
    description:
      "A comprehensive functional medicine approach to macular degeneration. 48% of patients showed measurable improvement.",
    images: [OG_IMAGE],
  },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon.ico` },
  description:
    "Macular Program™ offers the HOMING Protocol — a comprehensive functional medicine approach to macular degeneration developed by Dr. George Rozakis, MD.",
  founder: {
    "@type": "Person",
    name: "Dr. George Rozakis, MD",
    jobTitle: "Ophthalmologist & Biomedical Engineer",
  },
  medicalSpecialty: "Ophthalmology",
  availableService: {
    "@type": "MedicalTherapy",
    name: "HOMING Protocol",
    description:
      "Six-root-cause approach to stabilizing and improving macular degeneration",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
