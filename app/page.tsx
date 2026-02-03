import Hero from './components/Hero';
import Achievement from './components/Achievement';
import Services from './components/Services';
import Articles from './components/Articles';
import Contact from './components/Contact';
import FAQ from './components/FAQ';

// ISR + Webhook のハイブリッド戦略
// 通常時は30秒キャッシュ、webhook で即時更新
export const revalidate = 30;

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
