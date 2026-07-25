import Link from "next/link";
import { getCopy, getLocalizedPath, stackGroups, stackNote, stackProof, type Locale, type StackEntry } from "@/lib/content";
import { iconPath } from "@/lib/icons";
import { ContactCta } from "./contact-cta";
import { TransformationMap } from "./motifs";
import { PageShell } from "./page-shell";
import { ProjectCarousel } from "./project-carousel";
import { SectionHeading } from "./section-heading";

export function HomePage({ locale }: { locale: Locale }) {
  const t = getCopy(locale).home;
  const workPath = getLocalizedPath(locale, "/work/");

  return (
    <PageShell locale={locale} currentPath={locale === "es" ? "/" : "/en/"}>
      <section className="hero">
        <div className="shell">
          <div className="hero__copy reveal">
            <p className="eyebrow"><span aria-hidden="true">✳</span>{t.kicker}</p>
            <h1>{t.title}</h1>
            <p className="hero__intro">{t.intro}</p>
            <div className="hero__actions">
              <ContactCta locale={locale} label={t.primary} />
              <Link className="button button--ghost" href={workPath}>{t.secondary}<span aria-hidden="true">↓</span></Link>
            </div>
            <p className="hero__proof">{t.proof}</p>
          </div>
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

      <section className="motif-band" aria-hidden="true">
        <div className="shell motif-band__inner">
          <TransformationMap />
          <p className="motif-band__note">{locale === "es" ? "Contexto → Sistema → Decisión" : "Context → System → Decision"}</p>
        </div>
      </section>

      <section className="section section--tinted" id="work">
        <div className="shell">
          <SectionHeading kicker={t.workKicker} title={t.workTitle} />
          <ProjectCarousel locale={locale} />
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
              <ContactCta locale={locale} label={t.primary} />
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
        <StackProofList locale={locale} />
        <p className="stack-note"><b>*</b> {stackNote[locale]}</p>
      </div>
    </section>
  );
}

function StackProofList({ locale }: { locale: Locale }) {
  return (
    <div className="stack-proof">
      <div className="stack-proof__header">
        <span className="stack-group__label">{locale === "es" ? "Se demuestra en" : "Demonstrated in"}</span>
        <p>{locale === "es" ? "Herramientas conectadas a casos, pipelines y entrega real." : "Tools connected to real case studies, pipelines, and delivery."}</p>
      </div>
      <ul className="stack-proof__list">
        {stackProof.map((proof) => (
          <li className="stack-proof__item" key={proof.title.en}>
            {proof.slug ? (
              <Link className="stack-proof__title" href={getLocalizedPath(locale, `/work/${proof.slug}/`)}>
                {proof.title[locale]}<span aria-hidden="true">↗</span>
              </Link>
            ) : (
              <strong className="stack-proof__title stack-proof__title--static">{proof.title[locale]}</strong>
            )}
            <p>{proof.detail[locale]}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StackIcon({ item }: { item: StackEntry }) {
  const path = iconPath(item.icon);
  const className = `stack-item${item.declared ? " stack-item--declared" : ""}`;
  return (
    <span className={className} title={item.name}>
      {path ? <svg viewBox="0 0 24 24" aria-hidden="true"><path d={path} /></svg> : null}
      {item.asset ? <svg viewBox="0 0 20 20" aria-hidden="true"><image href={item.asset} x="0" y="0" width="20" height="20" preserveAspectRatio="xMidYMid meet" /></svg> : null}
      {item.name}{item.declared ? "*" : ""}
    </span>
  );
}
