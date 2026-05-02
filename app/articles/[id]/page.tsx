import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchNiltoArticleById, fetchNiltoArticles, type NiltoArticle } from '../../lib/nilto';
import Link from 'next/link';
import Image from 'next/image';
import ReadingProgress from './ReadingProgress';
import ShareButtons from './ShareButtons';
import { getArticleJsonLd, getBreadcrumbJsonLd } from '../../lib/jsonld';

type Props = { params: Promise<{ id: string }> };

// ─── 読了時間の計算（日本語対応） ───
function calcReadingTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, '');
  const chars = text.length;
  return Math.max(1, Math.ceil(chars / 400));
}

export async function generateStaticParams() {
  try {
    const data = await fetchNiltoArticles({ limit: 100, order: '-_published_at' });
    return data.data.map((a) => ({ id: String(a._id) }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const article = await fetchNiltoArticleById(id);
  if (!article) return { title: '記事が見つかりません' };

  const description = article.body
    ? article.body.replace(/<[^>]*>/g, '').slice(0, 120)
    : undefined;

  return {
    title: `${article.title || article._title} | Kurosawa Consulting Vietnam`,
    description,
    openGraph: {
      title: article.title || article._title,
      description,
      images: article.eyecatch ? [{ url: article.eyecatch.url, alt: article.eyecatch.alt }] : [],
      type: 'article',
      publishedTime: article._published_at,
      modifiedTime: article._updated_at,
    },
    alternates: { canonical: `https://www.kurosawa-vn.net/articles/${id}` },
  };
}

// ─── 関連記事（同モデルから最新を取得、自身を除外） ───
async function getRelated(currentId: number): Promise<NiltoArticle[]> {
  try {
    const data = await fetchNiltoArticles({ limit: 7, order: '-_published_at' });
    return data.data.filter((a) => a._id !== currentId).slice(0, 3);
  } catch {
    return [];
  }
}

export default async function ArticleDetailPage({ params }: Props) {
  const { id } = await params;
  const [article, related] = await Promise.all([
    fetchNiltoArticleById(id),
    getRelated(Number(id)),
  ]);

  if (!article) notFound();

  const title = article.title || article._title || '無題';
  const publishedDate = new Date(article._published_at).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const updatedDate = new Date(article._updated_at).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const readingTime = calcReadingTime(article.body ?? '');
  const isUpdated = article._published_at !== article._updated_at;

  return (
    <>
      <ReadingProgress />

      {/* 構造化データ（JSON-LD） */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getArticleJsonLd({
              id: article._id,
              title,
              description: article.body
                ? article.body.replace(/<[^>]*>/g, '').slice(0, 120)
                : undefined,
              publishedAt: article._published_at,
              updatedAt: article._updated_at,
              imageUrl: article.eyecatch?.url,
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getBreadcrumbJsonLd([
              { name: 'ホーム', url: 'https://www.kurosawa-vn.net' },
              { name: '記事・コラム', url: 'https://www.kurosawa-vn.net/articles' },
              { name: title, url: `https://www.kurosawa-vn.net/articles/${article._id}` },
            ])
          ),
        }}
      />

      <div className="min-h-screen bg-white">

        {/* ─── ページヘッダー（薄グレー背景） ─── */}
        <div className="bg-gray-50 border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-8 sm:py-10">
            {/* パンくず */}
            <nav aria-label="パンくずリスト" className="mb-6">
              <ol className="flex items-center gap-1.5 text-xs text-gray-400">
                <li>
                  <Link href="/" className="hover:text-[#84ab52] transition-colors">
                    ホーム
                  </Link>
                </li>
                <li aria-hidden="true" className="text-gray-300">›</li>
                <li>
                  <Link href="/articles" className="hover:text-[#84ab52] transition-colors">
                    記事・コラム
                  </Link>
                </li>
                <li aria-hidden="true" className="text-gray-300">›</li>
                <li className="text-gray-500 truncate max-w-[200px] sm:max-w-sm">{title}</li>
              </ol>
            </nav>

            {/* 記事メタ */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 mb-5">
              <time dateTime={article._published_at} className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {publishedDate}
              </time>
              {isUpdated && (
                <span className="flex items-center gap-1 text-gray-400">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  更新: {updatedDate}
                </span>
              )}
              <span className="flex items-center gap-1 text-gray-400">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                約{readingTime}分で読めます
              </span>
            </div>

            {/* タイトル */}
            <h1 className="text-xl sm:text-2xl md:text-3xl font-light text-gray-800 leading-relaxed tracking-wide">
              {title}
            </h1>
          </div>
        </div>

        {/* ─── アイキャッチ ─── */}
        {article.eyecatch?.url && (
          <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 pt-8 sm:pt-10">
            <div className="relative w-full aspect-[16/7] rounded-xl overflow-hidden shadow-sm">
              <Image
                src={article.eyecatch.url}
                alt={article.eyecatch.alt || title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 1152px"
              />
            </div>
          </div>
        )}

        {/* ─── メインコンテンツ ─── */}
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-10 sm:py-14">
          <div className="flex gap-12 xl:gap-16">

            {/* 本文 */}
            <main className="min-w-0 flex-1">
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: article.body ?? '' }}
              />

              {/* 記事フッター */}
              <div className="mt-14 pt-8 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <ShareButtons title={title} />
                <Link
                  href="/articles"
                  className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#84ab52] transition-colors"
                >
                  <svg className="w-4 h-4 rotate-180 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                  記事一覧に戻る
                </Link>
              </div>
            </main>

            {/* サイドバー（デスクトップのみ） */}
            <aside className="hidden lg:block w-56 xl:w-64 flex-shrink-0">
              <div className="sticky top-24 flex flex-col gap-8">

                {/* 記事情報 */}
                <div className="bg-gray-50 rounded-xl p-5 space-y-4">
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">Article Info</p>
                  <dl className="space-y-3 text-xs">
                    <div>
                      <dt className="text-gray-400 mb-0.5">公開日</dt>
                      <dd className="text-gray-700 font-medium">{publishedDate}</dd>
                    </div>
                    {isUpdated && (
                      <div>
                        <dt className="text-gray-400 mb-0.5">更新日</dt>
                        <dd className="text-gray-700 font-medium">{updatedDate}</dd>
                      </div>
                    )}
                    <div>
                      <dt className="text-gray-400 mb-0.5">読了時間</dt>
                      <dd className="text-gray-700 font-medium">約{readingTime}分</dd>
                    </div>
                  </dl>
                </div>

                {/* シェアボタン */}
                <div className="bg-gray-50 rounded-xl p-5">
                  <ShareButtons title={title} />
                </div>

                {/* 記事一覧リンク */}
                <Link
                  href="/articles"
                  className="flex items-center justify-center gap-2 w-full py-3 border border-gray-200 rounded-lg text-xs text-gray-500 hover:border-[#84ab52] hover:text-[#84ab52] transition-colors"
                >
                  <svg className="w-3.5 h-3.5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                  記事一覧を見る
                </Link>
              </div>
            </aside>
          </div>
        </div>

        {/* ─── 関連記事 ─── */}
        {related.length > 0 && (
          <div className="border-t border-gray-100 bg-gray-50">
            <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16">
              <h2 className="text-xs text-[#84ab52] tracking-[0.25em] uppercase font-light mb-1">
                Related
              </h2>
              <p className="text-base sm:text-lg font-light text-gray-600 tracking-wide mb-8">
                関連記事
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {related.map((a) => {
                  const relDate = new Date(a._published_at).toLocaleDateString('ja-JP', {
                    year: 'numeric', month: '2-digit', day: '2-digit',
                  }).replace(/\//g, '-');
                  return (
                    <Link
                      key={a._id}
                      href={`/articles/${a._id}`}
                      className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
                    >
                      <div className="aspect-video w-full bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                        {a.eyecatch?.url ? (
                          <Image
                            src={a.eyecatch.url}
                            alt={a.eyecatch.alt || a.title || ''}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="p-4 sm:p-5">
                        <time className="text-xs text-gray-400 mb-2 block">{relDate}</time>
                        <h3 className="text-sm font-medium text-gray-800 leading-snug line-clamp-2 group-hover:text-[#84ab52] transition-colors">
                          {a.title || a._title}
                        </h3>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}
