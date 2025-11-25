export default function Strengths() {
  const items = [
    {
      title: 'ローカル知見と実行力',
      body: '現地法令・商習慣に通じた実務チームが、戦略から実行まで伴走します。',
    },
    {
      title: '日系ガバナンス準拠',
      body: '日本本社の意思決定に耐える透明なレポーティングと内部統制を徹底。',
    },
    {
      title: 'ワンストップ対応',
      body: '進出・設立・会計税務・採用・PMOまで一気通貫。スピードと確実性を両立。',
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
              <h3 className="text-base font-medium text-[#2E2E2E] mb-3">{item.title}</h3>
              <p className="text-sm text-[#5A5A5A] leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
