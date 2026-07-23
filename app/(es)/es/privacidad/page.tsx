import type { Metadata } from "next";
import { PrivacyPage } from "@/components/info-page";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  locale: "es",
  title: "Privacidad",
  description: "Cómo maneja datos este portafolio.",
  englishPath: "/privacy/",
  spanishPath: "/es/privacidad/",
});

export default function Page() { return <PrivacyPage locale="es" />; }
