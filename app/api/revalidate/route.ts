import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

// microCMS Webhookのペイロード型定義
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
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as MicroCMSWebhookPayload & {
      secret?: string;
      path?: string;
    };

    // セキュリティ: シークレットトークンの検証（必須）
    const secret = body.secret || request.headers.get('x-webhook-secret');

    if (!secret || secret !== process.env.REVALIDATE_SECRET) {
      console.error('❌ Invalid secret token');
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    console.log('🔔 Webhook received:', {
      type: body.type,
      api: body.api,
      id: body.id,
      timestamp: new Date().toISOString(),
    });

    // microCMSのWebhookペイロードを処理
    const pathsToRevalidate: string[] = [];
    const tagsToRevalidate: string[] = [];

    // 記事（blogs）の場合
    if (body.api === 'blogs') {
      // タグベースで即時更新
      tagsToRevalidate.push('blogs');
      if (body.id) {
        tagsToRevalidate.push(`blog-${body.id}`);
      }

      // パスベースも併用
      if (body.id) {
        pathsToRevalidate.push(`/articles/${body.id}`);
      }
      pathsToRevalidate.push('/articles');
      pathsToRevalidate.push('/');
    }

    // ニュース（news）の場合
    if (body.api === 'news') {
      tagsToRevalidate.push('news');
      if (body.id) {
        tagsToRevalidate.push(`news-${body.id}`);
      }
      pathsToRevalidate.push('/');
    }

    // カスタムパスが指定されている場合
    if (body.path) {
      pathsToRevalidate.push(body.path);
    }

    // デフォルト: pathsとtagsがない場合
    if (pathsToRevalidate.length === 0 && tagsToRevalidate.length === 0) {
      pathsToRevalidate.push('/');
      tagsToRevalidate.push('blogs', 'news');
    }

    // 重複を削除
    const uniquePaths = [...new Set(pathsToRevalidate)];
    const uniqueTags = [...new Set(tagsToRevalidate)];

    // タグベースで再検証（最優先：fetchキャッシュを即座にクリア）
    for (const tag of uniqueTags) {
      console.log(`🏷️  Revalidating tag: ${tag}`);
      revalidateTag(tag);
    }

    // パスベースで再検証（ページキャッシュもクリア）
    for (const pathToRevalidate of uniquePaths) {
      console.log(`♻️  Revalidating path: ${pathToRevalidate}`);
      revalidatePath(pathToRevalidate);
    }

    console.log('✅ Revalidation completed successfully');

    return NextResponse.json({
      success: true,
      revalidated: true,
      paths: uniquePaths,
      tags: uniqueTags,
      timestamp: new Date().toISOString(),
      webhook: {
        type: body.type,
        api: body.api,
        id: body.id,
      },
    });
  } catch (err) {
    console.error('❌ Revalidation error:', err);
    return NextResponse.json(
      {
        success: false,
        message: 'Error revalidating',
        error: err instanceof Error ? err.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// GET: エンドポイント動作確認用
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'microCMS Webhook Revalidation endpoint is working',
    timestamp: new Date().toISOString(),
    endpoints: {
      POST: '/api/revalidate',
      description: 'Receives microCMS webhooks for on-demand revalidation',
    },
  });
}
