import type { Metadata } from "next";
import { HomePage } from "@/components/home-page";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  title: "Web products with clarity",
  description: "Jackson Ochoa designs and builds useful web products for complex ideas and operations.",
  englishPath: "/",
  spanishPath: "/es/",
});

export default function Page() { return <HomePage locale="en" />; }
