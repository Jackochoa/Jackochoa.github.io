import type { Metadata } from "next";
import { ProcessPage } from "@/components/info-page";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  title: "Process",
  description: "A clear path through uncertain product work.",
  englishPath: "/en/process/",
  spanishPath: "/proceso/",
});

export default function Page() { return <ProcessPage locale="en" />; }
