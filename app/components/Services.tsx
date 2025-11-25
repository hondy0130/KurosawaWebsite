type ServiceItem = {
  title: string;
  subtitle: string;
  titleLines?: string[];
  description: string;
  borderGradient: string;
  bgClass: string;
  glow: string;
  accentStrong: string;
  accentSoft: string;
  notes?: string[];
};

export default function Services() {
  const services: ServiceItem[] = [
    {
      title: 'ベトナム進出支援',
      subtitle: '01 VIETNAM ENTRY',
      titleLines: ['日本企業の', 'ベトナム進出を', 'ワンストップ支援'],
      description:
        '市場調査・進出戦略・法人設立・許認可・採用・バックオフィスまで。現地の制度と商習慣に精通したチームが、戦略から実行まで伴走します。',
      borderGradient: 'linear-gradient(135deg, #84ab52, #a0c870) 1',
      bgClass: '',
      glow: 'rgba(44,95,45,0.22)',
      accentStrong: 'rgba(102,187,106,0.40)',
      accentSoft: 'rgba(165,214,167,0.25)',
      notes: [],
    },
    {
      title: 'M&A支援',
      subtitle: '02 M&A SUPPORT',
      titleLines: ['クロスボーダーM&Aを', '戦略立案からPMIまで', '一気通貫で'],
      description:
        'ターゲット探索・DD・バリュエーション・契約実務・PMI設計まで。日本本社とベトナム現地の双方に通じたチームで、意思決定と推進を高速化します。',
      borderGradient: 'linear-gradient(135deg, #84ab52, #a0c870) 1',
      bgClass: '',
      glow: 'rgba(132,171,82,0.22)',
      accentStrong: 'rgba(132,171,82,0.42)',
      accentSoft: 'rgba(160,200,112,0.22)',
    },
    {
      title: 'ベトナム会計業務',
      subtitle: '03 ACCOUNTING',
      titleLines: ['ベトナム会計・税務を', '現地基準で', '正確かつスムーズに'],
      description:
        '帳簿作成・月次/年次決算・税務申告・監査対応・日本連結レポーティングまで。現地基準と日本基準の「橋渡し」をワンチームで提供します。',
      borderGradient: 'linear-gradient(135deg, #424242, #9E9E9E) 1',
      bgClass: '',
      glow: 'rgba(120,120,120,0.22)',
      accentStrong: 'rgba(158,158,158,0.40)',
      accentSoft: 'rgba(224,224,224,0.25)',
    },
  ];

  return (
    <section id="services" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-white">
      {/* セクションヘッダー - 上品で控えめ */}
      <div className="text-center mb-12 sm:mb-16 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <p className="text-xs sm:text-sm md:text-base text-[#84ab52] tracking-[0.25em] sm:tracking-[0.3em] uppercase font-light mb-2 sm:mb-3">
          Services
        </p>
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-gray-600 tracking-wide">
          サービス紹介
        </h2>
      </div>

      {/* Alternating media sections: Text/Image → Image/Text → Text/Image */}
      <div className="px-6 sm:px-8 lg:px-12">
        <div className="space-y-0 max-w-none">
          {services.slice(0, 3).map((service, index) => {
            const isEven = index % 2 === 0; // 0,2: Text Left / Media Right
            return (
              <section key={index} className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
                {/* Text block */}
                <div
                  className={`${isEven ? 'order-2 md:order-1' : 'order-2 md:order-2'} h-[320px] md:h-[450px] lg:h-[520px] flex`}
                >
                  <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 my-auto">
                    <p className="text-[10px] sm:text-[11px] md:text-xs tracking-[0.3em] sm:tracking-[0.35em] uppercase text-black/60">
                      {service.subtitle}
                    </p>
                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-black leading-tight">
                      {service.titleLines?.map((line: string, i: number) => (
                        <span key={i} className="block">
                          {line}
                        </span>
                      )) || service.title}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg text-black/70 leading-relaxed max-w-prose">
                      {service.description}
                    </p>
                    <a
                      href={`/services/${index + 1}`}
                      className="inline-flex items-center justify-center bg-[#2B2C30] text-white px-8 sm:px-10 py-2.5 sm:py-3 text-xs sm:text-sm tracking-wide transition-colors hover:bg-black select-none"
                    >
                      View more
                    </a>
                    {Array.isArray(service.notes) && service.notes.length > 0 && (
                      <div className="pt-2 sm:pt-3 space-y-1">
                        {service.notes.map((n, i) => (
                          <p
                            key={i}
                            className="text-[9px] sm:text-[10px] md:text-xs text-black/50 leading-relaxed"
                          >
                            {n}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Media block（ダミー：抽象グラデーション） */}
                <div
                  className={`${isEven ? 'order-1 md:order-2' : 'order-1 md:order-1'} h-[320px] md:h-[520px]`}
                >
                  <div className="relative h-full w-full overflow-hidden">
                    {/* Hero風：白ベース＋大きなボケ足のカラーブロブ（角丸・枠なし） */}
                    <div className="absolute inset-0 bg-white"></div>
                    <div
                      className="absolute top-0 right-0 w-[900px] h-[900px] rounded-full blur-3xl"
                      style={{
                        background: `radial-gradient(closest-side, ${service.accentStrong}, transparent)`,
                      }}
                    ></div>
                    <div
                      className="absolute bottom-0 left-0 w-[700px] h-[700px] rounded-full blur-3xl"
                      style={{
                        background: `radial-gradient(closest-side, ${service.accentSoft}, transparent)`,
                      }}
                    ></div>
                    <div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full blur-3xl"
                      style={{
                        background: `radial-gradient(closest-side, ${service.accentSoft}, transparent)`,
                      }}
                    ></div>
                    {/* ごく薄いライン */}
                    <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-black/10 to-transparent"></div>
                  </div>
                </div>
              </section>
            );
          })}
          <div className="mt-12 sm:mt-16 flex justify-center">
            <a
              href="/services"
              className="inline-block px-8 sm:px-10 md:px-12 py-3 sm:py-3.5 md:py-4 bg-[#84ab52] text-white text-xs sm:text-sm md:text-base font-light tracking-[0.2em] sm:tracking-widest hover:bg-[#6d9143] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              サービス一覧を表示
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
