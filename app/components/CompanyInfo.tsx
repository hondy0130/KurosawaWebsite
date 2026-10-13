import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

export default async function CompanyInfo() {
  const t = await getTranslations('CompanyInfo');
  const history = t.raw('history') as string[];

  return (
    <section
      id="company-info"
      className="py-20 bg-gradient-to-b from-white via-[#f3f8f1] to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* サイドのビルディング画像（デスクトップのみ表示） */}
        <div className="pointer-events-none hidden lg:block absolute top-16 right-10">
          <div className="w-64 xl:w-72 h-80 rounded-3xl overflow-hidden shadow-[0_24px_48px_rgba(0,0,0,0.22)] border border-white/70 flex items-center justify-center">
            <Image
              src="/images/Building.jpg"
              alt="Office building in Ho Chi Minh City"
              width={360}
              height={260}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* セクションヘッダー */}
        <div className="text-center mb-12 sm:mb-14">
          <p className="text-xs sm:text-sm md:text-base text-[#84ab52] tracking-[0.25em] sm:tracking-[0.3em] uppercase font-light mb-2 sm:mb-3">
            Company Overview
          </p>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-gray-700 tracking-wide">
            {t('heading')}
          </h2>
        </div>

        {/* 基本情報 */}
        <div className="divide-y divide-gray-100 rounded-3xl overflow-hidden bg-white/95 border border-[#dde7d7] shadow-lg">
          <div className="p-6 md:p-8 grid md:grid-cols-12 gap-4 md:gap-8">
            <div className="md:col-span-3 text-xs tracking-[0.2em] text-gray-500 uppercase">
              {t('parentLabel')}
            </div>
            <div className="md:col-span-9 text-[#2E2E2E]">
              <div className="text-base">{t('parentName')}</div>
              <div className="text-sm text-[#6B6B6B] mt-1">
                {t('parentNote')}
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 grid md:grid-cols-12 gap-4 md:gap-8">
            <div className="md:col-span-3 text-xs tracking-[0.2em] text-gray-500 uppercase">
              {t('localLabel')}
            </div>
            <div className="md:col-span-9 text-[#2E2E2E]">
              <div className="text-base">Kurosawa Consulting Vietnam (KCV)</div>
              <div className="text-sm text-[#6B6B6B] mt-1">
                {t('localNote')}
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 grid md:grid-cols-12 gap-4 md:gap-8">
            <div className="md:col-span-3 text-xs tracking-[0.2em] text-gray-500 uppercase">
              {t('employeesLabel')}
            </div>
            <div className="md:col-span-9 text-[#2E2E2E]">
              <div className="text-base">{t('employeesValue')}</div>
              <div className="text-sm text-[#6B6B6B] mt-1">{t('employeesNote')}</div>
            </div>
          </div>

          <div className="p-6 md:p-8 grid md:grid-cols-12 gap-4 md:gap-8">
            <div className="md:col-span-3 text-xs tracking-[0.2em] text-gray-500 uppercase">
              {t('websiteLabel')}
            </div>
            <div className="md:col-span-9">
              <div className="flex flex-col gap-2">
                <a
                  href="https://www.kurosawa.gr.jp/"
                  className="text-[#84ab52] hover:underline break-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://www.kurosawa.gr.jp/
                </a>
                <a
                  href="http://kurosawa-vn.com/"
                  className="text-[#84ab52] hover:underline break-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  http://kurosawa-vn.com/
                </a>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 grid md:grid-cols-12 gap-4 md:gap-8">
            <div className="md:col-span-3 text-xs tracking-[0.2em] text-gray-500 uppercase">
              {t('historyLabel')}
            </div>
            <div className="md:col-span-9">
              <ul className="space-y-2">
                {history.map((line, i) => (
                  <li key={i} className="text-sm text-[#2E2E2E]">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
