import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <svg
            className="w-24 h-24 mx-auto text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="text-4xl sm:text-5xl font-light text-gray-900 mb-4">記事が見つかりません</h1>
        <p className="text-base sm:text-lg text-gray-600 mb-8 font-light leading-relaxed">
          お探しの記事は削除されたか、URLが間違っている可能性があります。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/articles"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#84ab52] text-white text-sm font-light tracking-wide hover:bg-[#6d9143] transition-colors duration-300"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            記事一覧に戻る
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-gray-300 text-gray-700 text-sm font-light tracking-wide hover:border-gray-400 hover:text-gray-900 transition-colors duration-300"
          >
            トップページへ
          </Link>
        </div>
      </div>
    </div>
  );
}
