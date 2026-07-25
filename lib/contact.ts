import type { Locale } from "./content";
import { site } from "./site";
export type ContactValues = { name: string; project: string; problem: string; email: string; whatsapp: string; consent: boolean; website: string; };
export type ContactErrors = Partial<Record<"name" | "problem" | "contact" | "consent", string>>;
// Single source of truth for the address: it previously diverged from
// site.email (jack@ vs jackson@) across the header/footer and the contact form.
export const contactFallbacks = { email: site.email, whatsappUrl: "https://wa.me/593980559255" };
export function validateContact(values: ContactValues, locale: Locale): ContactErrors { const es = locale === "es"; const errors: ContactErrors = {}; if (!values.name.trim()) errors.name = es ? "Ingresa tu nombre." : "Enter your name."; if (!values.problem.trim()) errors.problem = es ? "Cuéntame cuál es el problema." : "Tell me about the problem."; if (!values.email.trim() && !values.whatsapp.trim()) errors.contact = es ? "Deja un email o WhatsApp para responderte." : "Leave an email or WhatsApp number so I can reply."; if (!values.consent) errors.consent = es ? "Necesito tu consentimiento para usar estos datos y responderte." : "I need your consent to use these details and reply."; return errors; }
