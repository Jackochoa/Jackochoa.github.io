import type { Metadata } from "next";
import { PrivacyPage } from "@/components/info-page";
export const metadata: Metadata = { title: "Privacidad", description: "Cómo maneja datos este portafolio." };
export default function Page() { return <PrivacyPage locale="es" />; }
