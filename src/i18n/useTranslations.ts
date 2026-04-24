import uk from './uk.json';
import en from './en.json';

const dictionaries = { uk, en } as const;

export type Locale = keyof typeof dictionaries;
export type Dictionary = typeof uk;

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export function useTranslations(locale: Locale): Dictionary {
  return dictionaries[locale];
}

function stripBase(pathname: string): string {
  if (BASE && pathname.startsWith(BASE)) {
    return pathname.slice(BASE.length) || '/';
  }
  return pathname;
}

export function getLocaleFromUrl(url: URL): Locale {
  const path = stripBase(url.pathname);
  const [, segment] = path.split('/');
  if (segment === 'en') return 'en';
  return 'uk';
}

export function getAlternateUrl(url: URL, targetLocale: Locale): string {
  const path = stripBase(url.pathname);

  let result: string;
  if (targetLocale === 'en') {
    result = path.startsWith('/en') ? path : `/en${path === '/' ? '/' : path}`;
  } else {
    result = path.startsWith('/en') ? (path.slice(3) || '/') : path;
  }

  return `${BASE}${result}`;
}
