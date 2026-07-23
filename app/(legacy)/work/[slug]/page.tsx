import { LegacyPage } from "@/components/legacy-page";
import { getProjects } from "@/lib/content";
export const dynamicParams = false;
export function generateStaticParams() { return getProjects("en").map(({ slug }) => ({ slug })); }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; return <LegacyPage locale="en" href={`/en/work/${slug}/`} />; }
