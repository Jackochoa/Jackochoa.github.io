import Link from "next/link";
import { getCopy, getLocalizedPath, type Locale } from "@/lib/content";
import { linkedinPath } from "@/lib/icons";
import { site } from "@/lib/site";
import { LanguageSwitcher } from "./language-switcher";

type SiteHeaderProps = { locale: Locale; currentPath: string };

export function SiteHeader({ locale, currentPath }: SiteHeaderProps) {
  const copy = getCopy(locale);
  return (
    <header className="site-header">
      <div className="shell site-header__inner">
        <Link className="wordmark" href={getLocalizedPath(locale, "/")} aria-label={`${site.name} — home`}>
          <span className="wordmark__mark">J<span>O</span></span>
          <span className="wordmark__name">Jackson Ochoa</span>
        </Link>
        <nav className="site-nav" aria-label={locale === "es" ? "Navegación principal" : "Primary navigation"}>
          <Link href={getLocalizedPath(locale, locale === "es" ? "/work/" : "/work/")}>{copy.nav.work}</Link>
          <Link href={getLocalizedPath(locale, "/about/")}>{copy.nav.about}</Link>
          <Link href={getLocalizedPath(locale, "/process/")}>{copy.nav.process}</Link>
          <Link className="site-nav__cta" href={getLocalizedPath(locale, "/contact/")} data-umami-event="contact_open">{copy.nav.contact}<span aria-hidden="true">→</span></Link>
        </nav>
        <a className="site-header__social" href={site.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" data-umami-event="linkedin_click">
          <svg viewBox="0 0 16 16" aria-hidden="true"><path d={linkedinPath} /></svg>
        </a>
        <LanguageSwitcher locale={locale} currentPath={currentPath} />
      </div>
    </header>
  );
}
