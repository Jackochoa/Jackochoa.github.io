import type { Metadata } from "next";
import "../globals.css";
import { mono, sans } from "../fonts";
import { siteBrandMetadata, siteViewport } from "@/lib/site";

export const viewport = siteViewport;

export const metadata: Metadata = { ...siteBrandMetadata, robots: { index: false, follow: true } };
export default function LegacyLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${sans.variable} ${mono.variable}`}>{children}</body></html>;
}
