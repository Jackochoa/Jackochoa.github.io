import Link from "next/link";

type LegacyPageProps = { href: string; locale: "en" | "es" };

export function LegacyPage({ href, locale }: LegacyPageProps) {
  const spanish = locale === "es";
  return <main className="page-hero" lang={locale}><div className="shell"><p className="eyebrow"><span aria-hidden="true">✳</span>{spanish ? "Ruta actualizada" : "Updated route"}</p><h1>{spanish ? "Esta página tiene una nueva dirección." : "This page has a new address."}</h1><p className="page-hero__intro">{spanish ? "Usá la ruta actualizada para ver el contenido más reciente." : "Use the current route to see the latest content."}</p><div className="hero__actions"><Link className="button button--primary" href={href}>{spanish ? "Ir a la página" : "Go to page"}<span aria-hidden="true">↗</span></Link></div></div></main>;
}
