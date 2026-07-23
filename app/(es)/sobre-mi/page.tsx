import type { Metadata } from "next";
import { AboutPage } from "@/components/info-page";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  locale: "es",
  title: "Sobre mí",
  description: "Pensamiento de producto con seguimiento de ingeniero.",
  englishPath: "/en/about/",
  spanishPath: "/sobre-mi/",
});

export default function Page() { return <AboutPage locale="es" />; }
