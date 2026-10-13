import type { Metadata } from 'next';
import { routing, HREFLANGS, OG_LOCALES, type Locale } from '@/i18n/routing';

export const SITE_URL = 'https://www.kurosawa-vn.net';
export const SITE_NAME = 'Kurosawa Consulting Vietnam';

/** 言語ごとの絶対URL（日本語はプレフィックスなし） */
export function localizedUrl(locale: Locale, path = ''): string {
  const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
  return `${SITE_URL}${prefix}${path}`;
}

/** canonical と hreflang（全言語＋x-default） */
export function buildAlternates(locale: Locale, path = ''): Metadata['alternates'] {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[HREFLANGS[l]] = localizedUrl(l, path);
  }
  languages['x-default'] = localizedUrl(routing.defaultLocale, path);
  return { canonical: localizedUrl(locale, path), languages };
}

/** 各ページ共通のメタデータ生成 */
export function pageMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
}): Metadata {
  return {
    title,
    description,
    alternates: buildAlternates(locale, path),
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: localizedUrl(locale, path),
      locale: OG_LOCALES[locale],
    },
  };
}
