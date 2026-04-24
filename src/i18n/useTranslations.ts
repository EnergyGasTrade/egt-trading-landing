import uk from './uk.json';
import en from './en.json';

const dictionaries = { uk, en } as const;

export type Locale = keyof typeof dictionaries;
export type Dictionary = typeof uk;

export function useTranslations(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function getLocaleFromUrl(url: URL): Locale {
  const [, segment] = url.pathname.split('/');
  if (segment === 'en') return 'en';
  return 'uk';
}

export function getAlternateUrl(url: URL, targetLocale: Locale): string {
  const pathname = url.pathname;

  if (targetLocale === 'en') {
    if (pathname.startsWith('/en')) return pathname;
    return `/en${pathname === '/' ? '/' : pathname}`;
  }

  // targetLocale === 'uk' — remove /en prefix
  if (pathname.startsWith('/en')) {
    const rest = pathname.slice(3);
    return rest || '/';
  }
  return pathname;
}
