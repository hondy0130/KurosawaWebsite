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
    <section id="strengths" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm text-[#84ab52] tracking-[0.3em] uppercase font-light mb-2">
            Strengths
          </p>
          <h2 className="text-xl md:text-2xl font-light text-gray-600 tracking-wide">
            私たちの強み
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="border border-gray-100 rounded-xl p-6 hover:shadow-sm transition-shadow"
            >
              <h3 className="text-base font-medium text-[#2E2E2E] mb-3">
                <span className="text-[#84ab52] font-bold">{item.title}</span>
              </h3>
              <p className="text-sm text-[#5A5A5A] leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
