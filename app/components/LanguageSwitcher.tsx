'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing, LOCALE_LABELS, type Locale } from '@/i18n/routing';

type Props = {
  /** ヘッダーが透明（ヒーロー上）か白背景か */
  isScrolled: boolean;
};

export default function LanguageSwitcher({ isScrolled }: Props) {
  const t = useTranslations('LanguageSwitcher');
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const rootRef = useRef<HTMLDivElement>(null);

  // メニュー外クリック・Escキーで閉じる
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [isOpen]);

  const switchTo = (next: Locale) => {
    setIsOpen(false);
    if (next === locale) return;
    // 現在のページ（クエリ・ハッシュ含む）のまま言語だけ切り替える
    const query = window.location.search;
    const hash = window.location.hash;
    startTransition(() => {
      router.replace(`${pathname}${query}${hash}`, { locale: next, scroll: false });
    });
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={t('label')}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`flex items-center gap-1.5 px-2.5 py-2 text-[13px] xl:text-[14px] font-light tracking-wide rounded transition-colors duration-300 whitespace-nowrap ${
          isScrolled
            ? 'text-gray-600 hover:text-[#84ab52] hover:bg-gray-50'
            : 'text-white/90 hover:text-white hover:bg-white/10'
        } ${isPending ? 'opacity-60' : ''}`}
      >
        {/* 地球アイコン */}
        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 21a9 9 0 100-18 9 9 0 000 18zm0 0c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m-8.25 9h16.5"
          />
        </svg>
        {/* スマホ幅では言語コードのみ表示 */}
        <span className="hidden sm:inline">{LOCALE_LABELS[locale]}</span>
        <span className="sm:hidden uppercase">{locale}</span>
        <svg
          className={`w-3 h-3 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <ul
        role="listbox"
        aria-label={t('label')}
        className={`absolute right-0 top-full mt-2 w-40 bg-white border border-gray-100 shadow-lg py-1.5 origin-top transition-all duration-200 ease-out z-50 ${
          isOpen
            ? 'opacity-100 scale-y-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-y-95 -translate-y-2 pointer-events-none'
        }`}
      >
        {routing.locales.map((l) => (
          <li key={l} role="option" aria-selected={l === locale}>
            <button
              type="button"
              lang={l}
              onClick={() => switchTo(l)}
              className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-light tracking-wide transition-colors ${
                l === locale
                  ? 'text-[#84ab52] bg-[#84ab52]/5'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-[#84ab52]'
              }`}
            >
              {LOCALE_LABELS[l]}
              {l === locale && (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
