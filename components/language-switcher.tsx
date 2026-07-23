import Link from "next/link";
import { getEnglishPathFromSpanish, getLocalizedPath, type Locale } from "@/lib/content";

type LanguageSwitcherProps = { locale: Locale; currentPath: string };

export function LanguageSwitcher({ locale, currentPath }: LanguageSwitcherProps) {
  const target = locale === "en" ? getLocalizedPath("es", currentPath) : getEnglishPathFromSpanish(currentPath);
  const label = locale === "en" ? "Leer en español" : "Read in English";
  return (
    <Link className="language-switcher" href={target} hrefLang={locale === "en" ? "es" : "en"}>
      <span aria-hidden="true">{locale === "en" ? "ES" : "EN"}</span>
      <span>{label}</span>
    </Link>
  );
}
