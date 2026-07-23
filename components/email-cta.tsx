import { mailto, site } from "@/lib/site";
import type { Locale } from "@/lib/content";

export function EmailCta({ locale, label, className = "" }: { locale: Locale; label: string; className?: string }) {
  return <a className={`button button--primary ${className}`} href={mailto(locale)} data-umami-event="email_click">{label}<span aria-hidden="true">↗</span><span className="sr-only"> — {site.email}</span></a>;
}
