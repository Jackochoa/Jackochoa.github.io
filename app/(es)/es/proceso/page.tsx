import type { Metadata } from "next";
import { ProcessPage } from "@/components/info-page";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  locale: "es",
  title: "Proceso",
  description: "Un camino claro por trabajo de producto incierto.",
  englishPath: "/process/",
  spanishPath: "/es/proceso/",
});

export default function Page() { return <ProcessPage locale="es" />; }
