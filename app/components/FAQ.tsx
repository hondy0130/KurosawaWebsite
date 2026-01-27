'use client';

import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: '初回相談は無料ですか？',
      answer:
        'もちろん無料です。　我々コンサルティング業の責務は「お悩み、課題に対し伴走してくれるパートナー」であるべきと考えております。　貴社のお悩みを深堀させていただき、見えてきた課題に対し提案するソリューションこそ我々の付加価値でございます。　課題を見つけるまでのお手伝いは無償にて対応させていただきますので、ぜひお気軽にご相談下さい。　',
    },
    {
      question: '中小企業ですが、相談可能ですか',
      answer:
        'もちろんでございます。　弊社メンバーはBig４と呼ばれる大手コンサルティングファームで専門的な実務経験を積んできたメンバーが8割を占めますが、料金体系は同大手ファームの半額～70％程度の相場でサービスをご提供させていただいています。　「品質は大手並み、料金はリーズナブル」というご評判のもとクライアントの80％程度はは中小企業様あるいは個人様になります。',
    },
    {
      question: 'どのような業界に対応していますか？',
      answer:
        '製造業、金融、小売、IT、医療、教育など、幅広い業界に対応しております。業界固有の課題にも精通したコンサルタントが担当いたします。',
    },
    {
      question: '費用はどのくらいかかりますか？',
      answer:
        'プロジェクトの内容、期間、規模によって異なります。まずはお客様の課題をお伺いし、最適なプランと見積もりをご提示させていただきます。透明性のある料金体系を心がけております。',
    },
    {
      question: 'リモートでの支援は可能ですか？',
      answer:
        'はい、オンラインでのご支援も可能です。ビデオ会議やチャットツールを活用し、効率的なコミュニケーションを実現します。必要に応じて対面とリモートを組み合わせたハイブリッド型の支援も可能です。',
    },
    {
      question: '守秘義務は守られますか？',
      answer:
        'もちろんです。　必要に応じてNDA（秘密保持契約書）もご用意させていただきますので、ご安心下さいませ。',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* セクションヘッダー */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <p className="text-xs sm:text-sm md:text-base text-[#84ab52] tracking-[0.25em] sm:tracking-[0.3em] uppercase font-light mb-2 sm:mb-3">
            FAQ
          </p>
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-gray-600 tracking-wide">
            よくある質問
          </h2>
        </div>

        {/* FAQ項目 */}
        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-4 sm:px-5 md:px-6 py-4 sm:py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm sm:text-base md:text-lg font-medium text-gray-900 pr-6 sm:pr-8">
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 text-[#84ab52] transition-transform flex-shrink-0 ${
                    openIndex === index ? 'rotate-180' : ''
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

              {openIndex === index && (
                <div className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 pt-0">
                  <div className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed border-t border-gray-100 pt-3 sm:pt-4">
                    {faq.answer}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* お問い合わせCTA */}
        <div className="mt-10 sm:mt-12 text-center bg-white rounded-xl p-6 sm:p-7 md:p-8 shadow-sm">
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
            その他のご質問がございますか？
          </h3>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-4 sm:mb-5 md:mb-6">
            お気軽にお問い合わせください。専門スタッフが丁寧にお答えいたします。
          </p>
          <a
            href="#contact"
            className="inline-block px-8 sm:px-10 py-3 sm:py-3.5 md:py-4 border border-[#2E2E2E] text-[#2E2E2E] text-xs sm:text-sm md:text-base font-light tracking-[0.2em] sm:tracking-widest hover:bg-[#2E2E2E] hover:text-white transition-colors duration-300"
          >
            お問い合わせする
          </a>
        </div>
      </div>
    </section>
  );
}
