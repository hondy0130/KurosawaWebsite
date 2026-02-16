import Contact from '@/app/components/Contact';
import LicenseHero from './components/LicenseHero';
import LicenseContent from './components/LicenseContent';

export const metadata = {
  title: '各種ライセンス申請',
  description:
    '投資登録証明書・事業登録証明書・業種別ライセンス・労働許可証まで。複雑な申請手続きを代行し、スムーズな事業開始をサポートします。',
  alternates: {
    canonical: 'https://www.kurosawa-vn.net/services/license',
  },
  openGraph: {
    title: '各種ライセンス申請 | Kurosawa Consulting Vietnam',
    description:
      '投資登録証明書・事業登録証明書・業種別ライセンス・労働許可証まで。複雑な申請手続きを代行し、スムーズな事業開始をサポートします。',
    url: 'https://www.kurosawa-vn.net/services/license',
  },
};

export default function LicensePage() {
  return (
    <div className="min-h-screen">
      <main>
        <LicenseHero />
        <LicenseContent />
        <Contact />
      </main>
    </div>
  );
}
