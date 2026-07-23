import type { Metadata } from "next";
import { ProcessPage } from "@/components/info-page";
export const metadata: Metadata = { title: "Proceso", description: "Un camino claro por trabajo de producto incierto." };
export default function Page() { return <ProcessPage locale="es" />; }
