import type { ReactNode } from "react";
import type { Locale } from "@/lib/content";
import { buildBasePairs } from "@/lib/helix";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { TechHelix } from "./tech-helix";

export function PageShell({ locale, currentPath, children }: { locale: Locale; currentPath: string; children: ReactNode }) {
  return <>
    <TechHelix basePairs={buildBasePairs()} />
    <SiteHeader locale={locale} currentPath={currentPath} />
    <main lang={locale} id="main-content">{children}</main>
    <SiteFooter locale={locale} />
  </>;
}
