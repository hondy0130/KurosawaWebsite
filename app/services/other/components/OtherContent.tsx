'use client';

import { useState, useEffect } from 'react';

const navItems = [
  { id: 'overview', label: 'サービス概要' },
  { id: 'support', label: 'サポート内容' },
  { id: 'budget', label: '参考予算' },
  { id: 'faq', label: 'よくある質問' },
];

const supportItems = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
        />
      </svg>
    ),
    title: '翻訳・通訳サービス',
    description: 'ビジネス文書の翻訳から会議通訳まで対応します。',
    features: ['契約書・法務文書翻訳', '技術文書翻訳', '会議・商談通訳', '同時通訳・逐次通訳'],
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
    title: '不動産コンサルティング',
    description: 'オフィス・工場用地の選定から契約までサポートします。',
    features: ['オフィス物件探索', '工場用地選定', '賃貸契約交渉', '内装工事手配'],
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
    title: '信用調査・企業調査',
    description: '取引先の信用調査や企業調査を行います。',
    features: ['企業信用調査', '財務状況調査', '経営者調査', 'デューデリジェンス支援'],
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
    title: '秘書代行サービス',
    description: '現地での各種業務を代行します。',
    features: ['電話・メール対応', 'スケジュール管理', '来客対応', '各種手配・予約'],
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    title: '市場調査・リサーチ',
    description: 'ベトナム市場の調査・分析を行います。',
    features: ['市場規模調査', '競合分析', '消費者調査', '業界動向レポート'],
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
    title: 'その他サポート',
    description: 'その他ベトナムビジネスに関するサポート。',
    features: ['ビジネスマッチング', '展示会出展支援', '政府機関との折衝', 'カスタムサービス'],
  },
];

const faqItems = [
  {
    question: '翻訳の納期はどのくらいですか？',
    answer:
      '文書の量や専門性により異なりますが、一般的なビジネス文書であれば1〜3営業日程度です。緊急対応も可能ですのでご相談ください。',
  },
  {
    question: 'オフィス物件の紹介だけでも依頼できますか？',
    answer: 'はい、物件紹介のみのご依頼も承っています。ご要望に合わせた物件をご紹介いたします。',
  },
  {
    question: '信用調査はどのような情報が得られますか？',
    answer:
      '企業の基本情報、財務状況、経営者情報、業界での評判など、ご要望に応じた情報を調査・レポートします。',
  },
  {
    question: '短期間のプロジェクトでも対応可能ですか？',
    answer: 'はい、短期プロジェクトや単発のご依頼にも対応しています。お気軽にご相談ください。',
  },
  {
    question: 'ここに記載のないサービスも相談できますか？',
    answer:
      'はい、ベトナムでのビジネスに関することであれば、まずはご相談ください。可能な限り対応いたします。',
  },
];

export default function OtherContent() {
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
                  その他サービスに関する
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
                  Vietnamは、主要サービス以外にも、ベトナムでのビジネスに関わる様々なサポートを提供しています。
                  翻訳・通訳、不動産、信用調査、秘書代行など、お客様のニーズに合わせた柔軟なサービスをご用意しています。
                </p>
                <p className="leading-relaxed mb-6">
                  「こんなことは頼めるだろうか」と思われることでも、まずはお気軽にご相談ください。
                  ベトナムでのビジネスを総合的にサポートするパートナーとして、可能な限りお応えします。
                </p>
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
                その他サービスに関する参考予算です。実際の費用はサービス内容により異なります。
              </p>

              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <h3 className="text-lg font-medium text-gray-800">翻訳サービス</h3>
                    <span className="inline-flex items-center px-4 py-2 bg-[#84ab52] text-white text-sm font-medium rounded-lg">
                      USD 15〜/ページ
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">各種ビジネス文書の翻訳</p>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84ab52]"></span>
                      契約書・法務文書
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84ab52]"></span>
                      技術文書
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84ab52]"></span>
                      マーケティング資料
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84ab52]"></span>
                      一般ビジネス文書
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <h3 className="text-lg font-medium text-gray-800">通訳サービス</h3>
                    <span className="inline-flex items-center px-4 py-2 bg-[#84ab52] text-white text-sm font-medium rounded-lg">
                      USD 150〜/半日
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">会議・商談の通訳サービス</p>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84ab52]"></span>
                      商談通訳
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84ab52]"></span>
                      会議通訳
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84ab52]"></span>
                      工場視察同行
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84ab52]"></span>
                      セミナー通訳
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <h3 className="text-lg font-medium text-gray-800">市場調査・信用調査</h3>
                    <span className="inline-flex items-center px-4 py-2 bg-[#84ab52] text-white text-sm font-medium rounded-lg">
                      USD 500〜
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">ベトナム市場・企業の調査サービス</p>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84ab52]"></span>
                      市場調査
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84ab52]"></span>
                      競合分析
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84ab52]"></span>
                      企業信用調査
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84ab52]"></span>
                      業界レポート
                    </li>
                  </ul>
                </div>
              </div>

              <p className="text-sm text-gray-500 mt-6">
                ※上記は参考価格です。サービス内容により変動します。詳細なお見積りはお問い合わせください。
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
