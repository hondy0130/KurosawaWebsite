import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import type { ServiceConfig } from './serviceConfig';

export default async function ServiceHero({ service }: { service: ServiceConfig }) {
  const t = await getTranslations('ServiceDetail');
  const tn = await getTranslations('ServiceNames');
  const td = await getTranslations('ServiceDescriptions');
  const titleLines = t.raw(`${service.key}.heroTitleLines`) as string[];
  const name = tn(service.key);

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl bg-[#84ab52]/10"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-3xl bg-[#84ab52]/5"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl bg-[#84ab52]/5"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* パンくずリスト */}
        <nav className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-400">
            <li>
              <Link href="/" className="hover:text-[#84ab52] transition-colors">
                {t('top')}
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/services" className="hover:text-[#84ab52] transition-colors">
                {t('services')}
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-600">{name}</li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* テキストコンテンツ */}
          <div>
            <p className="text-[#84ab52] text-sm tracking-[0.3em] uppercase font-light mb-4">
              {service.kicker}
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-800 leading-tight mb-6">
              {titleLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <p className="text-base md:text-lg text-gray-600 font-light leading-relaxed">
              {td(service.key)}
            </p>
          </div>

          {/* イメージエリア */}
          <div className="relative h-[300px] lg:h-[400px] rounded-2xl overflow-hidden bg-gradient-to-br from-[#84ab52]/20 to-[#84ab52]/5">
            <Image
              src={service.image}
              alt={name}
              fill
              className="object-contain md:object-cover opacity-90"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
