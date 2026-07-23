import type { Metadata } from "next";
import { WorkPage } from "@/components/work-page";

export const metadata: Metadata = { title: "Selected work", description: "Sanitized case studies across products, systems, science, and operations." };

export default function Page() { return <WorkPage locale="en" />; }
