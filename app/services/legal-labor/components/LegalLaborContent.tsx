'use client';

import { useState, useEffect } from 'react';

const navItems = [
  { id: 'overview', label: 'サービス概要' },
  { id: 'flow', label: '対応の流れ' },
  { id: 'support', label: 'サポート内容' },
  { id: 'budget', label: '参考予算' },
  { id: 'faq', label: 'よくある質問' },
];

const flowSteps = [
  {
    number: '01',
    title: 'ヒアリング・現状把握',
    description: '現在の法務・労務状況を確認',
    duration: '1〜2週間',
    details: ['現状の課題ヒアリング', '既存契約書・規程の確認', 'リスク評価', '対応方針の提案'],
  },
  {
    number: '02',
    title: '調査・分析',
    description: '適用法令の調査と分析',
    duration: '1〜2週間',
    details: ['関連法令の調査', '判例・実務慣行の確認', 'リスク分析', '対応オプションの検討'],
  },
  {
    number: '03',
    title: '書類作成・レビュー',
    description: '契約書・規程類の作成・レビュー',
    duration: '2〜4週間',
    details: [
      '契約書のドラフト作成',
      '就業規則の作成・改訂',
      '各種規程の整備',
      'レビュー・修正対応',
    ],
  },
  {
    number: '04',
    title: '実施・モニタリング',
    description: '継続的なサポートとモニタリング',
    duration: '継続',
    details: ['導入・実施支援', '従業員への説明支援', '継続的なアドバイス', '法改正への対応'],
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
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
    title: '契約書作成・レビュー',
    description: '各種契約書の作成・レビューを行います。',
    features: ['売買契約書', '業務委託契約書', '秘密保持契約書', '雇用契約書'],
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
    title: '就業規則・人事制度',
    description: '就業規則・人事制度の整備を支援します。',
    features: ['就業規則の作成・改訂', '給与規程', '評価制度設計', '福利厚生制度'],
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: '労働法対応',
    description: 'ベトナム労働法への対応を支援します。',
    features: ['労働契約管理', '労働時間管理', '社会保険対応', '労働安全衛生'],
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
    ),
    title: 'トラブル対応',
    description: '労務トラブルの解決を支援します。',
    features: ['解雇・退職対応', '懲戒処分対応', '労働紛争対応', 'ハラスメント対応'],
  },
];

const faqItems = [
  {
    question: 'ベトナムの労働法は日本と大きく異なりますか？',
    answer:
      'はい、労働契約の形態、試用期間、解雇規制、社会保険など多くの点で異なります。当社の専門家がベトナム労働法に基づいたアドバイスを提供します。',
  },
  {
    question: '日本語の契約書は有効ですか？',
    answer:
      'ベトナムでは、契約書はベトナム語で作成するか、ベトナム語訳を添付することが推奨されます。紛争時にはベトナム語版が優先される場合があります。',
  },
  {
    question: '外国人の労働許可証取得もサポートしていますか？',
    answer:
      'はい、外国人の労働許可証（ワークパーミット）の取得手続きもサポートしています。詳しくはライセンス申請サービスをご確認ください。',
  },
  {
    question: '労務トラブルが発生した場合、すぐに対応してもらえますか？',
    answer:
      'はい、緊急の労務トラブルにも迅速に対応します。まずはお電話またはメールでご連絡ください。',
  },
  {
    question: '顧問契約は可能ですか？',
    answer:
      'はい、月額固定の顧問契約も承っています。継続的な法務・労務相談を必要とされる企業様におすすめです。',
  },
];

export default function LegalLaborContent() {
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
                  法務・労務に関する
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
                  Vietnamは、日本企業のベトナム現地法人における法務・労務業務を総合的にサポートします。
                  契約書の作成・レビューから、就業規則の整備、労働法対応、トラブル対応まで、幅広くサービスを提供します。
                </p>
                <p className="leading-relaxed mb-6">
                  ベトナムの法規制に精通した専門家が、リスクを最小化し、円滑な事業運営を支援します。
                </p>
              </div>
            </div>

            <div id="flow" className="scroll-mt-32">
              <h2 className="text-2xl md:text-3xl font-light text-gray-800 mb-6 pb-4 border-b border-gray-200">
                対応の流れ
              </h2>
              <p className="text-gray-600 mb-8">法務・労務案件は以下の流れで対応します。</p>
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
                法務・労務相談に関する参考予算です。実際の費用は案件の内容や複雑さにより異なります。
              </p>

              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <h3 className="text-lg font-medium text-gray-800">契約書作成・レビュー</h3>
                    <span className="inline-flex items-center px-4 py-2 bg-[#84ab52] text-white text-sm font-medium rounded-lg">
                      USD 300〜/件
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">各種契約書の作成・レビューを行います</p>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84ab52]"></span>
                      売買契約書
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84ab52]"></span>
                      業務委託契約書
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84ab52]"></span>
                      雇用契約書
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84ab52]"></span>
                      秘密保持契約書
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <h3 className="text-lg font-medium text-gray-800">就業規則作成・改訂</h3>
                    <span className="inline-flex items-center px-4 py-2 bg-[#84ab52] text-white text-sm font-medium rounded-lg">
                      USD 1,000〜
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">就業規則・社内規程の作成・改訂</p>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84ab52]"></span>
                      就業規則作成
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84ab52]"></span>
                      給与規程
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84ab52]"></span>
                      評価制度設計
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84ab52]"></span>
                      各種社内規程
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <h3 className="text-lg font-medium text-gray-800">法務・労務顧問（月額）</h3>
                    <span className="inline-flex items-center px-4 py-2 bg-[#84ab52] text-white text-sm font-medium rounded-lg">
                      USD 200〜/月
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">継続的な法務・労務相談サービス</p>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84ab52]"></span>
                      法務相談
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84ab52]"></span>
                      労務相談
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84ab52]"></span>
                      契約書レビュー（月2件まで）
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84ab52]"></span>
                      トラブル対応支援
                    </li>
                  </ul>
                </div>
              </div>

              <p className="text-sm text-gray-500 mt-6">
                ※上記は参考価格です。案件の内容により変動します。詳細なお見積りはお問い合わせください。
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
