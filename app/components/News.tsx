import { fetchNiltoNews } from '../lib/nilto';

export default async function News() {
  let newsItems: { id: number; date: string; title: string; category: string }[] = [];

  try {
    const data = await fetchNiltoNews({ limit: 8 });
    newsItems = data.map((n) => ({
      id: n._id,
      title: n.title || n._title || '無題',
      date: new Date(n.date || n._published_at)
        .toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' })
        .replace(/\//g, '.'),
      category: n.category ?? 'お知らせ',
    }));
  } catch (error) {
    console.error('NILTO news 取得失敗:', error);
  }

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

  if (newsItems.length === 0) return null;

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
          {newsItems.map((news) => (
            <div
              key={news.id}
              className="block border-b border-gray-100 last:border-b-0"
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
                  <p className="text-sm sm:text-base md:text-lg font-medium text-gray-900 leading-relaxed">
                    {news.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

