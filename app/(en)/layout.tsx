import type { Metadata } from "next";
import Script from "next/script";
import "../globals.css";
import { mono, sans } from "../fonts";
import { siteBrandMetadata, siteViewport } from "@/lib/site";

export const viewport = siteViewport;

export const metadata: Metadata = {
  ...siteBrandMetadata,
  metadataBase: new URL("https://jacksonochoa.page"),
  title: { default: "Jackson Ochoa — web products with clarity", template: "%s · Jackson Ochoa" },
  description: "Jackson Ochoa designs and builds useful web products for complex ideas and operations.",
  authors: [{ name: "Jackson Ochoa" }],
  creator: "Jackson Ochoa",
  alternates: { canonical: "https://jacksonochoa.page/en/", languages: { en: "https://jacksonochoa.page/en/", es: "https://jacksonochoa.page/", "x-default": "https://jacksonochoa.page/" } },
  openGraph: { type: "website", siteName: "Jackson Ochoa", title: "Jackson Ochoa — web products with clarity", description: "End-to-end web products for complex ideas and operations.", url: "https://jacksonochoa.page/en/" },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Person", name: "Jackson Ochoa", url: "https://jacksonochoa.page/en/", jobTitle: "Medicine student and independent product engineer" },
    { "@type": "WebSite", name: "Jackson Ochoa", url: "https://jacksonochoa.page/en/", description: "End-to-end web products for complex ideas and operations." },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const umamiId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  const umamiScript = process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL;
  return <html lang="en"><body className={`${sans.variable} ${mono.variable}`}><a className="skip-link" href="#main-content">Skip to content</a>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />{umamiId && umamiScript ? <Script src={umamiScript} data-website-id={umamiId} strategy="afterInteractive" /> : null}</body></html>;
}
