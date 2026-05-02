import type { MetadataRoute } from 'next';
import { fetchNiltoArticles } from './lib/nilto';

// 静的ページの最終更新日（実際に更新したときだけ変更する）
const STATIC_DATES = {
  home: new Date('2026-04-29'),
  about: new Date('2026-04-29'),
  services: new Date('2026-04-29'),
  servicePages: new Date('2026-04-29'),
  articles: new Date('2026-04-29'),
  careers: new Date('2026-04-29'),
} as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.kurosawa-vn.net';

  /* ─── 静的ページ ─── */
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: STATIC_DATES.home,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: STATIC_DATES.about,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: STATIC_DATES.services,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/establishment`,
      lastModified: STATIC_DATES.servicePages,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services/ma`,
      lastModified: STATIC_DATES.servicePages,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services/accounting`,
      lastModified: STATIC_DATES.servicePages,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services/legal-labor`,
      lastModified: STATIC_DATES.servicePages,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services/license`,
      lastModified: STATIC_DATES.servicePages,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services/other`,
      lastModified: STATIC_DATES.servicePages,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: STATIC_DATES.articles,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: STATIC_DATES.careers,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  /* ─── 動的ページ（NILTO記事）─── */
  let articlePages: MetadataRoute.Sitemap = [];
  try {
    const data = await fetchNiltoArticles({ limit: 100, order: '-_published_at' });
    articlePages = data.data.map((a) => ({
      url: `${baseUrl}/articles/${a._id}`,
      lastModified: new Date(a._updated_at), // NILTOの実更新日時を使用
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
  } catch {
    console.warn('sitemap: NILTO の記事取得をスキップしました');
  }

  return [...staticPages, ...articlePages];
}