import Link from "next/link";
import { getCopy, getLocalizedPath, type Locale } from "@/lib/content";
import { site } from "@/lib/site";

export function SiteFooter({ locale }: { locale: Locale }) {
  const copy = getCopy(locale);
  return (
    <footer className="site-footer">
      <div className="shell site-footer__grid">
        <div>
          <div className="footer-signature"><span>JO</span><i aria-hidden="true" /></div>
          <p className="footer-note">{locale === "es" ? "Productos web con criterio, cuidado y seguimiento." : "Web products with clarity, care, and follow-through."}</p>
        </div>
        <div className="footer-links">
          <Link href={getLocalizedPath(locale, "/work/")}>{copy.nav.work}</Link>
          <Link href={getLocalizedPath(locale, "/about/")}>{copy.nav.about}</Link>
          <Link href={getLocalizedPath(locale, "/contact/")} data-umami-event="contact_open">{copy.nav.contact}</Link>
          <Link href={getLocalizedPath(locale, "/privacy/")}>{locale === "es" ? "Privacidad" : "Privacy"}</Link>
          <a href={`mailto:${site.email}`} data-umami-event="email_click">{site.email}</a>
        </div>
        <div className="footer-meta"><span>© {new Date().getFullYear()} {site.name}</span><span>{locale === "es" ? "Hecho con intención." : "Made with intention."}</span></div>
      </div>
    </footer>
  );
}
