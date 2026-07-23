import type { Metadata } from "next";
import type { Locale } from "./content";

export const site = {
  name: "Jackson Ochoa",
  domain: "https://jacksonochoa.page",
  email: "jacksonochoa135@outlook.com",
  description: "Jackson Ochoa designs and builds useful web products for complex ideas and operations.",
};

export function mailto(locale: Locale) {
  const subject = locale === "es" ? "Conversación sobre un producto web" : "A conversation about a web product";
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;
}

export function pageMetadata(locale: Locale, title: string, description: string, path: string): Metadata {
  const canonical = `${site.domain}${path}`;
  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: `${site.domain}${path}`,
        es: `${site.domain}${path === "/" ? "/es/" : `/es${path}`}`,
      },
    },
    openGraph: { title, description, url: canonical, siteName: site.name, type: "website" },
  };
}
