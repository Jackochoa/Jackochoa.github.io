import type { Metadata } from "next";
import { AboutPage } from "@/components/info-page";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  locale: "es",
  title: "Sobre mí",
  description: "Estudiante de Medicina y product engineer independiente entre software, bioinformática y sistemas operativos.",
  englishPath: "/en/about/",
  spanishPath: "/sobre-mi/",
});

export default function Page() { return <AboutPage locale="es" />; }
