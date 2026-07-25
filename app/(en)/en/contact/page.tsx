import type { Metadata } from "next";
import { ContactPage } from "@/components/contact-page";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  title: "Contact",
  description: "Tell me what needs to move and in what context. I reply by email or WhatsApp.",
  englishPath: "/en/contact/",
  spanishPath: "/contacto/",
});

export default function Page() { return <ContactPage locale="en" />; }
