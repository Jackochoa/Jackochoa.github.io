import type { Metadata } from "next";
import Script from "next/script";
import "../globals.css";
import { geologica, martianMono } from "../fonts";

export const metadata: Metadata = {
  metadataBase: new URL("https://jacksonochoa.page"),
  title: { default: "Jackson Ochoa — productos web con criterio", template: "%s · Jackson Ochoa" },
  description: "Jackson Ochoa diseña y construye productos web útiles para ideas y operaciones complejas.",
  authors: [{ name: "Jackson Ochoa" }],
  creator: "Jackson Ochoa",
  alternates: { canonical: "https://jacksonochoa.page/es/", languages: { en: "https://jacksonochoa.page/", es: "https://jacksonochoa.page/es/" } },
  openGraph: { type: "website", siteName: "Jackson Ochoa", title: "Jackson Ochoa — productos web con criterio", description: "Productos web de punta a punta para ideas y operaciones complejas.", url: "https://jacksonochoa.page/es/" },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Person", name: "Jackson Ochoa", url: "https://jacksonochoa.page/es/", jobTitle: "Ingeniero de producto independiente", knowsLanguage: ["es", "en"] },
    { "@type": "WebSite", name: "Jackson Ochoa", url: "https://jacksonochoa.page/es/", description: "Productos web de punta a punta para ideas y operaciones complejas." },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const umamiId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  const umamiScript = process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL;
  return <html lang="es"><body className={`${geologica.variable} ${martianMono.variable}`}><a className="skip-link" href="#main-content">Ir al contenido</a>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />{umamiId && umamiScript ? <Script src={umamiScript} data-website-id={umamiId} strategy="afterInteractive" /> : null}</body></html>;
}
