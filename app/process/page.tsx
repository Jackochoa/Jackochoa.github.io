import type { Metadata } from "next";
import { ProcessPage } from "@/components/info-page";
export const metadata: Metadata = { title: "Process", description: "A clear path through uncertain product work." };
export default function Page() { return <ProcessPage locale="en" />; }
