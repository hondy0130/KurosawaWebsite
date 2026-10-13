'use client';

import { useState, useEffect } from 'react';

// サービス詳細ページの本文（サイドバー目次＋概要・流れ・サポート・参考予算・FAQ）
// 文言はサーバー側（app/[locale]/services/[slug]/page.tsx）で翻訳を解決して props で受け取る

export type FlowStep = {
  title: string;
  description: string;
  duration: string;
  details: string[];
};

export type SupportItem = {
  title: string;
  description: string;
  features: string[];
};

export type BudgetPlan = {
  title: string;
  price: string;
  description: string;
  items: string[];
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type ServiceDetailData = {
  labels: {
    overview: string;
    support: string;
    budget: string;
    faq: string;
    ctaLine1: string;
    ctaLine2: string;
    contact: string;
  };
  overview: {
    paragraphs: string[];
    list?: string[];
    closing?: string;
  };
  flow?: {
    title: string;
    intro: string;
    steps: FlowStep[];
  };
  support: {
    intro?: string;
    items: SupportItem[];
  };
  budget: {
    intro: string;
    plans: BudgetPlan[];
    note: string;
  };
  faq: FAQItem[];
};

const CIRCLED_NUMBERS = ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩'];

export default function ServiceDetailContent({
  data,
  supportIcons,
}: {
  data: ServiceDetailData;
  supportIcons: string[][];
}) {
  const { labels, overview, flow, support, budget, faq } = data;

  const navItems = [
    { id: 'overview', label: labels.overview },
    ...(flow ? [{ id: 'flow', label: flow.title }] : []),
    { id: 'support', label: labels.support },
    { id: 'budget', label: labels.budget },
    { id: 'faq', label: labels.faq },
  ];

  const [activeSection, setActiveSection] = useState('overview');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  // スクロール監視
  useEffect(() => {
    const ids = ['overview', ...(flow ? ['flow'] : []), 'support', 'budget', 'faq'];
    const handleScroll = () => {
      const sections = ids.map((id) => document.getElementById(id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(ids[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [flow]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
    }
  };

  const sectionTitleClass =
    'text-2xl md:text-3xl font-light text-gray-800 mb-6 pb-4 border-b border-gray-200';

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
                  {labels.ctaLine1}
                  <br />
                  {labels.ctaLine2}
                </p>
                <a
                  href="#contact"
                  className="block w-full text-center py-3 bg-[#84ab52] text-white text-sm font-medium rounded-lg hover:bg-[#6d9143] transition-colors"
                >
                  {labels.contact}
                </a>
              </div>
            </div>
          </aside>

          {/* メインコンテンツ */}
          <div className="space-y-20 min-w-0">
            {/* サービス概要 */}
            <div id="overview" className="scroll-mt-32">
              <h2 className={sectionTitleClass}>{labels.overview}</h2>
              <div className="prose prose-lg max-w-none text-gray-600">
                {overview.paragraphs.map((p, i) => (
                  <p key={i} className="leading-relaxed mb-6">
                    {p}
                  </p>
                ))}
                {overview.list && (
                  <ul className="space-y-3 mb-6 list-none pl-0">
                    {overview.list.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-[#84ab52] font-medium flex-shrink-0">
                          {CIRCLED_NUMBERS[i]}
                        </span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {overview.closing && <p className="leading-relaxed">{overview.closing}</p>}
              </div>
            </div>

            {/* 業務の流れ */}
            {flow && (
              <div id="flow" className="scroll-mt-32">
                <h2 className={sectionTitleClass}>{flow.title}</h2>
                <p className="text-gray-600 mb-8">{flow.intro}</p>

                <div className="space-y-6">
                  {flow.steps.map((step, index) => (
                    <div key={index} className="relative pl-8 md:pl-12">
                      {/* タイムライン */}
                      {index < flow.steps.length - 1 && (
                        <div className="absolute left-[11px] md:left-[19px] top-12 w-0.5 h-[calc(100%+24px)] bg-gray-200"></div>
                      )}

                      <div className="flex items-start gap-4 md:gap-6">
                        {/* 番号 */}
                        <div className="absolute left-0 w-6 h-6 md:w-10 md:h-10 rounded-full bg-[#84ab52] text-white flex items-center justify-center text-xs md:text-sm font-medium">
                          {String(index + 1).padStart(2, '0')}
                        </div>

                        {/* コンテンツ */}
                        <div className="flex-1 bg-gray-50 rounded-xl p-6">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                            <h3 className="text-lg font-medium text-gray-800">{step.title}</h3>
                            <span className="inline-flex self-start md:self-auto items-center px-3 py-1 bg-[#84ab52]/10 text-[#84ab52] text-sm rounded-full whitespace-nowrap">
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
            )}

            {/* サポート内容 */}
            <div id="support" className="scroll-mt-32">
              <h2 className={sectionTitleClass}>{labels.support}</h2>
              {support.intro && <p className="text-gray-600 mb-8">{support.intro}</p>}

              <div className="grid md:grid-cols-2 gap-6">
                {support.items.map((item, index) => (
                  <div
                    key={index}
                    className="p-6 bg-white border border-gray-100 rounded-xl hover:shadow-lg hover:border-[#84ab52]/30 transition-all duration-300"
                  >
                    <div className="text-[#84ab52] mb-4">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {(supportIcons[index] ?? []).map((d, i) => (
                          <path
                            key={i}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d={d}
                          />
                        ))}
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                    <ul className="space-y-2">
                      {item.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#84ab52] flex-shrink-0"></span>
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
              <h2 className={sectionTitleClass}>{labels.budget}</h2>
              <p className="text-gray-600 mb-8">{budget.intro}</p>

              <div className="space-y-6">
                {budget.plans.map((plan, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                      <h3 className="text-lg font-medium text-gray-800">{plan.title}</h3>
                      <span className="inline-flex self-start md:self-auto items-center px-4 py-2 bg-[#84ab52] text-white text-sm font-medium rounded-lg">
                        {plan.price}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{plan.description}</p>
                    <ul className="grid sm:grid-cols-2 gap-2">
                      {plan.items.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#84ab52] flex-shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <p className="text-sm text-gray-500 mt-6">{budget.note}</p>
            </div>

            {/* よくある質問 */}
            <div id="faq" className="scroll-mt-32">
              <h2 className={sectionTitleClass}>{labels.faq}</h2>

              <div className="space-y-4">
                {faq.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="flex items-center gap-4">
                        <span className="text-[#84ab52] font-medium flex-shrink-0">
                          Q.{index + 1}
                        </span>
                        <span className="text-gray-800">{item.question}</span>
                      </span>
                      <svg
                        className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${
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
                        openFAQ === index ? 'max-h-[40rem]' : 'max-h-0'
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
