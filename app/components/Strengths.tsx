export default function Strengths() {
  const items = [
    {
      title: '品質は大手並み、料金はリーズナブル',
      body: '我々スタッフの大半はBig4と呼ばれる大手コンサルティングファームで専門知識を積んできたメンバーです。　品質は大手並みを遵守しつつリーズナブルな料金体系でサービスをご提供しております。',
    },
    {
      title: '言語の壁を完全に払拭したサポート体制',
      body: '日本人3名がベトナムに常駐、N2（日本語検定2級）以上の日本語能力を持ったベトナム人会計士および専門家が5名以上在籍しており、クライアントに言語の壁を感じさせないサポート体制をご用意しております。',
    },
    {
      title: '確かなベトナム当局交渉力、ワンストップサポート',
      body: '自社で会計士と弁護士が在籍しているためワンストップでサポート可能です。　またベトナム当局で勤務経験のある弁護士も在籍しているため、確かな当局交渉力でサポートさせていただきます。',
    },
  ];

  return (
    <section
      id="strengths"
      className="py-16 sm:py-20 md:py-24 lg:py-28 bg-gradient-to-b from-white via-[#f3f8f1] to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 md:mb-14">
          <p className="text-xs sm:text-sm md:text-base text-[#84ab52] tracking-[0.25em] sm:tracking-[0.3em] uppercase font-light mb-2 sm:mb-3">
            Strengths
          </p>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-light text-gray-700 tracking-wide">
            私たちの強み
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="bg-white/95 rounded-2xl border border-[#dde7d7] shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 px-6 py-7 sm:px-7 sm:py-8"
            >
              <h3 className="text-base sm:text-lg font-extrabold text-[#84ab52] mb-3 sm:mb-4">
                {item.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
