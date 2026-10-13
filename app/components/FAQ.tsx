'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

type FAQItem = { question: string; answer: string };

export default function FAQ() {
  const t = useTranslations('FAQ');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = t.raw('items') as FAQItem[];

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
            {t('heading')}
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
            {t('ctaTitle')}
          </h3>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-4 sm:mb-5 md:mb-6">
            {t('ctaText')}
          </p>
          <a
            href="#contact"
            className="inline-block px-8 sm:px-10 py-3 sm:py-3.5 md:py-4 border border-[#2E2E2E] text-[#2E2E2E] text-xs sm:text-sm md:text-base font-light tracking-[0.2em] sm:tracking-widest hover:bg-[#2E2E2E] hover:text-white transition-colors duration-300"
          >
            {t('ctaButton')}
          </a>
        </div>
      </div>
    </section>
  );
}
