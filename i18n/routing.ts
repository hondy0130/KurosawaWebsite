import { defineRouting } from 'next-intl/routing';

// 対応言語
// ja: 日本語（デフォルト・URLプレフィックスなし）
// en / vi / zh: /en, /vi, /zh 配下で表示
export const routing = defineRouting({
  locales: ['ja', 'en', 'vi', 'zh'],
  defaultLocale: 'ja',
  // 日本語は従来どおり `/about` のまま、他言語は `/en/about` のようにプレフィックスを付ける
  localePrefix: 'as-needed',
  // ブラウザ言語による自動リダイレクトは行わない（言語切替メニューで明示的に選択）
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];

/** 言語切替メニューの表示名（各言語の自称表記） */
export const LOCALE_LABELS: Record<Locale, string> = {
  ja: '日本語',
  en: 'English',
  vi: 'Tiếng Việt',
  zh: '中文',
};

/** 日付フォーマット用のロケール */
export const DATE_LOCALES: Record<Locale, string> = {
  ja: 'ja-JP',
  en: 'en-US',
  vi: 'vi-VN',
  zh: 'zh-CN',
};

/** hreflang / Open Graph 用のロケール */
export const HREFLANGS: Record<Locale, string> = {
  ja: 'ja',
  en: 'en',
  vi: 'vi',
  zh: 'zh-Hans',
};

export const OG_LOCALES: Record<Locale, string> = {
  ja: 'ja_JP',
  en: 'en_US',
  vi: 'vi_VN',
  zh: 'zh_CN',
};
