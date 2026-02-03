'use client';

export default function Achievement() {
  const stats = [
    { value: '40', suffix: '名', label: 'スタッフ人数' },
    { value: '8', suffix: '名', label: '日本語話者' },
    { value: '280', suffix: '社超', label: '取引実績' },
    { value: '75', suffix: '社超', label: '顧問先' },
    { value: '70', suffix: '％', label: '日系企業取引（中華系20％、韓国＆欧米系10％）' },
    { value: '5', suffix: '名', label: '公認会計士数（うち日本国2名）' },
    { value: '2', suffix: '名', label: '弁護士数' },
    { value: '7', suffix: '％', label: '過去5年平均 年間顧問契約純増率' },
  ];

  return (
    <section
      id="achievement"
      className="py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-b from-[#f6f7f6] via-[#eef4ea] to-[#f6f7f6] overflow-hidden"
    >
      <div className="w-full">
        {/* セクションヘッダー - 数字で見るセクション */}
        <div className="text-center mb-10 sm:mb-12 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <p className="text-xs sm:text-sm md:text-base text-[#84ab52] tracking-[0.25em] sm:tracking-[0.3em] uppercase font-light mb-2 sm:mb-3">
            By the Numbers
          </p>
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-gray-600 tracking-wide">
            Number of Kurosawa Consulting Vietnam
          </h2>
        </div>

        {/* 統計情報 - サービスカードとトーンを合わせて強調 */}
        <div className="mt-24 lg:mt-32 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 lg:gap-16">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center group bg-white/95 rounded-2xl border border-[#dde7d7] shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 px-4 py-6 sm:px-5 sm:py-7"
              >
                {/* 数値部分 */}
                <div className="mb-2 sm:mb-3 group-hover:scale-105 transition-transform duration-300">
                  <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#6f9b3e] tracking-tight">
                    {stat.value}
                  </span>
                  <span className="ml-1 text-lg sm:text-xl md:text-2xl lg:text-3xl font-normal text-gray-700">
                    {stat.suffix}
                  </span>
                </div>
                {/* ラベル部分 */}
                <div className="text-sm sm:text-base md:text-base text-gray-600 tracking-wide font-light leading-relaxed px-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
