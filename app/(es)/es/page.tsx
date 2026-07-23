import type { Metadata } from "next";
import { HomePage } from "@/components/home-page";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  locale: "es",
  title: "Productos web con criterio",
  description: "Jackson Ochoa diseña y construye productos web útiles para ideas y operaciones complejas.",
  englishPath: "/",
  spanishPath: "/es/",
});

export default function Page() { return <HomePage locale="es" />; }
