import type { Metadata } from "next";
import { WorkPage } from "@/components/work-page";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  locale: "es",
  title: "Proyectos seleccionados",
  description: "Casos sanitizados de productos, sistemas, ciencia y operaciones.",
  englishPath: "/work/",
  spanishPath: "/es/proyectos/",
});

export default function Page() { return <WorkPage locale="es" />; }
