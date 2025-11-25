export default function News() {
  const newsItems = [
    {
      date: '2025.10.05',
      category: 'プレスリリース',
      title: '新オフィス開設のお知らせ - 大阪支社オープン',
      link: '#',
    },
    {
      date: '2025.09.28',
      category: 'メディア掲載',
      title: '日経ビジネス誌にてDX推進事例が紹介されました',
      link: '#',
    },
    {
      date: '2025.09.15',
      category: 'セミナー',
      title: '経営戦略セミナー「2025年の成長戦略」開催のご案内',
      link: '#',
    },
    {
      date: '2025.09.01',
      category: 'お知らせ',
      title: '採用情報を更新しました - 経験者採用強化中',
      link: '#',
    },
    {
      date: '2025.08.20',
      category: '受賞',
      title: 'ベストコンサルティング企業賞2025を受賞',
      link: '#',
    },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'プレスリリース':
        return 'bg-[#84ab52] text-white';
      case 'メディア掲載':
        return 'bg-[#4CAF50] text-white';
      case 'セミナー':
        return 'bg-[#757575] text-white';
      case '受賞':
        return 'bg-[#84ab52] text-white';
      default:
        return 'bg-gray-200 text-gray-700';
    }
  };

  return (
    <section id="news" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* セクションヘッダー */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <p className="text-xs sm:text-sm md:text-base text-[#84ab52] tracking-[0.25em] sm:tracking-[0.3em] uppercase font-light mb-2 sm:mb-3">
            News
          </p>
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-gray-600 tracking-wide">
            お知らせ
          </h2>
        </div>

        {/* ニュースリスト */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {newsItems.map((news, index) => (
            <a
              key={index}
              href={news.link}
              className="block border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
            >
              <div className="p-4 sm:p-5 md:p-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-3 sm:gap-4 sm:w-1/3">
                  <time className="text-xs sm:text-sm md:text-base font-medium text-gray-500 whitespace-nowrap">
                    {news.date}
                  </time>
                  <span
                    className={`px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs md:text-sm font-medium rounded-full whitespace-nowrap ${getCategoryColor(news.category)}`}
                  >
                    {news.category}
                  </span>
                </div>
                <div className="flex-1 sm:w-2/3">
                  <h3 className="text-sm sm:text-base md:text-lg font-medium text-gray-900 hover:text-[#84ab52] transition-colors leading-relaxed">
                    {news.title}
                  </h3>
                </div>
                <div className="hidden sm:block">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
