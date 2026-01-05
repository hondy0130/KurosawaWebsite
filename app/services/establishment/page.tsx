import Contact from '@/app/components/Contact';
import EstablishmentHero from './components/EstablishmentHero';
import EstablishmentContent from './components/EstablishmentContent';

export const metadata = {
  title: 'ベトナム拠点設立 | Kurosawa Consulting Vietnam',
  description:
    '市場調査・進出戦略・法人設立・許認可・採用・バックオフィスまで。現地の制度と商習慣に精通したチームが、戦略から実行まで伴走します。',
};

export default function EstablishmentPage() {
  return (
    <div className="min-h-screen">
      <main>
        {/* ヒーローセクション */}
        <EstablishmentHero />

        {/* メインコンテンツ（2カラムレイアウト） */}
        <EstablishmentContent />

        {/* お問い合わせ（共通コンポーネント） */}
        <Contact />
      </main>
    </div>
  );
}
