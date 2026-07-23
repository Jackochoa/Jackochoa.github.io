import type { Metadata } from "next";
import { AboutPage } from "@/components/info-page";
export const metadata: Metadata = { title: "Sobre mí", description: "Pensamiento de producto con seguimiento de ingeniero." };
export default function Page() { return <AboutPage locale="es" />; }
