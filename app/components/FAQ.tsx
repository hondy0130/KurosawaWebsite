'use client';

import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: '初回相談は無料ですか？',
      answer:
        'はい、初回のご相談は無料で承っております。お客様の課題をお伺いし、最適なソリューションをご提案させていただきます。お気軽にお問い合わせください。',
    },
    {
      question: 'プロジェクトの期間はどのくらいですか？',
      answer:
        'プロジェクトの内容や規模により異なりますが、一般的には3ヶ月から12ヶ月程度です。短期集中型から長期伴走型まで、お客様のニーズに合わせて柔軟に対応いたします。',
    },
    {
      question: '小規模な企業でも依頼できますか？',
      answer:
        'もちろんです。企業規模に関わらず、経営課題をお持ちの企業様をサポートいたします。中小企業様向けの料金プランもご用意しておりますので、ご相談ください。',
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
        '厳格な守秘義務契約を締結し、お客様の機密情報を厳重に管理いたします。情報セキュリティには最大限の注意を払っております。',
    },
    {
      question: '成果が出なかった場合はどうなりますか？',
      answer:
        'プロジェクト開始時にKPIを設定し、定期的に進捗を確認します。万が一、期待する成果が得られない場合は、原因を分析し、追加施策をご提案いたします。お客様の成功が私たちの目標です。',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* セクションヘッダー */}
        <div className="text-center mb-20">
          <p className="text-sm text-[#C8102E] tracking-[0.3em] uppercase font-light mb-2">FAQ</p>
          <h2 className="text-xl md:text-2xl font-light text-gray-600 tracking-wide">
            よくある質問
          </h2>
        </div>

        {/* FAQ項目 */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-900 pr-8">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-[#C8102E] transition-transform flex-shrink-0 ${
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
                <div className="px-6 pb-5 pt-0">
                  <div className="text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                    {faq.answer}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* お問い合わせCTA */}
        <div className="mt-12 text-center bg-white rounded-xl p-8 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-3">その他のご質問がございますか？</h3>
          <p className="text-gray-600 mb-6">
            お気軽にお問い合わせください。専門スタッフが丁寧にお答えいたします。
          </p>
          <a
            href="#contact"
            className="inline-block px-10 py-4 border border-[#2E2E2E] text-[#2E2E2E] text-sm font-light tracking-widest hover:bg-[#2E2E2E] hover:text-white"
          >
            お問い合わせする
          </a>
        </div>
      </div>
    </section>
  );
}
