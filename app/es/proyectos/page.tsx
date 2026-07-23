import type { Metadata } from "next";
import { WorkPage } from "@/components/work-page";

export const metadata: Metadata = { title: "Proyectos seleccionados", description: "Casos sanitizados de productos, sistemas, ciencia y operaciones." };

export default function Page() { return <WorkPage locale="es" />; }
