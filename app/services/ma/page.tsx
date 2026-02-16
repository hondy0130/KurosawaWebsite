import Contact from '@/app/components/Contact';
import MAHero from './components/MAHero';
import MAContent from './components/MAContent';

export const metadata = {
  title: 'M&Aアドバイザリー',
  description:
    'ターゲット探索・DD・バリュエーション・契約実務・PMI設計まで。日本本社とベトナム現地の双方に通じたチームで、意思決定と推進を高速化します。',
  alternates: {
    canonical: 'https://www.kurosawa-vn.net/services/ma',
  },
  openGraph: {
    title: 'M&Aアドバイザリー | Kurosawa Consulting Vietnam',
    description:
      'ターゲット探索・DD・バリュエーション・契約実務・PMI設計まで。日本本社とベトナム現地の双方に通じたチームで、意思決定と推進を高速化します。',
    url: 'https://www.kurosawa-vn.net/services/ma',
  },
};

export default function MAPage() {
  return (
    <div className="min-h-screen">
      <main>
        {/* ヒーローセクション */}
        <MAHero />

        {/* メインコンテンツ（2カラムレイアウト） */}
        <MAContent />

        {/* お問い合わせ（共通コンポーネント） */}
        <Contact />
      </main>
    </div>
  );
}
