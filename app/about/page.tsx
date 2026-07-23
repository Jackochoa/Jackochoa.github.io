import type { Metadata } from "next";
import { AboutPage } from "@/components/info-page";
export const metadata: Metadata = { title: "About", description: "Product thinking with an engineer's follow-through." };
export default function Page() { return <AboutPage locale="en" />; }
