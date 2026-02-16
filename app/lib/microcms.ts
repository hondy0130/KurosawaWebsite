'use server';

// microCMS からブログ記事（blogs）とニュース（news）を取得するクライアント
// 依存を増やさないため fetch で実装（microcms-js-sdk 不使用）

import { getMicroCmsApiKey, getMicroCmsServiceDomain } from './env';

// ─── 型定義 ───

type MicroCmsListResponse<T> = {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
};

export type MicroCmsBlog = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title?: string;
  name?: string;
  content?: string;
  eyecatch?: {
    url: string;
    height: number;
    width: number;
  } | null;
  category?: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    revisedAt: string;
  } | null;
};

// ニュース（news）スキーマ
export type MicroCmsNews = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  date: string;
  category?: string | null;
};

// ─── API ベース URL ───

function getMicroCmsApiBase(): string {
  return `https://${getMicroCmsServiceDomain()}.microcms.io/api/v1`;
}

// ─── ブログ ───

export async function fetchMicroCmsBlogs(params?: {
  limit?: number;
  offset?: number;
  categoryId?: string;
  orderBy?: 'publishedAt' | 'createdAt' | 'updatedAt';
}): Promise<MicroCmsListResponse<MicroCmsBlog>> {
  const { limit = 6, offset = 0, categoryId, orderBy = 'publishedAt' } = params || {};

  const search = new URLSearchParams({
    limit: String(limit),
    offset: String(offset),
    orders: `-${orderBy}`,
  });

  if (categoryId) {
    search.set('filters', `category[equals]${categoryId}`);
  }

  const url = `${getMicroCmsApiBase()}/blogs?${search.toString()}`;
  console.log('🔍 microCMS API リクエスト:', url);

  const res = await fetch(url, {
    headers: {
      'X-MICROCMS-API-KEY': getMicroCmsApiKey(),
    },
    // タグベースキャッシュ + Webhook で即時更新
    // ISR: 30秒ごとに再検証（ページレベルのrevalidateと合わせる）
    next: {
      tags: ['blogs'],
      revalidate: 30,
    },
  });

  if (!res.ok) {
    const body = await res.text();
    console.error('❌ microCMS API エラー:', { status: res.status, body, url });
    throw new Error(`microCMS blogs 取得失敗: ${res.status} ${body}`);
  }

  const data = (await res.json()) as MicroCmsListResponse<MicroCmsBlog>;
  console.log('✅ microCMS API レスポンス:', {
    totalCount: data.totalCount,
    returnedCount: data.contents.length,
  });

  return data;
}

export async function fetchMicroCmsBlogById(contentId: string): Promise<MicroCmsBlog | null> {
  const res = await fetch(`${getMicroCmsApiBase()}/blogs/${encodeURIComponent(contentId)}`, {
    headers: {
      'X-MICROCMS-API-KEY': getMicroCmsApiKey(),
    },
    // タグベースキャッシュ + Webhook で即時更新
    next: {
      tags: ['blogs', `blog-${contentId}`],
      revalidate: 10,
    },
  });
  if (!res.ok) {
    return null;
  }
  return (await res.json()) as MicroCmsBlog;
}

// ─── ニュース ───

export async function fetchMicroCmsNews(params?: {
  limit?: number;
  offset?: number;
}): Promise<MicroCmsNews[]> {
  const { limit = 5, offset = 0 } = params || {};
  const search = new URLSearchParams({
    limit: String(limit),
    offset: String(offset),
    orders: '-publishedAt',
  });

  const res = await fetch(`${getMicroCmsApiBase()}/news?${search.toString()}`, {
    headers: { 'X-MICROCMS-API-KEY': getMicroCmsApiKey() },
    // ISR: 30秒ごとに再検証（ページレベルのrevalidateと合わせる）
    next: {
      tags: ['news'],
      revalidate: 30,
    },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`microCMS news 取得失敗: ${res.status} ${body}`);
  }
  const json = (await res.json()) as MicroCmsListResponse<MicroCmsNews>;
  return json.contents;
}
