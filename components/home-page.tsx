import Link from "next/link";
import { getCopy, getLocalizedPath, getProjects, type Locale } from "@/lib/content";
import { EmailCta } from "./email-cta";
import { OrganicMark } from "./organic-mark";
import { PageShell } from "./page-shell";
import { ProjectCard } from "./project-card";
import { SectionHeading } from "./section-heading";

export function HomePage({ locale }: { locale: Locale }) {
  const copy = getCopy(locale);
  const projects = getProjects(locale);
  return <PageShell locale={locale} currentPath={locale === "en" ? "/" : "/es/"}>
    <section className="hero">
      <div className="shell hero__grid">
        <div className="hero__copy reveal">
          <p className="eyebrow"><span aria-hidden="true">✳</span>{copy.home.kicker}</p>
          <h1>{copy.home.title}</h1>
          <p className="hero__intro">{copy.home.intro}</p>
          <div className="hero__actions"><EmailCta locale={locale} label={copy.home.primary} /><Link className="button button--ghost" href={getLocalizedPath(locale, "/work/")}>{copy.home.secondary}<span aria-hidden="true">↓</span></Link></div>
          <p className="hero__proof">{copy.home.proof}</p>
        </div>
        <div className="hero__visual reveal reveal--delay" role="img" aria-label={locale === "es" ? "Composición orgánica abstracta" : "Abstract organic composition"}>
          <div className="portrait-card"><span className="portrait-card__placeholder">{locale === "es" ? "Retrato pendiente de producción" : "Portrait to be produced"}</span></div>
          <OrganicMark />
          <p className="hero__visual-note">{locale === "es" ? "hacer que lo complejo respire" : "make complexity breathe"}</p>
        </div>
      </div>
    </section>
    <div className="ribbon"><div className="shell ribbon__inner"><span>Product</span><span>Systems</span><span>Science</span><span>Operations</span><span>Human judgment</span></div></div>
    <section className="section" id="work">
      <div className="shell"><SectionHeading kicker={copy.home.workKicker} title={copy.home.workTitle} intro={copy.home.workIntro} /><div className="work-grid">{projects.map((project, index) => <ProjectCard key={project.slug} project={project} locale={locale} featured={index === 0} />)}</div><Link className="text-link" href={getLocalizedPath(locale, "/work/")}>{copy.nav.work}<span aria-hidden="true">↗</span></Link></div>
    </section>
    <section className="section section--tinted" id="process"><div className="shell"><SectionHeading kicker={copy.home.processKicker} title={copy.home.processTitle} intro={copy.home.processIntro} align="right" /><div className="process-grid">{copy.home.steps.map(([number, title, body]) => <article className="process-step" key={number}><span className="process-step__number">{number}</span><h3>{title}</h3><p>{body}</p></article>)}</div></div></section>
    <section className="section"><div className="shell"><SectionHeading kicker={copy.home.capabilityKicker} title={copy.home.capabilityTitle} /><div className="capability-grid">{copy.home.capabilities.map(([title, body]) => <article className="capability" key={title}><h3>{title}</h3><p>{body}</p></article>)}</div></div></section>
    <section className="section section--tinted"><div className="shell about-band"><SectionHeading kicker={copy.home.aboutKicker} title={copy.home.aboutTitle} /><div className="about-band__body"><p>{copy.home.aboutBody}</p><Link className="text-link" href={getLocalizedPath(locale, "/about/")}>{copy.home.aboutLink}<span aria-hidden="true">↗</span></Link></div></div></section>
    <section className="section"><div className="shell"><div className="contact-panel"><p className="eyebrow"><span aria-hidden="true">✳</span>{copy.home.contactKicker}</p><h2>{copy.home.contactTitle}</h2><p>{copy.home.contactBody}</p><EmailCta locale={locale} label={copy.home.primary} /></div></div></section>
  </PageShell>;
}
