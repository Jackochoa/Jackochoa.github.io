import type { Metadata } from "next";
import { HomePage } from "@/components/home-page";

export const metadata: Metadata = { title: "Web products with clarity", description: "Jackson Ochoa designs and builds useful web products for complex ideas and operations." };

export default function Page() { return <HomePage locale="en" />; }
