import { fetchMicroCmsBlogById, fetchMicroCmsBlogs } from '../../lib/microcms';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

// ISR + Webhook のハイブリッド戦略
export const revalidate = 60;

// 動的ルートの生成（ビルド時に静的生成するページを指定）
export async function generateStaticParams() {
  const data = await fetchMicroCmsBlogs({
    limit: 100,
    orderBy: 'publishedAt',
  });

  return data.contents.map((blog) => ({
    id: blog.id,
  }));
}

// メタデータの生成
export async function generateMetadata({ params }: { params: { id: string } }) {
  const blog = await fetchMicroCmsBlogById(params.id);

  if (!blog) {
    return {
      title: '記事が見つかりません',
    };
  }

  const description = blog.content?.substring(0, 160).replace(/<[^>]*>/g, '') || '';

  return {
    title: blog.title || blog.name,
    description,
    alternates: {
      canonical: `https://www.kurosawa-vn.net/articles/${params.id}`,
    },
    openGraph: {
      title: `${blog.title || blog.name} | Kurosawa Consulting Vietnam`,
      description,
      url: `https://www.kurosawa-vn.net/articles/${params.id}`,
      type: 'article',
      images: blog.eyecatch?.url ? [blog.eyecatch.url] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title || blog.name,
      description,
      images: blog.eyecatch?.url ? [blog.eyecatch.url] : [],
    },
  };
}

export default async function ArticleDetailPage({ params }: { params: { id: string } }) {
  const blog = await fetchMicroCmsBlogById(params.id);

  if (!blog) {
    notFound();
  }

  const categoryName = blog.category?.name || '未分類';
  const formattedDate = new Date(blog.publishedAt).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // 関連記事を取得
  const relatedData = await fetchMicroCmsBlogs({
    limit: 3,
    orderBy: 'publishedAt',
  });
  const relatedBlogs = relatedData.contents.filter((b) => b.id !== blog.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* パンくずリスト */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-[#84ab52] transition-colors">
              ホーム
            </Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/articles" className="hover:text-[#84ab52] transition-colors">
              記事一覧
            </Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-400 truncate">{blog.title || blog.name}</span>
          </nav>
        </div>
      </div>

      {/* 記事ヘッダー */}
      <article className="py-8 sm:py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          {/* カテゴリーと日付 */}
          <div className="flex items-center gap-4 text-sm mb-4 sm:mb-6">
            <span className="px-4 py-1.5 rounded-full bg-[#84ab52]/10 text-[#84ab52] font-medium">
              {categoryName}
            </span>
            <time className="text-gray-500 font-light">{formattedDate}</time>
          </div>

          {/* タイトル */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 leading-tight mb-8 sm:mb-10">
            {blog.title || blog.name || '無題'}
          </h1>

          {/* アイキャッチ画像 */}
          {blog.eyecatch?.url && (
            <div className="aspect-video w-full rounded-xl overflow-hidden mb-8 sm:mb-12 bg-gradient-to-br from-gray-100 to-gray-200 relative">
              <Image
                src={blog.eyecatch.url}
                alt={blog.title || blog.name || ''}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 896px"
                priority
              />
            </div>
          )}

          {/* 記事本文 */}
          <div
            className="prose prose-lg max-w-none
              prose-headings:font-light prose-headings:text-gray-900
              prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b prose-h2:border-gray-200
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
              prose-p:text-gray-800 prose-p:leading-relaxed prose-p:mb-6
              prose-a:text-[#84ab52] prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-900 prose-strong:font-semibold
              prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
              prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
              prose-li:text-gray-800 prose-li:mb-2 prose-li:leading-relaxed
              prose-img:rounded-lg prose-img:shadow-md
              prose-blockquote:border-l-4 prose-blockquote:border-[#84ab52] prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-700
              prose-code:text-[#84ab52] prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-gray-900 prose-pre:text-gray-100"
            dangerouslySetInnerHTML={{ __html: blog.content || '' }}
          />

          {/* 記事下部のアクション */}
          <div className="mt-12 sm:mt-16 pt-8 border-t border-gray-200">
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 text-[#84ab52] hover:text-[#6d9143] transition-colors font-light"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              記事一覧に戻る
            </Link>
          </div>
        </div>
      </article>

      {/* 関連記事 */}
      {relatedBlogs.length > 0 && (
        <section className="py-12 sm:py-16 bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-light text-gray-900 mb-8 sm:mb-10">
              関連記事
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {relatedBlogs.map((relatedBlog) => {
                const relatedCategory = relatedBlog.category?.name || '未分類';
                const relatedDate = new Date(relatedBlog.publishedAt).toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                });

                return (
                  <Link
                    key={relatedBlog.id}
                    href={`/articles/${relatedBlog.id}`}
                    className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="aspect-video w-full bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden relative">
                      {relatedBlog.eyecatch?.url ? (
                        <Image
                          src={relatedBlog.eyecatch.url}
                          alt={relatedBlog.title || relatedBlog.name || ''}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : null}
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                        <span className="px-3 py-1 rounded-full bg-[#84ab52]/10 text-[#84ab52] font-medium">
                          {relatedCategory}
                        </span>
                        <time className="font-light">{relatedDate}</time>
                      </div>
                      <h3 className="text-base sm:text-lg font-medium text-gray-900 leading-snug line-clamp-2 group-hover:text-[#84ab52] transition-colors">
                        {relatedBlog.title || relatedBlog.name || '無題'}
                      </h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
