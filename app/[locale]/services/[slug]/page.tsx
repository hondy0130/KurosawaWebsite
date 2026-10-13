import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Contact from '@/app/components/Contact';
import ServiceHero from '@/app/components/services/ServiceHero';
import ServiceDetailContent, {
  type ServiceDetailData,
} from '@/app/components/services/ServiceDetailContent';
import { SERVICES, getServiceBySlug } from '@/app/components/services/serviceConfig';
import { pageMetadata } from '@/app/lib/seo';
import { routing, type Locale } from '@/i18n/routing';

// サービス詳細ページ（/services/establishment, /services/ma, ... の6ページ共通）
type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => SERVICES.map((s) => ({ locale, slug: s.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  const tn = await getTranslations({ locale, namespace: 'ServiceNames' });
  const td = await getTranslations({ locale, namespace: 'ServiceDescriptions' });
  return pageMetadata({
    locale: locale as Locale,
    path: `/services/${slug}`,
    title: tn(service.key),
    description: td(service.key),
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();
  setRequestLocale(locale);

  const t = await getTranslations('ServiceDetail');
  const k = service.key;

  const data: ServiceDetailData = {
    labels: {
      overview: t('nav.overview'),
      support: t('nav.support'),
      budget: t('nav.budget'),
      faq: t('nav.faq'),
      ctaLine1: t('ctaLine1', { topic: t(`${k}.ctaTopic`) }),
      ctaLine2: t('ctaLine2'),
      contact: t('contact'),
    },
    overview: t.raw(`${k}.overview`),
    flow: service.hasFlow ? t.raw(`${k}.flow`) : undefined,
    support: t.raw(`${k}.support`),
    budget: t.raw(`${k}.budget`),
    faq: t.raw(`${k}.faq`),
  };

  return (
    <div className="min-h-screen">
      <main>
        {/* ヒーローセクション */}
        <ServiceHero service={service} />

        {/* メインコンテンツ（2カラムレイアウト） */}
        <ServiceDetailContent data={data} supportIcons={service.supportIcons} />

        {/* お問い合わせ（共通コンポーネント） */}
        <Contact />
      </main>
    </div>
  );
}
