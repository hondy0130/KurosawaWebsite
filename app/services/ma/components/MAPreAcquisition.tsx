export default function MAPreAcquisition() {
  const steps = [
    {
      step: '01',
      title: '戦略策定',
      subtitle: 'Strategy Planning',
      description: 'M&Aの目的を明確化し、ターゲット企業の条件（業種・規模・地域等）を定義します。',
      details: [
        'M&A目的・ゴールの整理',
        'ターゲット条件の定義',
        '投資予算・スケジュール策定',
        'ストラクチャーの検討',
      ],
    },
    {
      step: '02',
      title: 'ターゲット探索',
      subtitle: 'Target Sourcing',
      description:
        'ベトナム市場における最適なM&A候補先を発掘し、ロングリスト・ショートリストを作成します。',
      details: [
        'ロングリスト作成',
        '候補先へのアプローチ',
        'ノンネームシート提示',
        '秘密保持契約締結',
      ],
    },
    {
      step: '03',
      title: '初期検討・交渉',
      subtitle: 'Initial Negotiation',
      description: '候補先との初期面談・情報交換を行い、基本条件について協議します。',
      details: ['マネジメント面談', '初期情報の分析', '基本条件の協議', 'LOI（意向表明書）締結'],
    },
    {
      step: '04',
      title: 'デューデリジェンス',
      subtitle: 'Due Diligence',
      description: '財務・税務・法務の観点から詳細調査を実施し、リスクと価値を精査します。',
      details: [
        '財務デューデリジェンス',
        '税務デューデリジェンス',
        '法務デューデリジェンス',
        'ビジネスDD（必要に応じて）',
      ],
    },
    {
      step: '05',
      title: 'バリュエーション',
      subtitle: 'Valuation',
      description: '複数の手法を用いて適正な企業価値を算定し、価格交渉の根拠を提供します。',
      details: ['DCF法による評価', '類似会社比較法', '純資産法', '価格レンジの提示'],
    },
    {
      step: '06',
      title: '契約締結・クロージング',
      subtitle: 'Closing',
      description: '最終契約書の作成・締結から、行政手続き・登記変更までをサポートします。',
      details: [
        'SPA・SHA等の契約書作成',
        '最終交渉・条件調整',
        '行政手続き・届出',
        '登記変更・株式譲渡実行',
      ],
    },
  ];

  return (
    <section id="pre-acquisition" className="py-20 md:py-28 bg-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* セクションヘッダー */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#84ab52]/10 rounded-full mb-4">
            <svg
              className="w-5 h-5 text-[#84ab52]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <span className="text-[#84ab52] text-sm font-medium tracking-wide">
              Pre-Acquisition
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-800 mb-4">
            買収前サポート
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            戦略策定からクロージングまで、M&Aプロセスの各ステップを
            経験豊富な専門家チームがサポートします。
          </p>
        </div>

        {/* ステップ一覧 */}
        <div className="relative">
          {/* 縦線（デスクトップ） */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#84ab52] via-[#84ab52]/50 to-[#84ab52]/20"></div>

          <div className="space-y-8 lg:space-y-0">
            {steps.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={index}
                  className={`lg:grid lg:grid-cols-2 lg:gap-12 items-center ${
                    index !== steps.length - 1 ? 'lg:pb-16' : ''
                  }`}
                >
                  {/* コンテンツ */}
                  <div
                    className={`${
                      isEven ? 'lg:order-1 lg:text-right lg:pr-12' : 'lg:order-2 lg:pl-12'
                    }`}
                  >
                    <div
                      className={`bg-gray-50 p-6 md:p-8 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow duration-300 ${isEven ? 'lg:ml-auto' : ''}`}
                    >
                      <div
                        className={`flex items-center gap-4 mb-4 ${isEven ? 'lg:flex-row-reverse' : ''}`}
                      >
                        <div className="w-12 h-12 bg-[#84ab52] text-white rounded-full flex items-center justify-center text-lg font-light flex-shrink-0">
                          {item.step}
                        </div>
                        <div className={isEven ? 'lg:text-right' : ''}>
                          <h3 className="text-xl font-medium text-gray-800">{item.title}</h3>
                          <p className="text-xs text-[#84ab52] tracking-widest uppercase">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>
                      <p
                        className={`text-gray-600 mb-4 leading-relaxed ${isEven ? 'lg:text-right' : ''}`}
                      >
                        {item.description}
                      </p>
                      <ul className={`space-y-2 ${isEven ? 'lg:text-right' : ''}`}>
                        {item.details.map((detail, i) => (
                          <li
                            key={i}
                            className={`flex items-center gap-2 text-sm text-gray-500 ${isEven ? 'lg:flex-row-reverse' : ''}`}
                          >
                            <span className="w-1.5 h-1.5 bg-[#84ab52] rounded-full flex-shrink-0"></span>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* 中央のドット（デスクトップのみ） */}
                  <div
                    className={`hidden lg:flex ${isEven ? 'lg:order-2' : 'lg:order-1'} justify-center`}
                  >
                    <div className="w-4 h-4 bg-[#84ab52] rounded-full ring-4 ring-[#84ab52]/20"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* サービス特徴 */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          {[
            {
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              ),
              title: '日越バイリンガルチーム',
              description: '日本とベトナム両国のビジネス慣習・法制度に精通した専門家が対応します。',
            },
            {
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              ),
              title: 'ワンストップサービス',
              description:
                '戦略策定からクロージングまで、すべてのフェーズを一貫してサポートします。',
            },
            {
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              ),
              title: 'スピーディーな対応',
              description:
                '現地に常駐するチームが、タイムリーな情報収集と迅速な意思決定を支援します。',
            },
          ].map((feature, index) => (
            <div key={index} className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#84ab52]/10 text-[#84ab52] rounded-full mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
