import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { pageMetadata } from '../../lib/seo';
import type { Locale } from '@/i18n/routing';

type Props = { params: Promise<{ locale: string }> };

type Section = {
  title: string;
  paragraphs?: string[];
  items?: string[];
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Privacy' });
  return pageMetadata({
    locale: locale as Locale,
    path: '/privacy',
    title: t('title'),
    description: t('metaDescription'),
  });
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Privacy');
  const sections = t.raw('sections') as Section[];

  return (
    <main className="min-h-screen bg-white">
      <div className="pt-28 sm:pt-32 pb-16 sm:pb-20 md:pb-24">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* ヘッダー */}
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-xs sm:text-sm text-[#84ab52] tracking-[0.25em] uppercase font-light mb-2 sm:mb-3">
              Privacy Policy
            </p>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-light text-gray-700 tracking-wide">
              {t('title')}
            </h1>
          </div>

          <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-10">{t('intro')}</p>

          <div className="space-y-10">
            {sections.map((section, i) => (
              <section key={i}>
                <h2 className="text-base sm:text-lg font-medium text-gray-800 mb-3 pb-2 border-b border-gray-200">
                  {i + 1}. {section.title}
                </h2>
                {section.paragraphs?.map((p, j) => (
                  <p key={j} className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
                    {p}
                  </p>
                ))}
                {section.items && (
                  <ul className="list-disc pl-5 space-y-1.5 text-sm sm:text-base text-gray-700 leading-relaxed">
                    {section.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {/* お問い合わせ窓口 */}
          <section className="mt-12 p-6 bg-gray-50 rounded-xl text-sm sm:text-base text-gray-700 leading-relaxed">
            <h2 className="font-medium text-gray-800 mb-3">{t('contactTitle')}</h2>
            <p>Kurosawa Consulting Vietnam</p>
            <p>
              4th Floor, Phuong Long Building, 506 Nguyen Dinh Chieu Street, Ban Co Ward, Ho Chi
              Minh City, Vietnam
            </p>
            <p>
              Email:{' '}
              <a href="mailto:KCV_JBS_HCM@kurosawa.vn" className="text-[#84ab52] hover:underline">
                KCV_JBS_HCM@kurosawa.vn
              </a>
            </p>
            <p>
              Tel:{' '}
              <a href="tel:+842835200043" className="text-[#84ab52] hover:underline">
                028-3520-0043（Ext 30）
              </a>
            </p>
          </section>

          <p className="mt-8 text-right text-xs sm:text-sm text-gray-500">{t('established')}</p>
        </div>
      </div>
    </main>
  );
}
