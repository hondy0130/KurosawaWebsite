import { getTranslations } from 'next-intl/server';

type Item = { title: string; body: string };

export default async function Strengths() {
  const t = await getTranslations('Strengths');
  const items = t.raw('items') as Item[];

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
            {t('heading')}
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
