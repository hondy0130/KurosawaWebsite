'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const closeServicesTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // スクロール位置を監視
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    // 初期状態を設定
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white border-b border-gray-100' : 'bg-transparent border-b border-white/10'
      }`}
    >
      {/* 背景装飾 - さわやかな緑のグラデーション（スクロール時のみ） */}
      <div
        className={`absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-300 ${
          isScrolled ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-[#A5D6A7]/20 via-[#C8E6C9]/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-gradient-to-br from-[#81C784]/15 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-20">
        <div className="flex items-center justify-between h-24">
          {/* ロゴ */}
          <Link href="/" className="flex items-center flex-shrink-0 -ml-2 lg:-ml-4">
            <Image 
              src="/logo.png" 
              alt="Kurosawa Consulting Vietnam" 
              width={250}
              height={75}
              className={`h-14 w-auto transition-all duration-300 ${
                isScrolled ? '' : 'brightness-0 invert'
              }`}
              priority
            />
          </Link>

          {/* デスクトップナビゲーション */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-5 2xl:gap-6">
            <Link
              href="/"
              className={`text-[13px] xl:text-[14px] 2xl:text-[15px] font-light tracking-wide transition-colors duration-300 whitespace-nowrap px-1.5 py-2 ${
                isScrolled ? 'text-gray-600 hover:text-[#84ab52]' : 'text-white/90 hover:text-white'
              }`}
            >
              ホーム
            </Link>

            <Link
              href="/about"
              className={`text-[13px] xl:text-[14px] 2xl:text-[15px] font-light tracking-wide transition-colors duration-300 whitespace-nowrap px-1.5 py-2 ${
                isScrolled ? 'text-gray-600 hover:text-[#84ab52]' : 'text-white/90 hover:text-white'
              }`}
            >
              会社概要
            </Link>

            {/* サービスドロップダウン */}
            <div
              className="relative"
              onMouseEnter={openServices}
              onMouseLeave={scheduleCloseServices}
            >
              <button
                className={`text-[13px] xl:text-[14px] 2xl:text-[15px] font-light tracking-wide flex items-center gap-1 transition-colors duration-300 whitespace-nowrap px-1.5 py-2 ${
                  isScrolled
                    ? 'text-gray-600 hover:text-[#84ab52]'
                    : 'text-white/90 hover:text-white'
                }`}
              >
                サービス
                <svg
                  className={`w-3 h-3 transition-transform duration-300 ease-out ${
                    isServicesOpen ? 'rotate-180' : 'rotate-0'
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

              {/* ドロップダウンメニュー - アニメーション付き */}
              <div
                className={`absolute top-full left-0 mt-2 w-[560px] bg-white border border-gray-100 shadow-lg p-4 grid grid-cols-2 gap-4 origin-top transition-all duration-300 ease-out ${
                  isServicesOpen
                    ? 'opacity-100 scale-y-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 scale-y-95 -translate-y-2 pointer-events-none'
                }`}
                onMouseEnter={openServices}
                onMouseLeave={scheduleCloseServices}
              >
                {serviceCategories.map((cat, catIndex) => (
                  <div
                    key={cat.title}
                    className={`transition-all duration-300 ease-out ${
                      isServicesOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                    }`}
                    style={{
                      transitionDelay: isServicesOpen ? `${catIndex * 50}ms` : '0ms',
                    }}
                  >
                    <div className="px-3 pb-2 text-[11px] tracking-[0.2em] text-[#84ab52] font-light">
                      {cat.title}
                    </div>
                    <ul className="border-t border-gray-50">
                      {cat.items.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className="block px-3 py-2 text-sm font-light text-gray-600 hover:bg-gray-50 hover:text-[#84ab52] tracking-wide transition-colors duration-200"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/pricing"
              className={`text-[13px] xl:text-[14px] 2xl:text-[15px] font-light tracking-wide transition-colors duration-300 whitespace-nowrap px-1.5 py-2 ${
                isScrolled ? 'text-gray-600 hover:text-[#84ab52]' : 'text-white/90 hover:text-white'
              }`}
            >
              料金
            </Link>
            <Link
              href="/faq"
              className={`text-[13px] xl:text-[14px] 2xl:text-[15px] font-light tracking-wide transition-colors duration-300 whitespace-nowrap px-1.5 py-2 ${
                isScrolled ? 'text-gray-600 hover:text-[#84ab52]' : 'text-white/90 hover:text-white'
              }`}
            >
              FAQ
            </Link>
            <Link
              href="/news"
              className={`text-[13px] xl:text-[14px] 2xl:text-[15px] font-light tracking-wide transition-colors duration-300 whitespace-nowrap px-1.5 py-2 ${
                isScrolled ? 'text-gray-600 hover:text-[#84ab52]' : 'text-white/90 hover:text-white'
              }`}
            >
              ニュース
            </Link>
            <Link
              href="/careers"
              className={`text-[13px] xl:text-[14px] 2xl:text-[15px] font-light tracking-wide transition-colors duration-300 whitespace-nowrap px-1.5 py-2 ${
                isScrolled ? 'text-gray-600 hover:text-[#84ab52]' : 'text-white/90 hover:text-white'
              }`}
            >
              採用
            </Link>
            <Link
              href="/contact"
              className={`px-6 xl:px-8 2xl:px-10 py-2.5 xl:py-3 text-[13px] xl:text-[14px] 2xl:text-[15px] font-light tracking-wide transition-all duration-300 whitespace-nowrap ${
                isScrolled
                  ? 'bg-[#84ab52] text-white hover:bg-[#6d9143]'
                  : 'bg-white text-[#2E2E2E] hover:bg-white/90'
              }`}
            >
              無料相談
            </Link>
          </nav>

          {/* モバイルメニューボタン - アニメーション強化 */}
          <button
            className={`lg:hidden p-2 rounded transition-colors duration-300 ml-auto ${
              isScrolled ? 'hover:bg-gray-50' : 'hover:bg-white/10'
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="メニュー"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`block h-px transition-all duration-300 ease-out ${
                  isScrolled ? 'bg-gray-600' : 'bg-white'
                } ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}
              ></span>
              <span
                className={`block h-px transition-all duration-300 ease-out ${
                  isScrolled ? 'bg-gray-600' : 'bg-white'
                } ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}
              ></span>
              <span
                className={`block h-px transition-all duration-300 ease-out ${
                  isScrolled ? 'bg-gray-600' : 'bg-white'
                } ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}
              ></span>
            </div>
          </button>
        </div>

        {/* モバイルメニュー - アニメーション付き */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-out absolute left-0 right-0 top-full ${
            isMenuOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
          } ${isScrolled ? 'border-t border-gray-100 bg-white' : 'border-t border-white/10 bg-black/30 backdrop-blur-lg'}`}
        >
          <div className="py-6 px-10">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className={`text-sm font-light tracking-wide transition-colors duration-300 ${
                  isScrolled
                    ? 'text-gray-600 hover:text-[#84ab52]'
                    : 'text-white/90 hover:text-white'
                }`}
              >
                ホーム
              </Link>

              {/* モバイル用サービスメニュー - アニメーション付き */}
              <div>
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className={`text-sm font-light tracking-wide flex items-center gap-1 w-full transition-colors duration-300 ${
                    isScrolled
                      ? 'text-gray-600 hover:text-[#84ab52]'
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  サービス
                  <svg
                    className={`w-3 h-3 transition-transform duration-300 ease-out ${
                      isServicesOpen ? 'rotate-180' : 'rotate-0'
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
                  className={`ml-4 space-y-4 overflow-hidden transition-all duration-300 ease-out ${
                    isServicesOpen ? 'max-h-[600px] mt-2 opacity-100' : 'max-h-0 mt-0 opacity-0'
                  }`}
                >
                  {serviceCategories.map((cat, catIndex) => (
                    <div
                      key={cat.title}
                      className={`transition-all duration-300 ease-out ${
                        isServicesOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                      }`}
                      style={{
                        transitionDelay: isServicesOpen ? `${catIndex * 50}ms` : '0ms',
                      }}
                    >
                      <div
                        className={`text-xs tracking-[0.2em] font-light mb-2 transition-colors duration-300 ${
                          isScrolled ? 'text-[#84ab52]' : 'text-white'
                        }`}
                      >
                        {cat.title}
                      </div>
                      <div className="ml-3 space-y-1">
                        {cat.items.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={`block text-sm font-light tracking-wide transition-colors duration-300 ${
                              isScrolled
                                ? 'text-gray-500 hover:text-[#84ab52]'
                                : 'text-white/70 hover:text-white'
                            }`}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/pricing"
                className={`text-sm font-light tracking-wide transition-colors duration-300 ${
                  isScrolled
                    ? 'text-gray-600 hover:text-[#84ab52]'
                    : 'text-white/90 hover:text-white'
                }`}
              >
                料金プラン
              </Link>
              <Link
                href="/faq"
                className={`text-sm font-light tracking-wide transition-colors duration-300 ${
                  isScrolled
                    ? 'text-gray-600 hover:text-[#84ab52]'
                    : 'text-white/90 hover:text-white'
                }`}
              >
                よくある質問
              </Link>
              <Link
                href="/news"
                className={`text-sm font-light tracking-wide transition-colors duration-300 ${
                  isScrolled
                    ? 'text-gray-600 hover:text-[#84ab52]'
                    : 'text-white/90 hover:text-white'
                }`}
              >
                ニュース/コラム
              </Link>
              <Link
                href="/careers"
                className={`text-sm font-light tracking-wide transition-colors duration-300 ${
                  isScrolled
                    ? 'text-gray-600 hover:text-[#84ab52]'
                    : 'text-white/90 hover:text-white'
                }`}
              >
                採用情報
              </Link>
              <Link
                href="/contact"
                className={`text-sm font-light tracking-wide transition-colors duration-300 ${
                  isScrolled
                    ? 'text-[#84ab52] hover:text-[#6d9143]'
                    : 'text-white hover:text-white/80'
                }`}
              >
                無料相談
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
