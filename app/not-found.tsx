import Link from "next/link";

export default function NotFound() {
  return <main className="page-hero" lang="en"><div className="shell"><p className="eyebrow"><span aria-hidden="true">✳</span>404</p><h1>That path grew elsewhere.</h1><p className="page-hero__intro">The page does not exist. Try the home page or browse the work.</p><div className="hero__actions"><Link className="button button--primary" href="/">Go home<span aria-hidden="true">↗</span></Link><Link className="button button--ghost" href="/work/">See work<span aria-hidden="true">↗</span></Link></div></div></main>;
}
