import Link from "next/link";
import { getLocalizedPath, type Locale } from "@/lib/content";

/* Was a mailto: link. That hands the visitor off to whatever mail client the
 * device has configured — frequently none on mobile — right at the moment they
 * decided to get in touch. The contact page keeps them here, and still offers
 * email and WhatsApp for anyone who prefers them. */
export function ContactCta({ locale, label, className = "" }: { locale: Locale; label: string; className?: string }) {
  return <Link className={`button button--primary ${className}`} href={getLocalizedPath(locale, "/contact/")} data-umami-event="contact_open">{label}<span aria-hidden="true">→</span></Link>;
}
