'use client';

export default function Achievement() {
  // ダミーのクライアント企業ロゴ（テキストベース）
  const clients = [
    'AEON VIETNAM',
    'PANASONIC VIETNAM',
    'HONDA VIETNAM',
    'TOYOTA VIETNAM',
    'MITSUBISHI ELECTRIC',
    'SUMITOMO VIETNAM',
    'AJINOMOTO VIETNAM',
    'DAIKIN VIETNAM',
    'HITACHI VIETNAM',
    'NISSAN VIETNAM',
    'BRIDGESTONE VIETNAM',
    'FUJITSU VIETNAM',
    'SONY VIETNAM',
    'MUJI VIETNAM',
    'UNIQLO VIETNAM',
  ];

  // ロゴを2回繰り返して無限スクロールを実現
  const repeatedClients = [...clients, ...clients];

  const stats = [
    { value: '40', suffix: '名', label: 'スタッフ人数' },
    { value: '8', suffix: '名', label: '日本語話者' },
    { value: '280', suffix: '社超', label: '取引実績' },
    { value: '75', suffix: '社超', label: '顧問先' },
    { value: '70', suffix: '％', label: '日系企業取引（中華系20％、韓国＆欧米系10％）' },
    { value: '5', suffix: '名', label: '公認会計士数（うち日本国2名）' },
    { value: '2', suffix: '名', label: '弁護士数' },
  ];

  return (
    <section
      id="achievement"
      className="py-16 sm:py-20 md:py-24 lg:py-32 bg-[#F8F8F8] overflow-hidden"
    >
      <div className="w-full">
        {/* セクションヘッダー - 上品で控えめ */}
        <div className="text-center mb-12 sm:mb-16 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <p className="text-xs sm:text-sm md:text-base text-[#84ab52] tracking-[0.25em] sm:tracking-[0.3em] uppercase font-light mb-2 sm:mb-3">
            Case Studies
          </p>
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-gray-600 tracking-wide">
            クライアント企業実績
          </h2>
        </div>

        {/* ロゴスクロールエリア */}
        <div className="relative">
          {/* グラデーションオーバーレイ（左右をフェード） */}
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-[#F8F8F8] to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-[#F8F8F8] to-transparent z-10"></div>

          {/* スクロールコンテナ */}
          <div className="flex overflow-hidden">
            <div className="flex animate-scroll-left">
              {repeatedClients.map((client, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 px-12 sm:px-16 py-10 sm:py-12 flex items-center justify-center"
                  style={{ minWidth: '280px', maxWidth: '320px' }}
                >
                  <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-light text-gray-500 tracking-[0.2em] sm:tracking-[0.3em] opacity-60 hover:opacity-100 hover:text-gray-700 transition-all duration-500 uppercase">
                    {client}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 統計情報 - フォントサイズ最適化 */}
        <div className="mt-24 lg:mt-32 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 lg:gap-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                {/* 数値部分 */}
                <div className="mb-3 sm:mb-4 group-hover:scale-105 transition-transform duration-300">
                  <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight text-gray-800 tracking-tight group-hover:text-[#84ab52] transition-colors duration-300">
                    {stat.value}
                  </span>
                  <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-gray-700 group-hover:text-[#84ab52] transition-colors duration-300">
                    {stat.suffix}
                  </span>
                </div>
                {/* ラベル部分 */}
                <div className="text-[11px] sm:text-xs md:text-sm text-gray-500 tracking-wide font-light leading-relaxed px-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 40s linear infinite;
        }

        .animate-scroll-left:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
