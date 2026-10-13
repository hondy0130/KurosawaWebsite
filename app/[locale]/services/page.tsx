import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Contact from '@/app/components/Contact';
import { SERVICES } from '@/app/components/services/serviceConfig';
import { pageMetadata } from '@/app/lib/seo';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const tn = await getTranslations({ locale, namespace: 'ServiceNames' });
  const t = await getTranslations({ locale, namespace: 'ServicesPage' });
  return pageMetadata({
    locale: locale as Locale,
    path: '/services',
    title: tn('list'),
    description: t('metaDescription'),
  });
}

type ServiceItem = {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  href: string;
  accentColor: string;
  features: string[];
};

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('ServicesPage');
  const tn = await getTranslations('ServiceNames');
  const td = await getTranslations('ServiceDescriptions');

  const services: ServiceItem[] = SERVICES.map((s, i) => ({
    number: String(i + 1).padStart(2, '0'),
    title: tn(s.key),
    subtitle: s.kicker.toUpperCase(),
    description: td(s.key),
    href: `/services/${s.slug}`,
    accentColor: '#84ab52',
    features: t.raw(`features.${s.key}`) as string[],
  }));

  return (    <div className="min-h-screen">
      <main>
        {/* ヒーローセクション：Entrance画像＋Our companyと同テイスト */}
        <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 bg-white overflow-hidden">
          <div className="relative max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-xl">
            <div className="relative h-[260px] sm:h-[320px] md:h-[380px] lg:h-[420px]">
              <Image
                src="/images/Entrance.jpg"
                alt="Entrance of Kurosawa Consulting Vietnam office"
                fill
                priority
                className="object-cover"
              />
              {/* グラデーションオーバーレイ */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20" />

              {/* フローティングカード（左上・少し小さめ） */}
              <div className="absolute inset-0 flex items-start justify-start px-4 sm:px-8 pt-8 sm:pt-10 md:pt-16">
                <div className="w-[82%] sm:w-[60%] md:w-[50%] lg:w-[45%] bg-white/14 border border-white/25 rounded-3xl backdrop-blur-md px-6 py-6 sm:px-8 sm:py-7 md:px-9 md:py-8 text-left shadow-[0_20px_45px_rgba(0,0,0,0.35)]">
                  <p className="text-xs sm:text-sm text-[#d7e8c2] tracking-[0.3em] uppercase font-light mb-2 sm:mb-3">
                    Services
                  </p>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white tracking-wide mb-3 sm:mb-4">
                    {tn('list')}
                  </h1>
                  <p className="text-xs sm:text-sm sm:text-base text-white/90 font-light max-w-xl leading-relaxed">
                    {t('lead1')}
                    <br className="hidden sm:block" />
                    {t('lead2')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* サービス一覧 */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {services.map((service) => (
                <Link key={service.number} href={service.href} className="group block">
                  <div className="relative h-full p-6 sm:p-8 bg-white border border-gray-100 rounded-2xl hover:border-[#84ab52]/30 hover:shadow-xl transition-all duration-500 overflow-hidden">
                    {/* 背景グラデーション */}
                    <div
                      className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ backgroundColor: `${service.accentColor}20` }}
                    ></div>

                    {/* コンテンツ */}
                    <div className="relative">
                      {/* 番号とサブタイトル */}
                      <div className="flex items-center gap-3 mb-4">
                        <span
                          className="text-2xl sm:text-3xl font-light"
                          style={{ color: service.accentColor }}
                        >
                          {service.number}
                        </span>
                        <span className="text-[10px] sm:text-xs tracking-[0.2em] text-gray-400 uppercase">
                          {service.subtitle}
                        </span>
                      </div>

                      {/* タイトル */}
                      <h2 className="text-xl sm:text-2xl font-normal text-gray-800 mb-4 group-hover:text-[#84ab52] transition-colors">
                        {service.title}
                      </h2>

                      {/* 説明文 */}
                      <p className="text-sm text-gray-600 leading-relaxed mb-6">
                        {service.description}
                      </p>

                      {/* 特徴リスト */}
                      <ul className="space-y-2 mb-6">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-gray-500">
                            <span
                              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{ backgroundColor: service.accentColor }}
                            ></span>
                            {feature}
                          </li>
                        ))}
                      </ul>

                      {/* 詳細リンク */}
                      <div className="flex items-center gap-2 text-sm font-medium text-[#84ab52] group-hover:gap-3 transition-all">
                        <span>{t('details')}</span>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* お問い合わせ */}
        <Contact />
      </main>
    </div>
  );
}
