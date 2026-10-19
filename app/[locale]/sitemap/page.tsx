import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SERVICES } from '../../components/services/serviceConfig';
import { pageMetadata } from '../../lib/seo';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';

// 人が閲覧するためのサイトマップページ（検索エンジン向けは app/sitemap.ts の /sitemap.xml）
type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SitemapPage' });
  return pageMetadata({
    locale: locale as Locale,
    path: '/sitemap',
    title: t('title'),
    description: t('metaDescription'),
  });
}

type LinkItem = { href: string; label: string; children?: LinkItem[] };

export default async function SitemapPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('SitemapPage');
  const th = await getTranslations('Header');
  const tf = await getTranslations('Footer');
  const tn = await getTranslations('ServiceNames');

  const groups: { title: string; links: LinkItem[] }[] = [
    {
      title: t('main'),
      links: [
        {
          href: '/',
          label: th('home'),
          children: [
            { href: '/#news', label: tf('news') },
            { href: '/#contact', label: th('consultation') },
            { href: '/#faq', label: tf('faq') },
          ],
        },
        {
          href: '/about',
          label: th('about'),
          children: [
            { href: '/about#company-info', label: tf('companyInfo') },
            { href: '/about#members', label: tf('members') },
          ],
        },
        { href: '/articles', label: tf('articles') },
        { href: '/careers', label: tf('careers') },
      ],
    },
    {
      title: th('services'),
      links: [
        {
          href: '/services',
          label: tn('list'),
          children: SERVICES.map((s) => ({ href: `/services/${s.slug}`, label: tn(s.key) })),
        },
      ],
    },
    {
      title: t('other'),
      links: [
        { href: '/privacy', label: tf('privacy') },
        { href: '/sitemap', label: tf('sitemap') },
      ],
    },
  ];

  const linkClass = 'text-gray-700 hover:text-[#84ab52] transition-colors';

  return (
    <main className="min-h-screen bg-white">
      <div className="pt-28 sm:pt-32 pb-16 sm:pb-20 md:pb-24">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-xs sm:text-sm text-[#84ab52] tracking-[0.25em] uppercase font-light mb-2 sm:mb-3">
              Sitemap
            </p>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-light text-gray-700 tracking-wide">
              {t('title')}
            </h1>
          </div>

          <div className="grid sm:grid-cols-3 gap-10">
            {groups.map((group) => (
              <section key={group.title}>
                <h2 className="text-sm tracking-[0.15em] uppercase text-[#84ab52] mb-4 pb-2 border-b border-gray-200">
                  {group.title}
                </h2>
                <ul className="space-y-3 text-sm sm:text-base">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className={linkClass}>
                        {link.label}
                      </Link>
                      {link.children && (
                        <ul className="mt-2 ml-4 space-y-2 text-sm border-l border-gray-200 pl-3">
                          {link.children.map((child) => (
                            <li key={child.href}>
                              <Link href={child.href} className={linkClass}>
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
