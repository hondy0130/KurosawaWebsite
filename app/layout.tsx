import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono, Noto_Sans_JP } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import {
  getOrganizationJsonLd,
  getWebSiteJsonLd,
  getHCMOfficeJsonLd,
  getHanoiOfficeJsonLd,
} from './lib/jsonld';
import GoogleAnalytics from './components/GoogleAnalytics';

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

/* ─── サイト共通定数 ─── */
const SITE_URL = 'https://www.kurosawa-vn.net';
const SITE_NAME = 'Kurosawa Consulting Vietnam';
const DEFAULT_DESCRIPTION =
  '日本企業のベトナム進出・現地法人運営を支援する総合コンサルティングファーム。会社設立、M&Aアドバイザリー、会計税務、法務労務まで一貫サポート。';

/* ─── グローバルメタデータ ─── */
export const metadata: Metadata = {
  /* ベースURL（全ての相対URLの基準） */
  metadataBase: new URL(SITE_URL),

  /* タイトル：テンプレートで統一フォーマット */
  title: {
    default: `${SITE_NAME} | ベトナムビジネスコンサルティング`,
    template: `%s | ${SITE_NAME}`,
  },

  description: DEFAULT_DESCRIPTION,

  /* キーワード */
  keywords: [
    'ベトナム進出',
    'ベトナム コンサルティング',
    '日系企業 ベトナム',
    'ベトナム M&A',
    'ベトナム 会社設立',
    'ベトナム 会計',
    'ベトナム 税務',
    'ベトナム 法人設立',
    'ホーチミン コンサル',
    'ハノイ コンサル',
    'Kurosawa Consulting Vietnam',
  ],

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
    locale: 'ja_JP',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | ベトナムビジネスコンサルティング`,
    description: DEFAULT_DESCRIPTION,
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
    title: `${SITE_NAME} | ベトナムビジネスコンサルティング`,
    description: DEFAULT_DESCRIPTION,
    images: ['/kcv-logo.webp'],
  },

  /* ─── アイコン ─── */
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },

  /* ─── 正規URL ─── */
  alternates: {
    canonical: SITE_URL,
  },

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

  /* ─── Google Search Console 認証（取得後に設定） ─── */
  // verification: {
  //   google: 'YOUR_GSC_VERIFICATION_CODE',
  // },

  /* ─── その他 ─── */
  category: 'business',
};

/* ─── Viewport（Next.js 15 では別エクスポート） ─── */
export const viewport: Viewport = {
  themeColor: '#84ab52',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        {/* 構造化データ（JSON-LD） */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getOrganizationJsonLd()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getWebSiteJsonLd()),
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
        className={`${geistSans.variable} ${geistMono.variable} ${notoSansJP.variable} antialiased`}
      >
        <GoogleAnalytics />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
