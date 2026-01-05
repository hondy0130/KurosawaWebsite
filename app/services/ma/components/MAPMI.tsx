export default function MAPMI() {
  const mainServices = [
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      title: '連結決算支援',
      subtitle: 'IFRS対応',
      description:
        'ベトナム現地法規（VAS）から日本基準・IFRSへの組替対応を含め、親会社への連結決算報告をスムーズに実現します。',
      features: [
        'VAS→日本基準/IFRS組替',
        '連結パッケージ作成支援',
        '月次・四半期・年次決算対応',
        '監査法人対応サポート',
      ],
      highlight: 'IFRS',
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
      title: '連結パッケージ支援',
      subtitle: 'Consolidation Package',
      description:
        '親会社が求める連結パッケージの作成を代行。日本本社の経理部門との円滑なコミュニケーションをサポートします。',
      features: [
        '連結パッケージ作成代行',
        '勘定科目マッピング',
        '内部取引消去データ整備',
        '本社経理部門との調整',
      ],
      highlight: '代行',
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      title: 'J-SOX対応支援',
      subtitle: 'Internal Control',
      description:
        '日本の内部統制報告制度（J-SOX）に準拠した内部統制の整備・運用・評価をベトナム現地でサポートします。',
      features: [
        '内部統制文書化支援',
        'RCM・業務記述書作成',
        '統制テスト実施支援',
        '監査法人対応サポート',
      ],
      highlight: 'J-SOX',
    },
  ];

  const additionalServices = [
    {
      title: '経理体制構築',
      description: '買収後の経理部門の体制構築、業務フロー整備、人材育成を支援します。',
    },
    {
      title: '会計システム導入',
      description: '親会社システムとの連携を考慮した会計システムの選定・導入をサポートします。',
    },
    {
      title: '税務コンプライアンス',
      description: 'ベトナム税法に準拠した税務申告、移転価格対応を継続的にサポートします。',
    },
    {
      title: 'ガバナンス強化',
      description: '取締役会運営、株主総会対応、規程類整備などコーポレートガバナンスを強化します。',
    },
  ];

  return (
    <section
      id="pmi"
      className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white scroll-mt-24"
    >
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
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <span className="text-[#84ab52] text-sm font-medium tracking-wide">
              Post Merger Integration
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-800 mb-4">
            買収後（PMI）サポート
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            買収完了後の統合フェーズにおいて、特に日本本社への報告体制構築と
            内部統制対応を重点的にサポートします。
          </p>
        </div>

        {/* メインサービス（3つの柱） */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {mainServices.map((service, index) => (
            <div
              key={index}
              className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 group"
            >
              {/* ハイライトバッジ */}
              <div className="absolute -top-3 right-6">
                <span className="inline-block px-3 py-1 bg-[#84ab52] text-white text-xs font-medium tracking-wide rounded-full">
                  {service.highlight}
                </span>
              </div>

              {/* アイコン */}
              <div className="w-16 h-16 bg-gradient-to-br from-[#84ab52]/20 to-[#84ab52]/5 text-[#84ab52] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>

              {/* タイトル */}
              <h3 className="text-xl font-medium text-gray-800 mb-1">{service.title}</h3>
              <p className="text-xs text-[#84ab52] tracking-widest uppercase mb-4">
                {service.subtitle}
              </p>

              {/* 説明 */}
              <p className="text-gray-600 text-sm leading-relaxed mb-6">{service.description}</p>

              {/* 機能リスト */}
              <ul className="space-y-3">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-500">
                    <svg
                      className="w-5 h-5 text-[#84ab52] flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* PMIプロセス図 */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100 mb-16">
          <h3 className="text-xl font-medium text-gray-800 text-center mb-8">PMI実行フロー</h3>
          <div className="relative">
            {/* 接続線（デスクトップ） */}
            <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-[#84ab52]/30 via-[#84ab52] to-[#84ab52]/30"></div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
              {[
                { phase: 'Day 1', title: '初期統合', desc: '経営体制・報告ライン確立' },
                { phase: '〜3ヶ月', title: '体制構築', desc: '経理体制・システム整備' },
                { phase: '〜6ヶ月', title: '運用安定', desc: '月次決算・連結報告確立' },
                { phase: '〜12ヶ月', title: '最適化', desc: 'J-SOX対応・内部統制強化' },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-[#84ab52] text-white rounded-full flex items-center justify-center text-xs font-medium relative z-10">
                    {item.phase}
                  </div>
                  <h4 className="text-base font-medium text-gray-800 mb-1">{item.title}</h4>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* その他のPMIサービス */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 text-center mb-8">
            その他のPMIサポート
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl border border-gray-100 hover:border-[#84ab52]/30 hover:shadow-md transition-all duration-300"
              >
                <h4 className="text-base font-medium text-gray-800 mb-2">{service.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
