import type { Metadata, Viewport } from "next";
import type { Locale } from "./content";

export const site = {
  name: "Jackson Ochoa",
  domain: "https://jacksonochoa.page",
  email: "jackson@briquette.cc",
  description: "Jackson Ochoa designs and builds useful web products for complex ideas and operations.",
  linkedin: "https://www.linkedin.com/in/jackson-paul-ochoa-holguin-259716256",
  github: "https://github.com/Jackochoa",
};

export const siteBrandMetadata = {
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml", media: "(prefers-color-scheme: light)" },
      { url: "/favicon-dark.svg", type: "image/svg+xml", media: "(prefers-color-scheme: dark)" },
    ],
    shortcut: { url: "/favicon.ico", type: "image/x-icon", media: "(prefers-color-scheme: no-preference)" },
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png", media: "(prefers-color-scheme: light)" },
      { url: "/apple-touch-icon-dark.png", sizes: "180x180", type: "image/png", media: "(prefers-color-scheme: dark)" },
    ],
  },
  manifest: "/site.webmanifest",
} satisfies Pick<Metadata, "icons" | "manifest">;

export const siteViewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#B55239" },
    { media: "(prefers-color-scheme: dark)", color: "#181716" },
  ],
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
        "x-default": `${site.domain}${spanishPath}`,
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
