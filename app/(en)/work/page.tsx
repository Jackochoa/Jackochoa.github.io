import type { Metadata } from "next";
import { WorkPage } from "@/components/work-page";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  title: "Selected work",
  description: "Sanitized case studies across products, systems, science, and operations.",
  englishPath: "/work/",
  spanishPath: "/es/proyectos/",
});

export default function Page() { return <WorkPage locale="en" />; }
