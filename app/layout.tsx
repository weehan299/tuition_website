import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
import { site } from "@/content/site";
import "./globals.css";

// Display serif — characterful, used with restraint on headlines.
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});
// Body / UI.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
// Utility face for exam-data labels, grades, and the rate.
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-plex-mono",
  display: "swap",
});

const description =
  "Diagnostic-led 1-to-1 math coaching for secondary students in Singapore. We find the exact reason a grade is stuck — and fix it.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.brandName} — Diagnostic-led 1-to-1 Math Coaching`,
    template: `%s · ${site.brandName}`,
  },
  description,
  applicationName: site.brandName,
  keywords: [
    "1-to-1 math tuition",
    "secondary math tuition Singapore",
    "O-Level math coaching",
    "A Math tutor",
    "private math tuition",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_SG",
    url: site.url,
    siteName: site.brandName,
    title: `${site.brandName} — Diagnostic-led 1-to-1 Math Coaching`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.brandName} — Diagnostic-led 1-to-1 Math Coaching`,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#fbf9f3",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const analyticsDomain = process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: site.brandName,
    url: site.url,
    telephone: site.phoneE164,
    email: site.email,
    areaServed: "Singapore",
    description:
      "Diagnostic-led 1-to-1 math coaching for secondary students.",
    sameAs: Object.values(site.socials).filter(Boolean),
  };

  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${plexMono.variable}`}
    >
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-green focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {analyticsDomain ? (
          <Script
            defer
            data-domain={analyticsDomain}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        ) : null}
      </body>
    </html>
  );
}
