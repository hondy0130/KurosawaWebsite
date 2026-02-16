'use client';

import Script from 'next/script';

/**
 * Google Analytics 4 コンポーネント
 *
 * 使い方:
 * 1. GA4 の測定 ID（G-XXXXXXXXXX）を取得
 * 2. 環境変数 NEXT_PUBLIC_GA4_ID に設定
 * 3. layout.tsx で <GoogleAnalytics /> を配置
 *
 * 環境変数例（.env.local）:
 *   NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
 */

const GA_ID = process.env.NEXT_PUBLIC_GA4_ID;

export default function GoogleAnalytics() {
  // 測定 ID が未設定の場合はレンダリングしない
  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}
