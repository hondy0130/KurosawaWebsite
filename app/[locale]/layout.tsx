import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono, Noto_Sans, Noto_Sans_JP, Noto_Sans_SC } from 'next/font/google';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import '../globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LenisProvider from '../components/LenisProvider';
import {
  getOrganizationJsonLd,
  getWebSiteJsonLd,
  getHCMOfficeJsonLd,
  getHanoiOfficeJsonLd,
} from '../lib/jsonld';
import GoogleAnalytics from '../components/GoogleAnalytics';
import { routing, OG_LOCALES, type Locale } from '@/i18n/routing';
import { SITE_URL, SITE_NAME, buildAlternates, localizedUrl } from '../lib/seo';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const notoSansJP = Noto_Sans_JP({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
  display: 'swap',
});

/* ベトナム語の声調記号付き文字用 */
const notoSans = Noto_Sans({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin', 'vietnamese'],
  variable: '--font-noto-sans',
  display: 'swap',
  preload: false,
});

/* 中国語（簡体字）用 */
const notoSansSC = Noto_Sans_SC({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-noto-sans-sc',
  display: 'swap',
  preload: false,
});

/* クライアントコンポーネント（'use client'）が参照する翻訳の名前空間 */
const CLIENT_NAMESPACES = [
  'LanguageSwitcher',
  'ServiceNames',
  'ServiceDescriptions',
  'Header',
  'HomeServices',
  'Contact',
  'FAQ',
] as const;

/* ─── 全言語のパスを事前生成 ─── */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/* ─── グローバルメタデータ（言語別） ─── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Meta' });
  const defaultTitle = t('defaultTitle');
  const description = t('description');

  return {
    /* ベースURL（全ての相対URLの基準） */
    metadataBase: new URL(SITE_URL),

    /* タイトル：テンプレートで統一フォーマット */
    title: {
      default: defaultTitle,
      template: `%s | ${SITE_NAME}`,
    },

    description,

    /* キーワード */
    keywords: t.raw('keywords') as string[],

    /* 著者・発行者 */
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,

    /* 自動リンク検出の制御 */
    formatDetection: {
      telephone: false,
      email: false,
      address: false,
    },

    /* ─── Open Graph（デフォルト） ─── */
    openGraph: {
      type: 'website',
      locale: OG_LOCALES[locale as Locale],
      url: localizedUrl(locale as Locale),
      siteName: SITE_NAME,
      title: defaultTitle,
      description,
      images: [
        {
          url: '/kcv-logo.webp',
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
    },

    /* ─── Twitter Card ─── */
    twitter: {
      card: 'summary_large_image',
      title: defaultTitle,
      description,
      images: ['/kcv-logo.webp'],
    },

    /* ─── アイコン ─── */
    icons: {
      icon: '/favicon.ico',
      apple: '/favicon.ico',
    },

    /* ─── 正規URL・言語別URL（hreflang） ─── */
    alternates: buildAlternates(locale as Locale),

    /* ─── robots（本番環境: インデックス許可） ─── */
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    /* ─── その他 ─── */
    category: 'business',
  };
}

/* ─── Viewport（Next.js 15 では別エクスポート） ─── */
export const viewport: Viewport = {
  themeColor: '#84ab52',
  width: 'device-width',
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  // クライアントコンポーネントで使う翻訳だけをブラウザへ渡す（サービス詳細等の長文はサーバー側で処理）
  const allMessages = await getMessages();
  const messages = Object.fromEntries(
    CLIENT_NAMESPACES.map((ns) => [ns, allMessages[ns]])
  );
  const t = await getTranslations('Meta');

  return (
    <html lang={locale === 'zh' ? 'zh-Hans' : locale}>
      <head>
        {/* 構造化データ（JSON-LD） */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getOrganizationJsonLd(t('orgDescription'))),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getWebSiteJsonLd(locale)),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getHCMOfficeJsonLd()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getHanoiOfficeJsonLd()),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSansJP.variable} ${notoSans.variable} ${notoSansSC.variable} antialiased`}
      >
        <GoogleAnalytics />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <LenisProvider>
            <Header />
            {children}
            <Footer />
          </LenisProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
