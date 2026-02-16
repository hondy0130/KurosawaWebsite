import type { Metadata } from 'next';
import { fetchMicroCmsBlogs } from '../lib/microcms';
import Link from 'next/link';
import Image from 'next/image';

// ISR + Webhook のハイブリッド戦略
export const revalidate = 30;

export const metadata: Metadata = {
  title: '記事コラム',
  description:
    'ベトナムビジネスに関する最新情報やノウハウをお届けします。ベトナム進出、M&A、会計税務、法務労務など幅広いテーマの記事を掲載。',
  alternates: {
    canonical: 'https://www.kurosawa-vn.net/articles',
  },
  openGraph: {
    title: '記事コラム | Kurosawa Consulting Vietnam',
    description:
      'ベトナムビジネスに関する最新情報やノウハウをお届けします。ベトナム進出、M&A、会計税務、法務労務など幅広いテーマの記事を掲載。',
    url: 'https://www.kurosawa-vn.net/articles',
  },
};

export default async function ArticlesPage() {
  const data = await fetchMicroCmsBlogs({
    limit: 12,
    orderBy: 'publishedAt',
  });

  const blogs = data.contents;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヒーローセクション */}
      <section className="bg-gradient-to-br from-[#84ab52] to-[#6d9143] text-white py-16 sm:py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center">
            <p className="text-xs sm:text-sm md:text-base tracking-[0.3em] uppercase font-light mb-3 sm:mb-4">
              Articles & Blog
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-wide">
              記事コラム
            </h1>
            <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-white/90 max-w-2xl mx-auto font-light leading-relaxed">
              ベトナムビジネスに関する最新情報やノウハウをお届けします
            </p>
          </div>
        </div>
      </section>

      {/* 記事一覧 */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {blogs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-base sm:text-lg">記事がまだありません。</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {blogs.map((blog) => {
                const categoryName = blog.category?.name || '未分類';
                const formattedDate = new Date(blog.publishedAt).toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                });

                return (
                  <Link
                    key={blog.id}
                    href={`/articles/${blog.id}`}
                    className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300"
                  >
                    {/* アイキャッチ画像 */}
                    <div className="aspect-video w-full bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden relative">
                      {blog.eyecatch?.url ? (
                        <Image
                          src={blog.eyecatch.url}
                          alt={blog.title || blog.name || ''}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg
                            className="w-16 h-16 text-gray-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* 記事情報 */}
                    <div className="p-5 sm:p-6">
                      <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                        <span className="px-3 py-1 rounded-full bg-[#84ab52]/10 text-[#84ab52] font-medium">
                          {categoryName}
                        </span>
                        <time className="font-light">{formattedDate}</time>
                      </div>
                      <h2 className="text-lg sm:text-xl font-medium text-gray-900 leading-snug line-clamp-2 group-hover:text-[#84ab52] transition-colors">
                        {blog.title || blog.name || '無題'}
                      </h2>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* ページネーション（将来的に実装） */}
          {data.totalCount > 12 && (
            <div className="mt-12 flex justify-center">
              <p className="text-sm text-gray-500">
                全{data.totalCount}件中 {Math.min(12, data.totalCount)}件を表示
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
