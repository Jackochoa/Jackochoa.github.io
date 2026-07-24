import Link from "next/link";
import * as icons from "simple-icons";
import { getCopy, getLocalizedPath, getProjects, stackGroups, stackNote, type Locale, type StackEntry } from "@/lib/content";
import { EmailCta } from "./email-cta";
import { OrganicMark } from "./organic-mark";
import { PageShell } from "./page-shell";
import { ProjectCard } from "./project-card";
import { SectionHeading } from "./section-heading";

export function HomePage({ locale }: { locale: Locale }) {
  const t = getCopy(locale).home;
  const projects = getProjects(locale);
  const workPath = getLocalizedPath(locale, "/work/");

  return (
    <PageShell locale={locale} currentPath={locale === "es" ? "/" : "/en/"}>
      <section className="hero">
        <div className="shell hero__grid">
          <div className="hero__copy reveal">
            <p className="eyebrow"><span aria-hidden="true">✳</span>{t.kicker}</p>
            <h1>{t.title}</h1>
            <p className="hero__intro">{t.intro}</p>
            <div className="hero__actions">
              <EmailCta locale={locale} label={t.primary} />
              <Link className="button button--ghost" href={workPath}>{t.secondary}<span aria-hidden="true">↓</span></Link>
            </div>
            <p className="hero__proof">{t.proof}</p>
          </div>
          <div className="hero__visual reveal reveal--delay" aria-hidden="true">
            <OrganicMark />
          </div>
        </div>
      </section>

      <section className="proof-strip">
        <div className="shell proof-strip__inner">
          <span>01 / E‑Grúa</span>
          <span>02 / Briquette LMS</span>
          <span>03 / Rust Dashboard</span>
          <span>04 / MitoCircos Studio</span>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionHeading kicker={t.servicesKicker} title={t.servicesTitle} />
          <div className="service-grid">
            {t.services.map(([title, body], i) => (
              <article className="service-card" key={title}>
                <span>0{i + 1}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tinted" id="work">
        <div className="shell">
          <SectionHeading kicker={t.workKicker} title={t.workTitle} />
          <div className="work-grid">
            {projects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} locale={locale} featured={i === 0} />
            ))}
          </div>
          <Link className="text-link" href={workPath}>{t.workAll}<span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionHeading kicker={t.processKicker} title={t.processTitle} intro={t.processIntro} align="right" />
          <div className="process-grid process-grid--five">
            {t.process.map(([n, title, body]) => (
              <article className="process-step" key={n}>
                <span className="process-step__number">{n}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <StackSection locale={locale} kicker={t.stackKicker} title={t.stackTitle} />

      <section className="section">
        <div className="shell">
          <SectionHeading kicker={t.domainsKicker} title={t.domainsTitle} />
          <div className="domain-grid">
            {t.domains.map(([title, body]) => (
              <article className="domain-card" key={title}><h3>{title}</h3><p>{body}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tinted">
        <div className="shell about-band">
          <SectionHeading kicker={t.aboutKicker} title={t.aboutTitle} />
          <div className="about-band__body">
            <p>{t.about}</p>
            <Link className="text-link" href={getLocalizedPath(locale, "/about/")}>{t.aboutLink}<span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="contact-panel">
            <p className="eyebrow"><span aria-hidden="true">✳</span>{t.contact[0]}</p>
            <h2>{t.contact[1]}</h2>
            <p>{t.contact[2]}</p>
            <div className="hero__actions">
              <EmailCta locale={locale} label={t.primary} />
              <a className="button button--ghost contact-panel__whatsapp" href="https://wa.me/593980559255">WhatsApp<span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function StackSection({ locale, kicker, title }: { locale: Locale; kicker: string; title: string }) {
  return (
    <section className="stack" aria-label={locale === "es" ? "Stack tecnológico" : "Technology stack"}>
      <div className="shell stack__inner">
        <SectionHeading kicker={kicker} title={title} />
        <div className="stack-groups">
          {stackGroups.map((group) => (
            <div className="stack-group" key={group.label.en}>
              <span className="stack-group__label">{group.label[locale]}</span>
              <div className="stack-group__items">
                {group.items.map((item) => <StackIcon key={item.name} item={item} />)}
              </div>
            </div>
          ))}
        </div>
        <p className="stack-note"><b>*</b> {stackNote[locale]}</p>
      </div>
    </section>
  );
}

function StackIcon({ item }: { item: StackEntry }) {
  const icon = item.icon ? (icons as Record<string, { path: string; title: string } | undefined>)[item.icon] : undefined;
  const className = `stack-item${item.declared ? " stack-item--declared" : ""}`;
  return (
    <span className={className} title={item.name}>
      {icon ? <svg viewBox="0 0 24 24" aria-hidden="true"><path d={icon.path} /></svg> : null}
      {item.name}{item.declared ? "*" : ""}
    </span>
  );
}
