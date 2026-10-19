import type { MetadataRoute } from 'next';
import { fetchNiltoArticles } from './lib/nilto';
import { localizedUrl } from './lib/seo';
import { routing, HREFLANGS } from '@/i18n/routing';

// 静的ページの最終更新日（実際に更新したときだけ変更する）
const STATIC_DATES = {
  home: new Date('2026-04-29'),
  about: new Date('2026-04-29'),
  services: new Date('2026-04-29'),
  servicePages: new Date('2026-10-13'),
  articles: new Date('2026-04-29'),
  careers: new Date('2026-04-29'),
  legal: new Date('2026-10-19'),
} as const;

type Entry = MetadataRoute.Sitemap[number];

/** 1ページ分を全言語のURLに展開（hreflang の alternates 付き） */
function localizedEntries(
  path: string,
  options: Omit<Entry, 'url' | 'alternates'>
): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    routing.locales.map((l) => [HREFLANGS[l], localizedUrl(l, path)])
  );
  return routing.locales.map((locale) => ({
    url: localizedUrl(locale, path),
    ...options,
    alternates: { languages },
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  /* ─── 静的ページ ─── */
  const staticPages: MetadataRoute.Sitemap = [
    ...localizedEntries('', {
      lastModified: STATIC_DATES.home,
      changeFrequency: 'weekly',
      priority: 1.0,
    }),
    ...localizedEntries('/about', {
      lastModified: STATIC_DATES.about,
      changeFrequency: 'monthly',
      priority: 0.8,
    }),
    ...localizedEntries('/services', {
      lastModified: STATIC_DATES.services,
      changeFrequency: 'monthly',
      priority: 0.9,
    }),
    ...['establishment', 'ma', 'accounting', 'legal-labor', 'license', 'other'].flatMap((slug) =>
      localizedEntries(`/services/${slug}`, {
        lastModified: STATIC_DATES.servicePages,
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    ),
    ...localizedEntries('/articles', {
      lastModified: STATIC_DATES.articles,
      changeFrequency: 'weekly',
      priority: 0.8,
    }),
    ...localizedEntries('/careers', {
      lastModified: STATIC_DATES.careers,
      changeFrequency: 'monthly',
      priority: 0.5,
    }),
    ...['/privacy', '/sitemap'].flatMap((path) =>
      localizedEntries(path, {
        lastModified: STATIC_DATES.legal,
        changeFrequency: 'yearly',
        priority: 0.3,
      })
    ),
  ];

  /* ─── 動的ページ（NILTO記事）─── */
  // 記事本文は日本語のみのため、日本語URLだけを掲載（他言語版は canonical で日本語版を指す）
  let articlePages: MetadataRoute.Sitemap = [];
  try {
    const data = await fetchNiltoArticles({ limit: 100, order: '-_published_at' });
    articlePages = data.data.map((a) => ({
      url: localizedUrl(routing.defaultLocale, `/articles/${a._id}`),
      lastModified: new Date(a._updated_at), // NILTOの実更新日時を使用
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
  } catch {
    console.warn('sitemap: NILTO の記事取得をスキップしました');
  }

  return [...staticPages, ...articlePages];
}
