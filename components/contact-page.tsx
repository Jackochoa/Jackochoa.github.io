import { getCopy, getLocalizedPath, type Locale } from "@/lib/content";
import { ContactForm } from "./contact-form";
import { PageShell } from "./page-shell";

/* The form is styled for a dark surface — its labels use --text-invert and its
 * inputs have light borders — so it goes in the same .contact-panel the home and
 * case pages already use. It carries its own email and WhatsApp fallbacks next
 * to the submit button, which is also what shows if the endpoint is unset. */
export function ContactPage({ locale }: { locale: Locale }) {
  const copy = getCopy(locale).contact;
  return <PageShell locale={locale} currentPath={getLocalizedPath(locale, "/contact/")}>
    <section className="page-hero"><div className="shell"><p className="eyebrow"><span aria-hidden="true">✳</span>{copy.kicker}</p><h1>{copy.title}</h1><p className="page-hero__intro">{copy.intro}</p></div></section>
    <section className="section"><div className="shell"><div className="contact-panel contact-panel--form"><ContactForm locale={locale} /></div></div></section>
  </PageShell>;
}
