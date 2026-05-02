import { fetchNiltoArticles } from '../lib/nilto';
import Link from 'next/link';
import Image from 'next/image';

export default async function Articles() {
  let articles: {
    id: number;
    title: string;
    date: string;
    thumb: string;
    alt: string;
  }[] = [];

  try {
    const data = await fetchNiltoArticles({ limit: 6, order: '-_published_at' });
    articles = data.data.map((a) => ({
      id: a._id,
      title: a.title || a._title || '無題',
      date: new Date(a._published_at)
        .toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' })
        .replace(/\//g, '-'),
      thumb: a.eyecatch?.url ?? '',
      alt: a.eyecatch?.alt ?? '',
    }));
  } catch (error) {
    console.error('NILTO articles 取得失敗:', error);
  }

  if (articles.length === 0) {
    return (
      <section id="articles" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-white">
        <div className="px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-10 sm:mb-12 md:mb-14 lg:mb-16">
            <p className="text-xs sm:text-sm md:text-base text-[#84ab52] tracking-[0.25em] sm:tracking-[0.3em] uppercase font-light mb-2 sm:mb-3">
              Articles
            </p>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-gray-600 tracking-wide">
              記事・コラム
            </h2>
          </div>
          <div className="text-center text-gray-500">記事はまだありません。</div>
        </div>
      </section>
    );
  }

  return (
    <section id="articles" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-white">
      <div className="px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-10 sm:mb-12 md:mb-14 lg:mb-16">
          <p className="text-xs sm:text-sm md:text-base text-[#84ab52] tracking-[0.25em] sm:tracking-[0.3em] uppercase font-light mb-2 sm:mb-3">
            Articles
          </p>
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-gray-600 tracking-wide">
            記事・コラム
          </h2>
        </div>

        <div className="relative">
          <div
            id="articles-track"
            className="flex gap-4 sm:gap-5 md:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {articles.map((a) => (
              <Link
                key={a.id}
                href={`/articles/${a.id}`}
                className="min-w-[280px] sm:min-w-[320px] md:min-w-[380px] lg:min-w-[420px] max-w-[420px] snap-start bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition cursor-pointer"
              >
                <div className="aspect-video w-full bg-gradient-to-br from-gray-100 to-gray-200 relative">
                  {a.thumb ? (
                    <Image
                      src={a.thumb}
                      alt={a.alt || a.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, (max-width: 1024px) 380px, 420px"
                    />
                  ) : null}
                </div>
                <div className="p-4 sm:p-5">
                  <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-gray-500 mb-2">
                    <time className="text-[10px] sm:text-xs">{a.date}</time>
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-medium text-gray-900 leading-snug line-clamp-2">
                    {a.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-6 sm:mt-8 text-center">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-2.5 sm:py-3 border border-[#6B6B6B] text-[#6B6B6B] text-xs sm:text-sm md:text-base font-light tracking-wide hover:border-[#2E2E2E] hover:text-[#2E2E2E] transition-colors duration-300"
          >
            記事一覧を見る
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
