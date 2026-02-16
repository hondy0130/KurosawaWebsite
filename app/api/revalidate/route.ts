import { NextRequest } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { getRevalidateSecret } from '../../lib/env';
import {
  successResponse,
  errorResponse,
  extractErrorMessage,
  healthResponse,
} from '../../lib/api-response';

// ─── 型定義 ───

/** microCMS Webhookのペイロード */
type MicroCMSWebhookPayload = {
  service: string;
  api: string;
  id: string;
  type: 'new' | 'edit' | 'delete';
  contents?: {
    new?: {
      status: string[];
      publishValue?: string;
    };
    old?: {
      status: string[];
      publishValue?: string;
    };
  };
  /** カスタムパス（任意） */
  path?: string;
  /** シークレットトークン（ボディに含む場合） */
  secret?: string;
};

// ─── 再検証対象の算出 ───

function collectRevalidationTargets(body: MicroCMSWebhookPayload) {
  const paths: string[] = [];
  const tags: string[] = [];

  // 記事（blogs）の場合
  if (body.api === 'blogs') {
    tags.push('blogs');
    if (body.id) {
      tags.push(`blog-${body.id}`);
      paths.push(`/articles/${body.id}`);
    }
    paths.push('/articles', '/');
  }

  // ニュース（news）の場合
  if (body.api === 'news') {
    tags.push('news');
    if (body.id) {
      tags.push(`news-${body.id}`);
    }
    paths.push('/');
  }

  // カスタムパスが指定されている場合
  if (body.path) {
    paths.push(body.path);
  }

  // デフォルト: 対象がない場合
  if (paths.length === 0 && tags.length === 0) {
    paths.push('/');
    tags.push('blogs', 'news');
  }

  return {
    paths: [...new Set(paths)],
    tags: [...new Set(tags)],
  };
}

// ─── POST: Webhook 受信 & 再検証 ───

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as MicroCMSWebhookPayload;

    // セキュリティ: シークレットトークンの検証
    const secret = body.secret || request.headers.get('x-webhook-secret');

    let revalidateSecret: string;
    try {
      revalidateSecret = getRevalidateSecret();
    } catch {
      console.error('❌ REVALIDATE_SECRET is not set');
      return errorResponse('サーバー設定エラー');
    }

    if (!secret || secret !== revalidateSecret) {
      console.error('❌ Invalid secret token');
      return errorResponse('Unauthorized', 401);
    }

    console.log('🔔 Webhook received:', {
      type: body.type,
      api: body.api,
      id: body.id,
      timestamp: new Date().toISOString(),
    });

    const { paths, tags } = collectRevalidationTargets(body);

    // タグベースで再検証（最優先：fetchキャッシュを即座にクリア）
    for (const tag of tags) {
      console.log(`🏷️  Revalidating tag: ${tag}`);
      revalidateTag(tag);
    }

    // パスベースで再検証（ページキャッシュもクリア）
    for (const p of paths) {
      console.log(`♻️  Revalidating path: ${p}`);
      revalidatePath(p);
    }

    console.log('✅ Revalidation completed successfully');

    return successResponse('Revalidation completed', {
      revalidated: true,
      paths,
      tags,
      timestamp: new Date().toISOString(),
      webhook: { type: body.type, api: body.api, id: body.id },
    });
  } catch (err) {
    const msg = extractErrorMessage(err);
    console.error('❌ Revalidation error:', msg);

    return errorResponse('Error revalidating', 500, msg);
  }
}

// ─── GET: エンドポイント動作確認用 ───

export async function GET() {
  return healthResponse(
    'Receives microCMS webhooks for on-demand revalidation',
    '/api/revalidate'
  );
}
