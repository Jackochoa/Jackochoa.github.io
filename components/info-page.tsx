import Image from "next/image";
import { getCopy, getLocalizedPath, type Locale } from "@/lib/content";
import { PageShell } from "./page-shell";
import { SectionHeading } from "./section-heading";

export function AboutPage({ locale }: { locale: Locale }) {
  const copy = getCopy(locale).about;
  return <PageShell locale={locale} currentPath={getLocalizedPath(locale, "/about/")}>
    <section className="page-hero"><div className="shell"><p className="eyebrow"><span aria-hidden="true">✳</span>{copy.kicker}</p><h1>{copy.title}</h1><p className="page-hero__intro">{copy.intro}</p></div></section>
    <section className="section"><div className="shell about-band"><div className="about-portrait"><Image src="/images/portrait.webp" alt={copy.portrait} width={1000} height={1000} priority /></div><div className="about-band__body"><p>{copy.body}</p><div className="principles">{copy.principles.map(([title, body]) => <article className="principle" key={title}><h2>{title}</h2><p>{body}</p></article>)}</div></div></div></section>
  </PageShell>;
}

export function ProcessPage({ locale }: { locale: Locale }) {
  const copy = getCopy(locale).process;
  return <PageShell locale={locale} currentPath={getLocalizedPath(locale, "/process/")}>
    <section className="page-hero"><div className="shell"><p className="eyebrow"><span aria-hidden="true">✳</span>{copy.kicker}</p><h1>{copy.title}</h1><p className="page-hero__intro">{copy.intro}</p></div></section>
    <section className="section"><div className="shell"><div className="phase-list">{copy.phases.map(([title, body], index) => <article className="phase" key={title}><span className="phase__number">0{index + 1}</span><h2>{title}</h2><p>{body}</p></article>)}</div><div className="section-heading" style={{ marginTop: "5rem" }}><SectionHeading kicker={locale === "es" ? "El criterio" : "The standard"} title={copy.close} /></div></div></section>
  </PageShell>;
}

export function PrivacyPage({ locale }: { locale: Locale }) {
  const copy = getCopy(locale).privacy;
  return <PageShell locale={locale} currentPath={getLocalizedPath(locale, "/privacy/")}>
    <section className="page-hero"><div className="shell"><p className="eyebrow"><span aria-hidden="true">✳</span>{copy.kicker}</p><h1>{copy.title}</h1><p className="page-hero__intro">{copy.intro}</p></div></section>
    <section className="section"><div className="shell"><ul className="prose-list">{copy.points.map((point) => <li key={point}>{point}</li>)}</ul><p className="page-hero__intro">{copy.updated}</p></div></section>
  </PageShell>;
}
