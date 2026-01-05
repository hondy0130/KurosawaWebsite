import Contact from '@/app/components/Contact';
import FAQ from '@/app/components/FAQ';
import MAHero from './components/MAHero';
import MAPreAcquisition from './components/MAPreAcquisition';
import MAPMI from './components/MAPMI';

export const metadata = {
  title: 'M&Aアドバイザリー | Kurosawa Consulting Vietnam',
  description:
    'クロスボーダーM&Aを戦略立案からPMIまで一気通貫でサポート。日本本社とベトナム現地の双方に通じたチームで、意思決定と推進を高速化します。',
};

export default function MAPage() {
  return (
    <div className="min-h-screen">
      <main>
        {/* ヒーローセクション（入り口ボタン付き） */}
        <MAHero />

        {/* 買収前サポート */}
        <MAPreAcquisition />

        {/* 買収後（PMI）サポート */}
        <MAPMI />

        {/* よくある質問（共通コンポーネント） */}
        <FAQ />

        {/* お問い合わせ（共通コンポーネント） */}
        <Contact />
      </main>
    </div>
  );
}
