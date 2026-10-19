import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export default async function Footer() {
  const t = await getTranslations('Footer');
  const ts = await getTranslations('ServiceNames');

  const linkClass = 'text-gray-400 hover:text-white transition-colors font-light tracking-wide';

  const serviceLinks = [
    { href: '/services/establishment', name: ts('establishment'), sub: ts('establishmentSub') },
    { href: '/services/ma', name: ts('ma') },
    { href: '/services/accounting', name: ts('accounting') },
    { href: '/services/legal-labor', name: ts('legalLabor') },
    { href: '/services/license', name: ts('license') },
    { href: '/services/other', name: ts('other') },
  ];

  const companyLinks = [
    { href: '/about#company-info', name: t('companyInfo') },
    { href: '/about#members', name: t('members') },
    { href: '/#faq', name: t('faq') },
    { href: '/#news', name: t('news') },
    { href: '/careers', name: t('careers') },
    { href: '/articles', name: t('articles') },
  ];

  return (
    <footer className="bg-[#2E2E2E] text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-12">
          {/* 会社情報 */}
          <div className="md:col-span-1 sm:col-span-2">
            <div className="flex flex-wrap items-center gap-3 mb-4 sm:mb-6">
              <Image
                src="/kcv-logo.webp"
                alt="Kurosawa Consulting Vietnam"
                width={150}
                height={40}
                className="h-9 sm:h-10 w-auto flex-shrink-0"
              />
              <span className="text-sm font-light tracking-wider text-white leading-snug">
                Kurosawa Consulting Vietnam
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed font-light tracking-wide">
              {t('tagline')}
            </p>
          </div>

          {/* サービス */}
          <div>
            <h3 className="font-light text-white mb-6 text-sm tracking-widest uppercase">
              Services
            </h3>
            <ul className="space-y-3 text-sm">
              {serviceLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.name}
                    {item.sub && <span className="block text-xs text-gray-500">{item.sub}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 企業情報 */}
          <div>
            <h3 className="font-light text-white mb-6 text-sm tracking-widest uppercase">
              Company
            </h3>
            <ul className="space-y-3 text-sm">
              {companyLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* お問い合わせ */}
          <div>
            <h3 className="font-light text-white mb-6 text-sm tracking-widest uppercase">
              Contact
            </h3>
            <ul className="space-y-6 text-sm">
              <li className="text-gray-400">
                <div className="font-light text-white mb-2 tracking-wide">Ho Chi Minh Office</div>
                <div className="font-light">
                  4th Floor, Phuong Long Building, 506 Nguyen Dinh Chieu Street, Ban Co Ward, Ho Chi Minh City, Vietnam
                </div>
                <a
                  href="tel:+842835200043"
                  className="hover:text-white transition-colors font-light tracking-wide block mt-1"
                >
                  028-3520-0043（Ext 30）
                </a>
              </li>
              <li className="text-gray-400">
                <div className="font-light text-white mb-2 tracking-wide">Hanoi Office</div>
                <div className="font-light">
                  22F, Ngoc Khanh Plaza Building, No.1 Pham Huy Thong Street, Ngoc Khanh Ward, Ba
                  Dinh District, Hanoi
                </div>
                <a
                  href="tel:+84902852032"
                  className="hover:text-white transition-colors font-light tracking-wide block mt-1"
                >
                  090-2852-032
                </a>
              </li>
              <li className="text-gray-400 space-y-2">
                <div className="font-light text-white tracking-wide">Email</div>
                <a
                  href="mailto:KCV_JBS_HCM@kurosawa.vn"
                  className="hover:text-white transition-colors break-all font-light tracking-wide block"
                >
                  KCV_JBS_HCM@kurosawa.vn
                </a>
              </li>
              <li className="text-gray-400 space-y-2">
                <div className="font-light text-white tracking-wide">Website</div>
                <div className="flex flex-col gap-2">
                  <a
                    href="https://www.kurosawa.gr.jp/"
                    className="hover:text-white transition-colors break-all font-light tracking-wide"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://www.kurosawa.gr.jp/
                  </a>
                  <a
                    href="http://kurosawa-vn.com/"
                    className="hover:text-white transition-colors break-all font-light tracking-wide"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    http://kurosawa-vn.com/
                  </a>
                </div>
              </li>
              <li className="text-gray-400 space-y-2">
                <div className="font-light text-white tracking-wide">Facebook</div>
                <div className="font-light">{t('facebookName')}</div>
              </li>
            </ul>
          </div>
        </div>

        {/* ボーダーとコピーライト */}
        <div className="border-t border-gray-700 pt-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-xs text-gray-500 font-light tracking-wide">
              © {new Date().getFullYear()} Kurosawa Consulting Vietnam. All rights reserved.
            </div>
            <div className="flex gap-8 text-xs">
              <Link
                href="/privacy"
                className="text-gray-500 hover:text-white transition-colors font-light tracking-wide"
              >
                {t('privacy')}
              </Link>
              <Link
                href="/sitemap"
                className="text-gray-500 hover:text-white transition-colors font-light tracking-wide"
              >
                {t('sitemap')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
