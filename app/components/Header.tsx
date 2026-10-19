'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const t = useTranslations('Header');
  const ts = useTranslations('ServiceNames');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  // 透明ヘッダー（白文字）はトップページのヒーロー画像上のみ。他のページは常に白背景＋濃い文字
  const isHome = pathname === '/';
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

  const serviceItems = [
    {
      name: ts('list'),
      href: '/services',
    },
    {
      name: ts('establishment'),
      subtext: ts('establishmentSub'),
      href: '/services/establishment',
    },
    { name: ts('ma'), href: '/services/ma' },
    { name: ts('accounting'), href: '/services/accounting' },
    { name: ts('legalLabor'), href: '/services/legal-labor' },
    { name: ts('license'), href: '/services/license' },
    { name: ts('other'), href: '/services/other' },
  ];

  const isSolid = isScrolled || !isHome;

  const navLinkClass = `text-[13px] xl:text-[14px] 2xl:text-[15px] font-light tracking-wide transition-colors duration-300 whitespace-nowrap px-1.5 py-2 ${
    isSolid ? 'text-gray-600 hover:text-[#84ab52]' : 'text-white/90 hover:text-white'
  }`;

  const mobileLinkClass =
    'text-sm font-light tracking-wide text-gray-800 hover:text-[#84ab52] transition-colors py-3 border-b border-gray-100';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isSolid
          ? 'bg-white border-b border-gray-100'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      {/* 背景装飾 */}
      <div
        className={`absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-300 ${
          isSolid ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-[#A5D6A7]/20 via-[#C8E6C9]/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-gradient-to-br from-[#81C784]/15 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-20">
        <div className="flex items-center justify-between h-16 sm:h-20 lg:h-24">
          {/* ロゴ */}
          <Link href="/" className="flex items-center flex-shrink-0 -ml-2 lg:-ml-4">
            <Image
              src="/logo.png"
              alt="Kurosawa Consulting Vietnam"
              width={250}
              height={75}
              className={`h-12 xl:h-14 w-auto transition-all duration-300 ${
                isSolid ? '' : 'brightness-0 invert'
              }`}
              priority
            />
          </Link>

          {/* デスクトップナビゲーション */}
          <nav className="hidden lg:flex items-center gap-2 xl:gap-4 2xl:gap-6">
            <Link href="/" className={navLinkClass}>
              {t('home')}
            </Link>

            <Link href="/about" className={navLinkClass}>
              {t('about')}
            </Link>

            {/* サービスドロップダウン */}
            <div
              className="relative"
              onMouseEnter={openServices}
              onMouseLeave={scheduleCloseServices}
            >
              <button className={`${navLinkClass} flex items-center gap-1`}>
                {t('services')}
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

              {/* ドロップダウンメニュー */}
              <div
                className={`absolute top-full left-0 mt-2 w-[320px] bg-white border border-gray-100 shadow-lg py-2 origin-top transition-all duration-300 ease-out ${
                  isServicesOpen
                    ? 'opacity-100 scale-y-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 scale-y-95 -translate-y-2 pointer-events-none'
                }`}
                onMouseEnter={openServices}
                onMouseLeave={scheduleCloseServices}
              >
                {serviceItems.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-4 py-3 text-sm font-light text-gray-600 hover:bg-gray-50 hover:text-[#84ab52] tracking-wide transition-all duration-200 ${
                      isServicesOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                    }`}
                    style={{
                      transitionDelay: isServicesOpen ? `${index * 30}ms` : '0ms',
                    }}
                  >
                    <span>{item.name}</span>
                    {item.subtext && (
                      <span className="block text-xs text-gray-400 mt-0.5">{item.subtext}</span>
                    )}
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/about#members" className={navLinkClass}>
              {t('members')}
            </Link>

            <Link href="/articles" className={navLinkClass}>
              {t('articles')}
            </Link>
            <Link href="/careers" className={navLinkClass}>
              {t('careers')}
            </Link>
            <Link
              href="/#contact"
              className={`px-5 xl:px-8 2xl:px-10 py-2.5 xl:py-3 text-[13px] xl:text-[14px] 2xl:text-[15px] font-light tracking-wide transition-all duration-300 whitespace-nowrap ${
                isSolid
                  ? 'bg-[#84ab52] text-white hover:bg-[#6d9143]'
                  : 'bg-white text-[#2E2E2E] hover:bg-white/90'
              }`}
            >
              {t('consultation')}
            </Link>

            {/* 言語切替（右上） */}
            <LanguageSwitcher isScrolled={isSolid} />
          </nav>

          {/* モバイル：言語切替 + メニューボタン */}
          <div className="lg:hidden flex items-center gap-1 ml-auto">
            <LanguageSwitcher isScrolled={isSolid} />
            <button
              className={`p-3 rounded transition-colors duration-300 ${
                isSolid ? 'hover:bg-gray-50' : 'hover:bg-white/10'
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={t('menu')}
              aria-expanded={isMenuOpen}
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span
                  className={`block h-px transition-all duration-300 ease-out ${
                    isSolid ? 'bg-gray-600' : 'bg-white'
                  } ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}
                ></span>
                <span
                  className={`block h-px transition-all duration-300 ease-out ${
                    isSolid ? 'bg-gray-600' : 'bg-white'
                  } ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}
                ></span>
                <span
                  className={`block h-px transition-all duration-300 ease-out ${
                    isSolid ? 'bg-gray-600' : 'bg-white'
                  } ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}
                ></span>
              </div>
            </button>
          </div>
        </div>

        {/* モバイルメニュー */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-out absolute left-0 right-0 top-full ${
            isMenuOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
          } ${isSolid ? 'border-t border-gray-100 bg-white' : 'border-t border-transparent bg-black/30 backdrop-blur-lg'}`}
        >
          <div className="py-4 px-6 sm:px-8">
            <nav className="flex flex-col">
              <Link href="/" className={mobileLinkClass} onClick={() => setIsMenuOpen(false)}>
                {t('home')}
              </Link>
              <Link href="/about" className={mobileLinkClass} onClick={() => setIsMenuOpen(false)}>
                {t('about')}
              </Link>
              <div className="py-3 border-b border-gray-100">
                <p className="text-xs font-semibold text-gray-400 tracking-[0.25em] uppercase mb-2">
                  {t('services')}
                </p>
                <div className="flex flex-col">
                  {serviceItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-sm font-light tracking-wide text-gray-800 hover:text-[#84ab52] transition-colors py-2.5 pl-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <Link
                href="/about#members"
                className={mobileLinkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('members')}
              </Link>
              <Link href="/articles" className={mobileLinkClass} onClick={() => setIsMenuOpen(false)}>
                {t('articles')}
              </Link>
              <Link href="/careers" className={mobileLinkClass} onClick={() => setIsMenuOpen(false)}>
                {t('careers')}
              </Link>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center mt-4 px-6 py-3.5 bg-[#84ab52] text-white text-sm font-light tracking-wide hover:bg-[#6d9143] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('consultation')}
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
