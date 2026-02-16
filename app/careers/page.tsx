import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '採用',
  description:
    'Kurosawa Consulting Vietnam（KCV）の採用情報ページです。ベトナムで日系企業を支援するコンサルティングファームの求人をご案内します。',
  alternates: {
    canonical: 'https://www.kurosawa-vn.net/careers',
  },
  openGraph: {
    title: '採用 | Kurosawa Consulting Vietnam',
    description:
      'Kurosawa Consulting Vietnam（KCV）の採用情報ページです。ベトナムで日系企業を支援するコンサルティングファームの求人をご案内します。',
    url: 'https://www.kurosawa-vn.net/careers',
  },
};

export default function CareersPage() {
  return (
    <main>
      {/* ヒーローセクション */}
      <section className="relative pt-32 pb-40 lg:pt-48 lg:pb-56 bg-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-gradient-to-bl from-[#A5D6A7]/40 via-[#C8E6C9]/25 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-gradient-to-tr from-[#81C784]/35 via-[#A5D6A7]/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#66BB6A]/15 to-transparent rounded-full blur-3xl"></div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#84ab52]/30 to-transparent"></div>
      </section>

      {/* 採用情報セクション */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-gradient-to-b from-white via-[#f3f8f1] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 md:mb-14">
            <p className="text-xs sm:text-sm md:text-base text-[#84ab52] tracking-[0.25em] sm:tracking-[0.3em] uppercase font-light mb-2 sm:mb-3">
              Careers
            </p>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-700 tracking-wide">
              採用
            </h1>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-white/95 rounded-2xl border border-[#dde7d7] shadow-sm px-6 py-12 sm:px-8 sm:py-16 text-center">
              <p className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed">
                現在募集予定はございません
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
