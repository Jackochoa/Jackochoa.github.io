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

type PageMetadataInput = {
  locale: Locale;
  title: string;
  description: string;
  englishPath: string;
  spanishPath: string;
};

export function pageMetadata({ locale, title, description, englishPath, spanishPath }: PageMetadataInput): Metadata {
  const canonicalPath = locale === "en" ? englishPath : spanishPath;
  const canonical = `${site.domain}${canonicalPath}`;
  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: `${site.domain}${englishPath}`,
        es: `${site.domain}${spanishPath}`,
        "x-default": `${site.domain}${englishPath}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: site.name,
      type: "website",
      locale: locale === "en" ? "en_US" : "es_ES",
      alternateLocale: locale === "en" ? ["es_ES"] : ["en_US"],
    },
  };
}
