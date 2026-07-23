import { LegacyPage } from "@/components/legacy-page";
import { getProjects } from "@/lib/content";
export const dynamicParams = false;
export function generateStaticParams() { return getProjects("es").map(({ slug }) => ({ slug })); }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; return <LegacyPage locale="es" href={`/proyectos/${slug}/`} />; }
