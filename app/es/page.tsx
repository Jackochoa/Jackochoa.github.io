import type { Metadata } from "next";
import { HomePage } from "@/components/home-page";

export const metadata: Metadata = { title: "Productos web con criterio", description: "Jackson Ochoa diseña y construye productos web útiles para ideas y operaciones complejas." };

export default function Page() { return <HomePage locale="es" />; }
