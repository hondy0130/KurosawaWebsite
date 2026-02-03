'use client';

import { useState, useEffect } from 'react';

type NavItem = {
  id: string;
  label: string;
};

const navItems: NavItem[] = [
  { id: 'overview', label: 'サービス概要' },
  { id: 'flow', label: 'M&Aの流れ' },
  { id: 'support', label: 'サポート内容' },
  { id: 'budget', label: '参考予算' },
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
    title: '戦略立案・ターゲット探索',
    description: 'M&A戦略の策定とターゲット企業の選定',
    duration: '1〜3ヶ月',
    details: [
      'M&A目的・戦略の明確化',
      'ターゲット企業のロングリスト作成',
      '初期スクリーニング・絞り込み',
      'アプローチ方法の検討',
    ],
  },
  {
    number: '02',
    title: '現地視察・基本合意',
    description: 'ターゲット企業との交渉開始',
    duration: '1〜2ヶ月',
    details: [
      '秘密保持契約（NDA）の締結',
      '現地視察・トップ面談',
      '基本条件の交渉',
      'LOI提出、基本合意書（ＭＯＵ）の締結',
    ],
  },
  {
    number: '03',
    title: 'デューデリジェンス',
    description: '対象企業の詳細調査',
    duration: '1〜2ヶ月',
    details: [
      '財務デューデリジェンス',
      '法務デューデリジェンス',
      '税務デューデリジェンス',
      '事業デューデリジェンス',
    ],
  },
  {
    number: '04',
    title: 'バリュエーション・最終交渉',
    description: '企業価値評価と条件交渉',
    duration: '1〜2ヶ月',
    details: [
      '企業価値の算定',
      '取引条件の最終交渉',
      '株式譲渡契約書の作成',
      'クロージング条件の設定',
    ],
  },
  {
    number: '05',
    title: 'PMI（統合プロセス）',
    description: '買収後の統合支援',
    duration: '3〜12ヶ月',
    details: [
      'システムおよび業務プロセスの統合',
      '連結会計の実施',
      'J-sox対応',
      '人員および労務計画の整備',
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
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    ),
    title: 'ターゲット探索',
    description: '最適なM&Aターゲットを発掘します。',
    features: [
      'ロングリスト・ショートリスト作成',
      '業界・市場分析',
      'ターゲット企業へのアプローチ',
      'マッチング支援',
    ],
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
        />
      </svg>
    ),
    title: 'デューデリジェンス',
    description: '対象企業のリスクと価値を徹底調査します。',
    features: ['財務・税務DD', '法務DD', '事業DD', '統合レポート作成'],
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: 'バリュエーション',
    description: '適正な企業価値を算定します。',
    features: [
      'DCF法による算定',
      'EBITDAマルチプル法による算定',
      '年買法による算定',
      '売主との交渉サポート',
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
    title: 'PMI支援',
    description: '買収後の統合を成功に導きます。',
    features: [
      '連結会計パッケージ作成支援',
      'IFRS導入支援',
      'J-sox運用構築支援',
      '労務整備',
    ],
  },
];

type FAQItem = {
  question: string;
  answer: string;
};

const faqItems: FAQItem[] = [
  {
    question: 'ベトナム企業のM&Aにはどのくらいの期間がかかりますか？',
    answer:
      '案件の規模や複雑さにより異なりますが、一般的には6ヶ月〜1年程度です。デューデリジェンスや政府承認に時間がかかる場合があります。',
  },
  {
    question: '外資によるベトナム企業の買収に規制はありますか？',
    answer:
      'はい、業種によって外資規制があります。銀行、メディア、不動産など一部の業種では外資比率に制限があります。詳細は個別にご確認ください。',
  },
  {
    question: 'デューデリジェンスではどのような項目を調査しますか？',
    answer:
      '財務・税務・法務・事業の各分野を調査します。ベトナム特有のリスク（土地使用権、労働法、税務リスク等）にも注意を払います。',
  },
  {
    question: 'M&A後のPMI支援も依頼できますか？',
    answer:
      'はい、PMI（買収後統合）支援も提供しています。組織統合、システム統合、シナジー実現まで継続的にサポートします。',
  },
  {
    question: '日本語でのサポートは可能ですか？',
    answer:
      'はい、日本語でのサポートが可能です。日本本社とベトナム現地の両方に対応できるバイリンガルチームが担当します。',
  },
];

export default function MAContent() {
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

              <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-600 mb-4">
                  M&Aに関する
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
                  Kurosawa Consuluting Vietnamは日本とベトナムを繋ぐクロスボーダーM&Aの精鋭集団です。
                </p>
                <ul className="space-y-3 mb-6 list-none pl-0">
                  <li className="flex items-start gap-3">
                    <span className="text-[#84ab52] font-medium flex-shrink-0">①</span>
                    <span className="leading-relaxed">
                      Big4会計事務所の日本拠点およびホーチミン拠点で会計税務デューデリジェンスおよびPMI業務に関する専門的な会計知識を有する日本人会計士
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#84ab52] font-medium flex-shrink-0">②</span>
                    <span className="leading-relaxed">
                      日系企業からの出資ニーズを持つ企業と幅広い繋がりを持つベトナム人弁護士
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#84ab52] font-medium flex-shrink-0">③</span>
                    <span className="leading-relaxed">
                      上場M&A仲介企業で複数のM&A成約経験を有するコンサルタント
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#84ab52] font-medium flex-shrink-0">④</span>
                    <span className="leading-relaxed">
                      ベトナム語⇔日本語のビジネス通訳業務において5年以上の経験を有するマネージャー
                    </span>
                  </li>
                </ul>
                <p className="leading-relaxed">
                  チーム総動員で貴社のべトナムにおけるM&Aをご支援させていただきます。
                </p>
              </div>
            </div>

            {/* M&Aの流れ */}
            <div id="flow" className="scroll-mt-32">
              <h2 className="text-2xl md:text-3xl font-light text-gray-800 mb-6 pb-4 border-b border-gray-200">
                M&Aの流れ
              </h2>
              <p className="text-gray-600 mb-8">
                M&Aプロセスは以下のステップで進めます。各フェーズで専門スタッフがサポートします。
              </p>

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
              <p className="text-gray-600 mb-8">M&Aに必要なあらゆるサポートを提供します。</p>

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
                M&Aアドバイザリーに関する参考予算です。実際の費用は案件規模や複雑さにより異なります。
              </p>

              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <h3 className="text-lg font-medium text-gray-800">ターゲット探索・初期検討</h3>
                    <span className="inline-flex items-center px-4 py-2 bg-[#84ab52] text-white text-sm font-medium rounded-lg">
                      無料
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">ターゲット企業の探索・選定、初期分析を含む</p>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84ab52]"></span>
                      ロングリスト作成
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84ab52]"></span>
                      ショートリスト作成
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84ab52]"></span>
                      初期企業分析
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84ab52]"></span>
                      アプローチ支援
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <h3 className="text-lg font-medium text-gray-800">デューデリジェンス</h3>
                    <span className="inline-flex items-center px-4 py-2 bg-[#84ab52] text-white text-sm font-medium rounded-lg">
                      USD 4,000〜
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">財務・法務・税務・事業デューデリジェンスを含む</p>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84ab52]"></span>
                      財務DD
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84ab52]"></span>
                      法務DD
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84ab52]"></span>
                      税務DD
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84ab52]"></span>
                      事業DD
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <h3 className="text-lg font-medium text-gray-800">フルスコープアドバイザリー</h3>
                    <span className="inline-flex items-center px-4 py-2 bg-[#84ab52] text-white text-sm font-medium rounded-lg">
                      成功報酬型（要相談）
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">M&Aプロセス全体のアドバイザリーサービス</p>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84ab52]"></span>
                      戦略立案〜クロージング
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84ab52]"></span>
                      バリュエーション
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84ab52]"></span>
                      交渉支援
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84ab52]"></span>
                      PMI支援
                    </li>
                  </ul>
                </div>
              </div>

              <p className="text-sm text-gray-500 mt-6">
                ※上記は参考価格です。案件の規模・複雑さにより変動します。詳細なお見積りはお問い合わせください。
              </p>
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
