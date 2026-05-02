'use server';

import { getNiltoApiKey } from './env';

const NILTO_API_BASE = 'https://cms-api.nilto.com/v1';

// ─── 型定義 ───

export interface NiltoResponse<T> {
  total: number;
  offset: number;
  limit: number;
  data: T[];
}

export interface NiltoSystemProperties {
  _id: number;
  _model: string;
  _title: string;
  _status: 'published' | 'draft' | 'published_draft';
  _created_at: string;
  _updated_at: string;
  _published_at: string;
  _last_published_at: string;
}

export interface NiltoArticle extends NiltoSystemProperties {
  title: string;
  body: string;
  eyecatch: { url: string; alt: string } | null;
  category?: { _id: number; _title: string; name: string } | null;
}

export interface NiltoNews extends NiltoSystemProperties {
  title: string;
  date: string;
  category?: string | null;
}

// ─── ヘルパー ───

function niltoHeaders(): HeadersInit {
  return { 'X-NILTO-API-KEY': getNiltoApiKey() };
}

// ─── 記事（articles） ───

export async function fetchNiltoArticles(params?: {
  limit?: number;
  offset?: number;
  order?: string;
}): Promise<NiltoResponse<NiltoArticle>> {
  const { limit = 6, offset = 0, order = '-_published_at' } = params ?? {};

  const search = new URLSearchParams({
    model: 'articles',
    limit: String(limit),
    offset: String(offset),
    order,
  });

  const res = await fetch(`${NILTO_API_BASE}/contents?${search}`, {
    headers: niltoHeaders(),
    next: { tags: ['articles'], revalidate: 60 },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`NILTO articles 取得失敗: ${res.status} ${body}`);
  }

  return (await res.json()) as NiltoResponse<NiltoArticle>;
}

export async function fetchNiltoArticleById(id: string): Promise<NiltoArticle | null> {
  const res = await fetch(`${NILTO_API_BASE}/contents/${encodeURIComponent(id)}`, {
    headers: niltoHeaders(),
    next: { tags: ['articles', `article-${id}`], revalidate: 60 },
  });

  if (!res.ok) return null;
  return (await res.json()) as NiltoArticle;
}

// ─── ニュース（news） ───

export async function fetchNiltoNews(params?: {
  limit?: number;
  offset?: number;
}): Promise<NiltoNews[]> {
  const { limit = 5, offset = 0 } = params ?? {};

  const search = new URLSearchParams({
    model: 'news',
    limit: String(limit),
    offset: String(offset),
    order: '-_published_at',
  });

  const res = await fetch(`${NILTO_API_BASE}/contents?${search}`, {
    headers: niltoHeaders(),
    next: { tags: ['news'], revalidate: 60 },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`NILTO news 取得失敗: ${res.status} ${body}`);
  }

  const json = (await res.json()) as NiltoResponse<NiltoNews>;
  return json.data;
}
