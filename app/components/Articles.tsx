export default function Articles() {
  const articles = [
    {
      title: 'ベトナム南部ハイテク投資の最新動向 2025',
      category: '市場動向',
      date: '2025-10-12',
      thumb: '/thumbs/vn_market_01.jpg',
    },
    {
      title: '日系企業のベトナム子会社PMIの実務ポイント',
      category: 'M&A',
      date: '2025-10-08',
      thumb: '/thumbs/vn_ma_01.jpg',
    },
    {
      title: 'ホーチミンの会計・税務アップデート Q4/2025',
      category: '会計・税務',
      date: '2025-10-05',
      thumb: '/thumbs/vn_tax_01.jpg',
    },
    {
      title: '現地採用と人材育成：離職率を抑えるマネジメント',
      category: '人材',
      date: '2025-09-29',
      thumb: '/thumbs/vn_hr_01.jpg',
    },
    {
      title: 'ベトナム進出チェックリスト：設立前に確認すべき20項目',
      category: '進出',
      date: '2025-09-20',
      thumb: '/thumbs/vn_entry_01.jpg',
    },
  ];

  return (
    <section id="articles" className="py-20 bg-white">
      <div className="px-4 sm:px-6 lg:px-8">
        {/* セクションヘッダー */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-sm text-[#C8102E] tracking-[0.3em] uppercase font-light mb-2">
            Articles
          </p>
          <h2 className="text-xl md:text-2xl font-light text-gray-600 tracking-wide">
            記事・コラム
          </h2>
        </div>

        {/* カルーセル */}
        <div className="relative">
          {/* 横スクロール */}
          <div
            id="articles-track"
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {articles.map((a, idx) => (
              <article
                key={idx}
                className="min-w-[300px] md:min-w-[420px] max-w-[420px] snap-start bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition"
              >
                {/* サムネイル（ダミー画像パス。なければグラデ） */}
                <div className="aspect-video w-full bg-gradient-to-br from-gray-100 to-gray-200">
                  {/* 実画像に差替える場合: <img src={a.thumb} alt="" className="w-full h-full object-cover" /> */}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                    <span className="px-2 py-1 rounded-full border border-gray-200 text-gray-600">
                      {a.category}
                    </span>
                    <time>{a.date}</time>
                  </div>
                  <h3 className="text-lg md:text-xl font-medium text-gray-900 leading-snug line-clamp-2">
                    {a.title}
                  </h3>
                </div>
              </article>
            ))}
          </div>

          {/* 矢印ナビは削除（サーバーコンポーネント対応）。横スクロールで操作） */}
        </div>
        {/* 一覧ボタン */}
        <div className="mt-8 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-3 px-8 py-3 border border-[#6B6B6B] text-[#6B6B6B] text-sm font-light tracking-wide hover:border-[#2E2E2E] hover:text-[#2E2E2E]"
          >
            記事一覧を見る
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
