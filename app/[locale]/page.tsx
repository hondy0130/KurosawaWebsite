import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Hero from '../components/Hero';
import News from '../components/News';
import Achievement from '../components/Achievement';
import Services from '../components/Services';
import Articles from '../components/Articles';
import Contact from '../components/Contact';
import FAQ from '../components/FAQ';
import { buildAlternates } from '../lib/seo';
import type { Locale } from '@/i18n/routing';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Meta' });
  return {
    title: {
      absolute: t('defaultTitle'),
    },
    description: t('description'),
    alternates: buildAlternates(locale as Locale),
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen">
      <main>
        <Hero />
        <News />
        <Services />
        <Achievement />
        <Articles />
        <Contact />
        <FAQ />
      </main>
    </div>
  );
}
