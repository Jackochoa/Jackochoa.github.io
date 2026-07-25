import type { Metadata } from "next";
import { ContactPage } from "@/components/contact-page";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  locale: "es",
  title: "Contacto",
  description: "Contame qué necesita avanzar y en qué contexto. Respondo por correo o WhatsApp.",
  englishPath: "/en/contact/",
  spanishPath: "/contacto/",
});

export default function Page() { return <ContactPage locale="es" />; }
