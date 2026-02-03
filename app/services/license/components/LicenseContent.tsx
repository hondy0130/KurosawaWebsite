'use client';

import { useState, useEffect } from 'react';

const navItems = [
  { id: 'overview', label: 'サービス概要' },
  { id: 'flow', label: '申請の流れ' },
  { id: 'support', label: 'サポート内容' },
  { id: 'budget', label: '参考予算' },
  { id: 'faq', label: 'よくある質問' },
];

const flowSteps = [
  {
    number: '01',
    title: '要件確認・準備',
    description: '必要なライセンスと要件の確認',
    duration: '1〜2週間',
    details: [
      '事業内容のヒアリング',
      '必要ライセンスの特定',
      '申請要件の確認',
      '必要書類リストの作成',
    ],
  },
  {
    number: '02',
    title: '書類準備・作成',
    description: '申請書類の準備と作成',
    duration: '2〜4週間',
    details: ['申請書類の作成', '翻訳・公証手続き', '必要書類の収集', '書類の最終確認'],
  },
  {
    number: '03',
    title: '申請・審査',
    description: '当局への申請と審査対応',
    duration: '2〜8週間',
    details: ['申請書類の提出', '審査状況のフォロー', '追加資料の対応', '当局との折衝'],
  },
  {
    number: '04',
    title: 'ライセンス取得',
    description: 'ライセンス発行と事後手続き',
    duration: '1〜2週間',
    details: ['ライセンスの受領', '内容の確認', '関連届出の実施', '更新スケジュールの管理'],
  },
];

const supportItems = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
    ),
    title: '投資登録証明書（IRC）',
    description: '外国投資プロジェクトの登録証明書を取得します。',
    features: ['新規投資登録', '登録内容の変更', '増資手続き', '事業範囲の追加'],
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
    title: '事業登録証明書（ERC）',
    description: '法人設立に必要な事業登録証明書を取得します。',
    features: ['新規事業登録', '事業内容の変更', '代表者変更', '住所変更'],
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
        />
      </svg>
    ),
    title: '業種別ライセンス',
    description: '業種に応じた各種許認可を取得します。',
    features: ['製造業ライセンス', '小売業ライセンス', '輸出入ライセンス', '食品関連許可'],
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
        />
      </svg>
    ),
    title: '労働許可証',
    description: '外国人従業員の労働許可証を取得します。',
    features: ['労働許可証申請', '労働許可証更新', 'ビザ手続き', 'テンポラリーレジデンスカード'],
  },
];

const faqItems = [
  {
    question: '投資登録証明書（IRC）の取得にはどのくらいの期間がかかりますか？',
    answer:
      '通常2〜4週間程度ですが、業種や投資規模により異なります。条件付き業種の場合は追加の審査が必要となり、期間が長くなる場合があります。',
  },
  {
    question: '業種によって必要なライセンスは異なりますか？',
    answer:
      'はい、業種によって必要なライセンスは大きく異なります。製造業、小売業、飲食業、IT業など、それぞれに固有の許認可が必要です。',
  },
  {
    question: '外国人の労働許可証取得の条件は何ですか？',
    answer:
      '一般的に、大学卒業以上の学歴と3年以上の関連業務経験、または専門的な資格が必要です。また、ベトナム人では代替できない職務であることが求められます。',
  },
  {
    question: 'ライセンスの更新手続きもサポートしていますか？',
    answer:
      'はい、ライセンスの更新・変更手続きもサポートしています。更新期限の管理も含めて対応いたします。',
  },
  {
    question: '書類は日本語で準備すればよいですか？',
    answer:
      'ベトナム当局への申請書類はベトナム語で作成する必要があります。当社で翻訳・公証手続きも含めて対応いたします。',
  },
];

export default function LicenseContent() {
  const [activeSection, setActiveSection] = useState('overview');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-[280px_1fr] gap-12">
          <aside className="hidden lg:block">
            <div className="sticky top-32">
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left px-4 py-3 border-l-2 transition-all duration-300 ${
                      activeSection === item.id
                        ? 'border-[#84ab52] bg-[#84ab52]/5 text-[#84ab52] font-medium'
                        : 'border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-800'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
              <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-600 mb-4">
                  ライセンス申請に関する
                  <br />
                  ご相談はこちら
                </p>
                <a
                  href="#contact"
                  className="block w-full text-center py-3 bg-[#84ab52] text-white text-sm font-medium rounded-lg hover:bg-[#6d9143] transition-colors"
                >
                  お問い合わせ
                </a>
              </div>
            </div>
          </aside>

          <div className="space-y-20">
            <div id="overview" className="scroll-mt-32">
              <h2 className="text-2xl md:text-3xl font-light text-gray-800 mb-6 pb-4 border-b border-gray-200">
                サービス概要
              </h2>
              <div className="prose prose-lg max-w-none text-gray-600">
                <p className="leading-relaxed mb-6">
                  Kurosawa Consulting
                  Vietnamは、ベトナムでの事業展開に必要な各種ライセンス・許認可の取得を総合的にサポートします。
                  投資登録証明書（IRC）、事業登録証明書（ERC）から業種別ライセンス、労働許可証まで、幅広く対応します。
                </p>
                <p className="leading-relaxed mb-6">
                  ベトナムの許認可制度に精通した専門家が、複雑な申請手続きを代行し、スムーズな事業開始を実現します。
                </p>
              </div>
            </div>

            <div id="flow" className="scroll-mt-32">
              <h2 className="text-2xl md:text-3xl font-light text-gray-800 mb-6 pb-4 border-b border-gray-200">
                申請の流れ
              </h2>
              <p className="text-gray-600 mb-8">ライセンス申請は以下の流れで進めます。</p>
              <div className="space-y-6">
                {flowSteps.map((step, index) => (
                  <div key={step.number} className="relative pl-8 md:pl-12">
                    {index < flowSteps.length - 1 && (
                      <div className="absolute left-[11px] md:left-[19px] top-12 w-0.5 h-[calc(100%+24px)] bg-gray-200"></div>
                    )}
                    <div className="flex items-start gap-4 md:gap-6">
                      <div className="absolute left-0 w-6 h-6 md:w-10 md:h-10 rounded-full bg-[#84ab52] text-white flex items-center justify-center text-xs md:text-sm font-medium">
                        {step.number}
                      </div>
                      <div className="flex-1 bg-gray-50 rounded-xl p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                          <h3 className="text-lg font-medium text-gray-800">{step.title}</h3>
                          <span className="inline-flex items-center px-3 py-1 bg-[#84ab52]/10 text-[#84ab52] text-sm rounded-full">
                            {step.duration}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4">{step.description}</p>
                        <ul className="grid sm:grid-cols-2 gap-2">
                          {step.details.map((detail, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                              <svg
                                className="w-4 h-4 text-[#84ab52] flex-shrink-0"
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
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div id="support" className="scroll-mt-32">
              <h2 className="text-2xl md:text-3xl font-light text-gray-800 mb-6 pb-4 border-b border-gray-200">
                サポート内容
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {supportItems.map((item, index) => (
                  <div
                    key={index}
                    className="p-6 bg-white border border-gray-100 rounded-xl hover:shadow-lg hover:border-[#84ab52]/30 transition-all duration-300"
                  >
                    <div className="text-[#84ab52] mb-4">{item.icon}</div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                    <ul className="space-y-2">
                      {item.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#84ab52]"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* 参考予算 */}
            <div id="budget" className="scroll-mt-32">
              <h2 className="text-2xl md:text-3xl font-light text-gray-800 mb-6 pb-4 border-b border-gray-200">
                参考予算
              </h2>
              <p className="text-gray-600 mb-8">
                各種ライセンス申請に関する参考予算です。実際の費用は申請内容により異なります。
              </p>

              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <h3 className="text-lg font-medium text-gray-800">投資登録証明書（IRC）変更</h3>
                    <span className="inline-flex items-center px-4 py-2 bg-[#84ab52] text-white text-sm font-medium rounded-lg">
                      USD 800〜
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">IRCの各種変更手続き</p>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84ab52]"></span>
                      資本金変更
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84ab52]"></span>
                      事業範囲追加
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84ab52]"></span>
                      住所変更
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84ab52]"></span>
                      その他変更
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <h3 className="text-lg font-medium text-gray-800">労働許可証（ワークパーミット）</h3>
                    <span className="inline-flex items-center px-4 py-2 bg-[#84ab52] text-white text-sm font-medium rounded-lg">
                      USD 1,000〜/人
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">外国人従業員の労働許可証取得</p>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84ab52]"></span>
                      新規申請
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84ab52]"></span>
                      更新申請
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84ab52]"></span>
                      書類準備サポート
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84ab52]"></span>
                      ビザ手続き
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <h3 className="text-lg font-medium text-gray-800">業種別ライセンス</h3>
                    <span className="inline-flex items-center px-4 py-2 bg-[#84ab52] text-white text-sm font-medium rounded-lg">
                      応相談（種類により大きく異なります）
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">業種に応じた各種許認可の取得</p>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84ab52]"></span>
                      製造業ライセンス
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84ab52]"></span>
                      小売業ライセンス
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84ab52]"></span>
                      輸出入ライセンス
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84ab52]"></span>
                      その他業種別許可
                    </li>
                  </ul>
                </div>
              </div>

              <p className="text-sm text-gray-500 mt-6">
                ※上記は参考価格です。申請内容により変動します。詳細なお見積りはお問い合わせください。
              </p>
            </div>

            <div id="faq" className="scroll-mt-32">
              <h2 className="text-2xl md:text-3xl font-light text-gray-800 mb-6 pb-4 border-b border-gray-200">
                よくある質問
              </h2>
              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="flex items-center gap-4">
                        <span className="text-[#84ab52] font-medium">Q.{index + 1}</span>
                        <span className="text-gray-800">{item.question}</span>
                      </span>
                      <svg
                        className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${openFAQ === index ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${openFAQ === index ? 'max-h-96' : 'max-h-0'}`}
                    >
                      <div className="p-6 pt-0 text-gray-600 leading-relaxed">{item.answer}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
