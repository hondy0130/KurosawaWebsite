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
    <section id="achievement" className="pt-20 pb-32 bg-[#F8F8F8] overflow-hidden">
      <div className="w-full">
        {/* セクションヘッダー - 上品で控えめ */}
        <div className="text-center mb-16 max-w-7xl mx-auto px-8">
          <p className="text-sm text-[#C8102E] tracking-[0.3em] uppercase font-light mb-2">
            Case Studies
          </p>
          <h2 className="text-xl md:text-2xl font-light text-gray-600 tracking-wide">
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
                  className="flex-shrink-0 px-16 py-12 flex items-center justify-center"
                  style={{ minWidth: '320px' }}
                >
                  <div className="text-xl md:text-2xl font-light text-gray-500 tracking-[0.3em] opacity-60 hover:opacity-100 hover:text-gray-700 transition-all duration-500 uppercase">
                    {client}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 統計情報 - よりミニマルに */}
        <div className="mt-32 max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-5xl lg:text-6xl font-extralight text-gray-800 mb-3 tracking-tight group-hover:text-[#C8102E] transition-colors duration-300">
                  {stat.value}<span className="text-3xl">{stat.suffix}</span>
                </div>
                <div className="text-[10px] text-gray-400 tracking-[0.2em] font-light">
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
