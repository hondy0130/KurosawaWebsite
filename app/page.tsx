import type { Metadata } from 'next';
import Hero from './components/Hero';
import Achievement from './components/Achievement';
import Services from './components/Services';
import Articles from './components/Articles';
import Contact from './components/Contact';
import FAQ from './components/FAQ';

// ISR + Webhook のハイブリッド戦略
// 通常時は30秒キャッシュ、webhook で即時更新
export const revalidate = 30;

export const metadata: Metadata = {
  title: {
    absolute: 'Kurosawa Consulting Vietnam | ベトナムビジネスコンサルティング',
  },
  description:
    '日本企業のベトナム進出・現地法人運営を支援する総合コンサルティングファーム。会社設立、M&Aアドバイザリー、会計税務、法務労務まで一貫サポート。',
  alternates: {
    canonical: 'https://www.kurosawa-vn.net',
  },
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <main>
        <Hero />
        <Services />
        <Achievement />
        <Articles />
        <Contact />
        <FAQ />
      </main>
    </div>
  );
}
