'use client';

import { useState, useEffect } from 'react';

type NavItem = {
  id: string;
  label: string;
};

const navItems: NavItem[] = [
  { id: 'overview', label: 'サービス概要' },
  { id: 'flow', label: '業務の流れ' },
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
    title: '初期設定・移行',
    description: '会計システムの初期設定と既存データの移行',
    duration: '1〜2ヶ月',
    details: ['勘定科目の設計', '会計システムの導入', '既存データの移行', '業務フローの構築'],
  },
  {
    number: '02',
    title: '月次記帳・処理',
    description: '日常の取引記録と月次処理',
    duration: '毎月',
    details: ['仕訳入力・記帳代行', '請求書・領収書の管理', '銀行照合', '月次試算表の作成'],
  },
  {
    number: '03',
    title: '月次決算・報告',
    description: '月次決算と経営レポートの作成',
    duration: '毎月',
    details: ['月次決算処理', '財務諸表の作成', '日本本社向けレポート', '経営分析資料の提供'],
  },
  {
    number: '04',
    title: '年次決算・税務申告',
    description: '年次決算と各種税務申告',
    duration: '年1回',
    details: ['年次決算処理', '法人税申告', '付加価値税（VAT）申告', '監査対応'],
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
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
    title: '記帳代行',
    description: '日常の取引記録を正確に処理します。',
    features: ['仕訳入力・記帳', '証憑書類の整理', '銀行照合', '試算表作成'],
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
    title: '決算・財務報告',
    description: '月次・年次決算と財務報告を行います。',
    features: ['月次決算処理', '年次決算処理', '財務諸表作成', '日本本社向けレポート'],
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
    title: '税務申告',
    description: '各種税務申告を代行します。',
    features: ['法人税申告', 'VAT申告', '個人所得税申告', '税務調査対応'],
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
    title: '監査対応',
    description: '外部監査への対応をサポートします。',
    features: ['監査資料の準備', '監査法人との調整', '指摘事項への対応', '内部統制支援'],
  },
];

type FAQItem = {
  question: string;
  answer: string;
};

const faqItems: FAQItem[] = [
  {
    question: 'ベトナムの会計基準は日本と異なりますか？',
    answer:
      'はい、ベトナムはベトナム会計基準（VAS）を採用しており、日本基準やIFRSとは異なる点があります。当社では両基準に精通したスタッフが対応します。',
  },
  {
    question: '日本本社への連結レポートも対応可能ですか？',
    answer:
      'はい、日本本社の連結決算に必要なレポートパッケージの作成も対応しています。日本基準への組替えも可能です。',
  },
  {
    question: '記帳代行のみの依頼も可能ですか？',
    answer:
      'はい、記帳代行のみのご依頼も承っています。お客様のニーズに合わせて、必要なサービスを選択いただけます。',
  },
  {
    question: 'ベトナムの法人税率はどのくらいですか？',
    answer:
      'ベトナムの標準法人税率は20%です。ただし、優遇税制が適用される場合は、10%や15%の軽減税率が適用されることもあります。',
  },
  {
    question: '日本語でのサポートは可能ですか？',
    answer:
      'はい、日本語でのサポートが可能です。日本語に堪能なスタッフが担当し、日本語での報告書作成にも対応しています。',
  },
];

export default function AccountingContent() {
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
                  会計税務に関する
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
                  Vietnamは、日本企業のベトナム現地法人における会計・税務業務を総合的にサポートします。
                  記帳代行から月次・年次決算、税務申告、監査対応まで、ワンストップでサービスを提供します。
                </p>
                <p className="leading-relaxed mb-6">
                  ベトナム会計基準（VAS）と日本基準の両方に精通したスタッフが、
                  現地基準での適正な処理と日本本社への円滑なレポーティングを実現します。
                </p>
              </div>
            </div>

            <div id="flow" className="scroll-mt-32">
              <h2 className="text-2xl md:text-3xl font-light text-gray-800 mb-6 pb-4 border-b border-gray-200">
                業務の流れ
              </h2>
              <p className="text-gray-600 mb-8">会計税務業務は以下の流れで進めます。</p>

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
                会計税務コンサルティングに関する参考予算です。実際の費用は取引量や業務内容により異なります。
              </p>

              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <h3 className="text-lg font-medium text-gray-800">記帳代行（月額）</h3>
                    <span className="inline-flex items-center px-4 py-2 bg-[#84ab52] text-white text-sm font-medium rounded-lg">
                      USD 300〜/月
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">月次の記帳業務を代行</p>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84ab52]"></span>
                      仕訳入力・記帳
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84ab52]"></span>
                      証憑書類整理
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84ab52]"></span>
                      銀行照合
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84ab52]"></span>
                      月次試算表作成
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <h3 className="text-lg font-medium text-gray-800">決算・税務申告（年額）</h3>
                    <span className="inline-flex items-center px-4 py-2 bg-[#84ab52] text-white text-sm font-medium rounded-lg">
                      USD 1,000〜/年
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">年次決算処理と税務申告を代行</p>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84ab52]"></span>
                      年次決算処理
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84ab52]"></span>
                      法人税申告
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84ab52]"></span>
                      財務諸表作成
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84ab52]"></span>
                      監査対応
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <h3 className="text-lg font-medium text-gray-800">会計顧問（月額）</h3>
                    <span className="inline-flex items-center px-4 py-2 bg-[#84ab52] text-white text-sm font-medium rounded-lg">
                      USD 200〜/月
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">記帳代行＋月次決算＋税務相談を含む包括サービス</p>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84ab52]"></span>
                      記帳代行
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84ab52]"></span>
                      月次決算・レポート
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84ab52]"></span>
                      税務相談
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84ab52]"></span>
                      日本本社向けレポート
                    </li>
                  </ul>
                </div>
              </div>

              <p className="text-sm text-gray-500 mt-6">
                ※上記は参考価格です。取引量や業務内容により変動します。詳細なお見積りはお問い合わせください。
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
