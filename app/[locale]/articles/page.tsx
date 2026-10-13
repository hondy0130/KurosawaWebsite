import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { fetchNiltoArticles } from '../../lib/nilto';
import { pageMetadata } from '../../lib/seo';
import { Link } from '@/i18n/navigation';
import { DATE_LOCALES, type Locale } from '@/i18n/routing';

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ArticlesPage' });
  return pageMetadata({
    locale: locale as Locale,
    path: '/articles',
    title: t('metaTitle'),
    description: t('metaDescription'),
  });
}

const LIMIT = 12;

export default async function ArticlesPage({ params, searchParams }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('ArticlesPage');
  const ta = await getTranslations('Articles');

  const { page } = await searchParams;
  const currentPage = Math.max(1, parseInt(page ?? '1', 10));
  const offset = (currentPage - 1) * LIMIT;

  let articles: {
    id: number;
    title: string;
    date: string;
    thumb: string;
    alt: string;
  }[] = [];
  let total = 0;

  try {
    const data = await fetchNiltoArticles({ limit: LIMIT, offset, order: '-_published_at' });
    total = data.total;
    articles = data.data.map((a) => ({
      id: a._id,
      title: a.title || a._title || ta('untitled'),
      date: new Date(a._published_at)
        .toLocaleDateString(DATE_LOCALES[locale as Locale], {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
        .replace(/\//g, '-'),
      thumb: a.eyecatch?.url ?? '',
      alt: a.eyecatch?.alt ?? '',
    }));
  } catch (error) {
    console.error('NILTO articles 取得失敗:', error);
  }

  const totalPages = Math.ceil(total / LIMIT);

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-24 sm:pt-28 pb-16 sm:pb-20 md:pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* ヘッダー */}
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-xs sm:text-sm text-[#84ab52] tracking-[0.25em] uppercase font-light mb-2 sm:mb-3">
              Articles
            </p>
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-gray-600 tracking-wide">
              {ta('heading')}
            </h1>
            {/* 記事本文は日本語のみのため、他言語では注記を表示 */}
            {ta('notice') && (
              <p className="mt-3 text-xs sm:text-sm text-gray-400">{ta('notice')}</p>
            )}
          </div>

          {/* 記事グリッド */}
          {articles.length === 0 ? (
            <p className="text-center text-gray-500 py-20">{ta('empty')}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {articles.map((a) => (
                <Link
                  key={a.id}
                  href={`/articles/${a.id}`}
                  className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-video w-full bg-gradient-to-br from-gray-100 to-gray-200 relative">
                    {a.thumb ? (
                      <Image
                        src={a.thumb}
                        alt={a.alt || a.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : null}
                  </div>
                  <div className="p-4 sm:p-5">
                    <time className="text-xs text-gray-400 mb-2 block">{a.date}</time>
                    <h2 className="text-sm sm:text-base font-medium text-gray-900 leading-snug line-clamp-2 group-hover:text-[#84ab52] transition-colors">
                      {a.title}
                    </h2>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* ページネーション */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center gap-2">
              {currentPage > 1 && (
                <Link
                  href={`/articles?page=${currentPage - 1}`}
                  className="px-4 py-2 border border-gray-300 text-sm text-gray-600 hover:border-[#84ab52] hover:text-[#84ab52] transition-colors"
                >
                  {t('prev')}
                </Link>
              )}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Link
                  key={p}
                  href={`/articles?page=${p}`}
                  className={`px-4 py-2 border text-sm transition-colors ${
                    p === currentPage
                      ? 'border-[#84ab52] bg-[#84ab52] text-white'
                      : 'border-gray-300 text-gray-600 hover:border-[#84ab52] hover:text-[#84ab52]'
                  }`}
                >
                  {p}
                </Link>
              ))}
              {currentPage < totalPages && (
                <Link
                  href={`/articles?page=${currentPage + 1}`}
                  className="px-4 py-2 border border-gray-300 text-sm text-gray-600 hover:border-[#84ab52] hover:text-[#84ab52] transition-colors"
                >
                  {t('next')}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
