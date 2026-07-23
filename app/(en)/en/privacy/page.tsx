import type { Metadata } from "next";
import { PrivacyPage } from "@/components/info-page";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  title: "Privacy",
  description: "How this portfolio handles data.",
  englishPath: "/en/privacy/",
  spanishPath: "/privacidad/",
});

export default function Page() { return <PrivacyPage locale="en" />; }
