import Link from "next/link";

export default function NotFound() {
  return <main className="page-hero" lang="es"><div className="shell"><p className="eyebrow"><span aria-hidden="true">✳</span>404</p><h1>Ese camino creció en otro lugar.</h1><p className="page-hero__intro">La página no existe. Probá volver al inicio o explorar los proyectos.</p><div className="hero__actions"><Link className="button button--primary" href="/">Volver al inicio<span aria-hidden="true">↗</span></Link><Link className="button button--ghost" href="/proyectos/">Ver proyectos<span aria-hidden="true">↗</span></Link></div></div></main>;
}
