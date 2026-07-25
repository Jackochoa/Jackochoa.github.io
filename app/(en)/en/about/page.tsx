import type { Metadata } from "next";
import { AboutPage } from "@/components/info-page";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  title: "About",
  description: "Medicine student and independent product engineer working across software, bioinformatics, and operating systems.",
  englishPath: "/en/about/",
  spanishPath: "/sobre-mi/",
});

export default function Page() { return <AboutPage locale="en" />; }
