import type { Metadata } from "next";
import "../globals.css";
import { geologica, martianMono } from "../fonts";

export const metadata: Metadata = { robots: { index: false, follow: true } };
export default function LegacyLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${geologica.variable} ${martianMono.variable}`}>{children}</body></html>;
}
