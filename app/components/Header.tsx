'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const closeServicesTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseServicesTimer = () => {
    if (closeServicesTimerRef.current) {
      clearTimeout(closeServicesTimerRef.current);
      closeServicesTimerRef.current = null;
    }
  };

  const openServices = () => {
    clearCloseServicesTimer();
    setIsServicesOpen(true);
  };

  const scheduleCloseServices = () => {
    clearCloseServicesTimer();
    closeServicesTimerRef.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 200);
  };

  const serviceCategories = [
    {
      title: '設立・投資サポート',
      items: [
        { name: 'ライセンス取得', href: '/services/license' },
        { name: 'ビジネスパートナー紹介', href: '/services/partners' },
        { name: 'M&Aコンサル', href: '/services/ma' },
      ],
    },
    {
      title: '会計・税務アドバイザリー',
      items: [
        { name: '企業評価（バリュエーション）', href: '/services/valuation' },
        { name: '財務・税務DD', href: '/services/dd' },
        { name: '顧問契約', href: '/services/retainer' },
      ],
    },
    {
      title: 'その他のサービス',
      items: [
        { name: '翻訳サービス', href: '/services/translation' },
        { name: '個人情報保護対応', href: '/services/privacy' },
        { name: '債権回収', href: '/services/debt-collection' },
        { name: '不動産コンサル', href: '/services/real-estate' },
        { name: '信用調査', href: '/services/credit-check' },
        { name: '秘書代行', href: '/services/secretarial' },
      ],
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      {/* 背景装飾 - さわやかな緑のグラデーション */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-[#A5D6A7]/20 via-[#C8E6C9]/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-gradient-to-br from-[#81C784]/15 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-8 lg:px-12 relative z-10">
        <div className="flex justify-between items-center h-20">
          {/* ロゴ */}
          <Link href="/" className="flex items-center">
            <div className="flex items-center gap-3">
              <div className="flex gap-0.5">
                <div className="w-2 h-8 bg-[#C8102E]"></div>
                <div className="w-2 h-8 bg-[#2C5F2D]"></div>
              </div>
              <span className="text-lg font-light tracking-wider text-[#2E2E2E]">
                Kurosawa Consulting Vietnam
              </span>
            </div>
          </Link>

          {/* デスクトップナビゲーション */}
          <nav className="hidden lg:flex items-center space-x-10">
            <Link
              href="/"
              className="text-[13px] font-light text-gray-600 hover:text-[#C8102E] tracking-wide"
            >
              ホーム
            </Link>

            {/* サービスドロップダウン */}
            <div
              className="relative"
              onMouseEnter={openServices}
              onMouseLeave={scheduleCloseServices}
            >
              <button className="text-[13px] font-light text-gray-600 hover:text-[#C8102E] tracking-wide flex items-center gap-1">
                サービス
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isServicesOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-[560px] bg-white border border-gray-100 shadow-lg p-4 grid grid-cols-2 gap-4"
                  onMouseEnter={openServices}
                  onMouseLeave={scheduleCloseServices}
                >
                  {serviceCategories.map((cat) => (
                    <div key={cat.title}>
                      <div className="px-3 pb-2 text-[11px] tracking-[0.2em] text-[#C8102E] font-light">{cat.title}</div>
                      <ul className="border-t border-gray-50">
                        {cat.items.map((item) => (
                          <li key={item.name}>
                            <Link
                              href={item.href}
                              className="block px-3 py-2 text-sm font-light text-gray-600 hover:bg-gray-50 hover:text-[#C8102E] tracking-wide"
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/works"
              className="text-[13px] font-light text-gray-600 hover:text-[#C8102E] tracking-wide"
            >
              実績・お客様の声
            </Link>
            <Link
              href="/pricing"
              className="text-[13px] font-light text-gray-600 hover:text-[#C8102E] tracking-wide"
            >
              料金プラン
            </Link>
            <Link
              href="/faq"
              className="text-[13px] font-light text-gray-600 hover:text-[#C8102E] tracking-wide"
            >
              よくある質問
            </Link>
            <Link
              href="/about"
              className="text-[13px] font-light text-gray-600 hover:text-[#C8102E] tracking-wide"
            >
              会社概要
            </Link>
            <Link
              href="/contact"
              className="px-8 py-2.5 bg-[#C8102E] text-white text-[13px] font-light tracking-wide hover:bg-[#A00D24]"
            >
              無料相談
            </Link>
          </nav>

          {/* モバイルメニューボタン */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="メニュー"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`block h-px bg-gray-600 transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}
              ></span>
              <span
                className={`block h-px bg-gray-600 transition-all ${isMenuOpen ? 'opacity-0' : ''}`}
              ></span>
              <span
                className={`block h-px bg-gray-600 transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}
              ></span>
            </div>
          </button>
        </div>

        {/* モバイルメニュー */}
        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-gray-100">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-sm font-light text-gray-600 hover:text-[#C8102E] tracking-wide"
              >
                ホーム
              </Link>

              {/* モバイル用サービスメニュー */}
              <div>
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="text-sm font-light text-gray-600 hover:text-[#C8102E] tracking-wide flex items-center gap-1 w-full"
                >
                  サービス
                  <svg
                    className={`w-3 h-3 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`}
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
                {isServicesOpen && (
                  <div className="ml-4 mt-2 space-y-4">
                    {serviceCategories.map((cat) => (
                      <div key={cat.title}>
                        <div className="text-xs tracking-[0.2em] text-[#C8102E] font-light mb-2">{cat.title}</div>
                        <div className="ml-3 space-y-1">
                          {cat.items.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="block text-sm font-light text-gray-500 hover:text-[#C8102E] tracking-wide"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/works"
                className="text-sm font-light text-gray-600 hover:text-[#C8102E] tracking-wide"
              >
                実績・お客様の声
              </Link>
              <Link
                href="/pricing"
                className="text-sm font-light text-gray-600 hover:text-[#C8102E] tracking-wide"
              >
                料金プラン
              </Link>
              <Link
                href="/faq"
                className="text-sm font-light text-gray-600 hover:text-[#C8102E] tracking-wide"
              >
                よくある質問
              </Link>
              <Link
                href="/about"
                className="text-sm font-light text-gray-600 hover:text-[#C8102E] tracking-wide"
              >
                会社概要
              </Link>
              <Link
                href="/contact"
                className="text-sm font-light text-[#C8102E] hover:text-[#A00D24] tracking-wide"
              >
                無料相談
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
