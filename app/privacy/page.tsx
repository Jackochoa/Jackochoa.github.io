import type { Metadata } from "next";
import { PrivacyPage } from "@/components/info-page";
export const metadata: Metadata = { title: "Privacy", description: "How this portfolio handles data." };
export default function Page() { return <PrivacyPage locale="en" />; }
