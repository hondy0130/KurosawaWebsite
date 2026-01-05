'use client';

import { useState, useEffect } from 'react';

type NavItem = {
  id: string;
  label: string;
};

const navItems: NavItem[] = [
  { id: 'overview', label: 'サービス概要' },
  { id: 'flow', label: '設立の流れ' },
  { id: 'support', label: 'サポート内容' },
  { id: 'faq', label: 'よくある質問' },
];

type FlowStep = {
  number: string;
  title: string;
  description: string;
  duration: string;
  details: string[];
};

const flowSteps: FlowStep[] = [
  {
    number: '01',
    title: '事前調査・戦略立案',
    description: '市場調査から進出形態の検討まで',
    duration: '1〜2ヶ月',
    details: [
      'ベトナム市場の調査・分析',
      '競合・業界動向のリサーチ',
      '進出形態の比較検討（現地法人/駐在員事務所/支店）',
      '事業計画の策定支援',
    ],
  },
  {
    number: '02',
    title: '法人設立手続き',
    description: '投資登録から事業登録まで',
    duration: '2〜3ヶ月',
    details: [
      '投資登録証明書（IRC）の取得',
      '事業登録証明書（ERC）の取得',
      '定款・社内規程の作成',
      '銀行口座の開設',
    ],
  },
  {
    number: '03',
    title: '許認可・ライセンス取得',
    description: '業種別に必要な許認可を取得',
    duration: '1〜3ヶ月',
    details: [
      '業種別ライセンスの申請',
      '輸出入ライセンスの取得',
      '環境許可の取得',
      'その他必要許認可の対応',
    ],
  },
  {
    number: '04',
    title: 'オフィス設立・人材採用',
    description: 'オフィス開設と初期メンバーの採用',
    duration: '1〜2ヶ月',
    details: ['オフィス物件の選定・契約', '内装・設備の手配', '人材採用支援', '労働許可証の取得'],
  },
  {
    number: '05',
    title: '事業開始・運営サポート',
    description: '円滑な事業開始をサポート',
    duration: '継続',
    details: [
      '会計・税務の初期設定',
      '給与計算・社会保険の手続き',
      '各種届出の代行',
      '継続的な運営サポート',
    ],
  },
];

type SupportItem = {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
};

const supportItems: SupportItem[] = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
    title: '市場調査・進出戦略',
    description: 'ベトナム市場を深く理解し、最適な進出戦略を策定します。',
    features: [
      '市場規模・成長性の分析',
      '競合環境の調査',
      'ターゲット顧客の特定',
      '進出形態の比較検討',
    ],
  },
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
    title: '法人設立・登記',
    description: '複雑な設立手続きをワンストップでサポートします。',
    features: [
      '投資登録証明書（IRC）取得',
      '事業登録証明書（ERC）取得',
      '定款・社内規程作成',
      '各種届出の代行',
    ],
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
    title: '許認可・ライセンス',
    description: '業種に応じた各種許認可の取得を代行します。',
    features: [
      '業種別ライセンス申請',
      '労働許可証の取得',
      '輸出入ライセンス',
      '環境・安全関連許可',
    ],
  },
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
    title: '人材採用・労務',
    description: '優秀な人材の採用から労務管理までサポートします。',
    features: ['人材紹介・採用支援', '就業規則の作成', '給与計算・社会保険', '労務トラブル対応'],
  },
];

type FAQItem = {
  question: string;
  answer: string;
};

const faqItems: FAQItem[] = [
  {
    question: 'ベトナムでの法人設立にはどのくらいの期間がかかりますか？',
    answer:
      '業種や進出形態により異なりますが、一般的な現地法人の設立には3〜6ヶ月程度かかります。投資登録証明書（IRC）と事業登録証明書（ERC）の取得に2〜3ヶ月、その後の許認可取得に1〜3ヶ月程度を見込んでください。',
  },
  {
    question: '現地法人と駐在員事務所の違いは何ですか？',
    answer:
      '現地法人は営業活動や売上計上が可能で、独立した法人格を持ちます。一方、駐在員事務所は市場調査や連絡業務に限定され、営業活動はできません。進出目的に応じて最適な形態をご提案します。',
  },
  {
    question: '外資100%での会社設立は可能ですか？',
    answer:
      'はい、多くの業種で外資100%での設立が可能です。ただし、一部の業種（不動産、広告など）では外資規制があり、ベトナム企業との合弁が必要な場合があります。詳細は業種ごとにご確認ください。',
  },
  {
    question: '最低資本金はいくら必要ですか？',
    answer:
      'ベトナムでは一般的に最低資本金の規定はありませんが、業種によっては最低資本金が定められています（銀行業、保険業など）。また、実務上は事業計画に見合った資本金を設定することが重要です。',
  },
  {
    question: '日本語でのサポートは可能ですか？',
    answer:
      'はい、日本語でのサポートが可能です。当社には日本語に堪能なベトナム人スタッフと日本人スタッフが在籍しており、日本語でのコミュニケーションで安心してご依頼いただけます。',
  },
];

export default function EstablishmentContent() {
  const [activeSection, setActiveSection] = useState('overview');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  // スクロール監視
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
          {/* サイドバーナビゲーション */}
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

              {/* サイドバーCTA */}
              <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-600 mb-4">
                  ベトナム進出に関する
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

          {/* メインコンテンツ */}
          <div className="space-y-20">
            {/* サービス概要 */}
            <div id="overview" className="scroll-mt-32">
              <h2 className="text-2xl md:text-3xl font-light text-gray-800 mb-6 pb-4 border-b border-gray-200">
                サービス概要
              </h2>
              <div className="prose prose-lg max-w-none text-gray-600">
                <p className="leading-relaxed mb-6">
                  Kurosawa Consulting Vietnamは、日本企業のベトナム進出を総合的にサポートします。
                  市場調査から法人設立、許認可取得、人材採用、そして事業開始後の運営支援まで、
                  ワンストップでサービスを提供します。
                </p>
                <p className="leading-relaxed mb-6">
                  ベトナムの制度や商習慣に精通した専門家チームが、お客様の事業計画に最適な進出形態を提案し、
                  スムーズな拠点設立を実現します。現地での豊富な実績と日本語でのきめ細かいサポートで、
                  初めてのベトナム進出でも安心してお任せいただけます。
                </p>
                <div className="grid sm:grid-cols-3 gap-6 mt-8">
                  <div className="text-center p-6 bg-gray-50 rounded-xl">
                    <p className="text-3xl font-light text-[#84ab52] mb-2">100+</p>
                    <p className="text-sm text-gray-600">設立支援実績</p>
                  </div>
                  <div className="text-center p-6 bg-gray-50 rounded-xl">
                    <p className="text-3xl font-light text-[#84ab52] mb-2">15+</p>
                    <p className="text-sm text-gray-600">年の経験</p>
                  </div>
                  <div className="text-center p-6 bg-gray-50 rounded-xl">
                    <p className="text-3xl font-light text-[#84ab52] mb-2">98%</p>
                    <p className="text-sm text-gray-600">顧客満足度</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 設立の流れ */}
            <div id="flow" className="scroll-mt-32">
              <h2 className="text-2xl md:text-3xl font-light text-gray-800 mb-6 pb-4 border-b border-gray-200">
                設立の流れ
              </h2>
              <p className="text-gray-600 mb-8">
                ベトナムでの法人設立は、以下のステップで進めます。各フェーズで専門スタッフがサポートします。
              </p>

              <div className="space-y-6">
                {flowSteps.map((step, index) => (
                  <div key={step.number} className="relative pl-8 md:pl-12">
                    {/* タイムライン */}
                    {index < flowSteps.length - 1 && (
                      <div className="absolute left-[11px] md:left-[19px] top-12 w-0.5 h-[calc(100%+24px)] bg-gray-200"></div>
                    )}

                    <div className="flex items-start gap-4 md:gap-6">
                      {/* 番号 */}
                      <div className="absolute left-0 w-6 h-6 md:w-10 md:h-10 rounded-full bg-[#84ab52] text-white flex items-center justify-center text-xs md:text-sm font-medium">
                        {step.number}
                      </div>

                      {/* コンテンツ */}
                      <div className="flex-1 bg-gray-50 rounded-xl p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                          <h3 className="text-lg font-medium text-gray-800">{step.title}</h3>
                          <span className="inline-flex items-center px-3 py-1 bg-[#84ab52]/10 text-[#84ab52] text-sm rounded-full">
                            目安: {step.duration}
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

            {/* サポート内容 */}
            <div id="support" className="scroll-mt-32">
              <h2 className="text-2xl md:text-3xl font-light text-gray-800 mb-6 pb-4 border-b border-gray-200">
                サポート内容
              </h2>
              <p className="text-gray-600 mb-8">
                ベトナム進出に必要なあらゆるサポートを提供します。
              </p>

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

            {/* よくある質問 */}
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
                        className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                          openFAQ === index ? 'rotate-180' : ''
                        }`}
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
                      className={`overflow-hidden transition-all duration-300 ${
                        openFAQ === index ? 'max-h-96' : 'max-h-0'
                      }`}
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
