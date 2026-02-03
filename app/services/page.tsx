import Link from 'next/link';
import Image from 'next/image';
import Contact from '@/app/components/Contact';

export const metadata = {
  title: 'サービス一覧 | Kurosawa Consulting Vietnam',
  description:
    'ベトナム拠点設立、M&Aアドバイザリー、会計税務コンサルティング、法務及び労務相談、各種ライセンス申請など、ベトナムビジネスを総合的にサポートします。',
};

type ServiceItem = {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  href: string;
  accentColor: string;
  features: string[];
};

const services: ServiceItem[] = [
  {
    number: '01',
    title: 'ベトナム拠点設立',
    subtitle: 'ESTABLISHMENT',
    description:
      '市場調査・進出戦略・法人設立・許認可・採用・バックオフィスまで。現地の制度と商習慣に精通したチームが、戦略から実行まで伴走します。',
    href: '/services/establishment',
    accentColor: '#84ab52',
    features: [
      '市場調査・進出戦略立案',
      '現地法人・駐在員事務所設立',
      '許認可取得サポート',
      'バックオフィス構築',
    ],
  },
  {
    number: '02',
    title: 'M&Aアドバイザリー',
    subtitle: 'M&A ADVISORY',
    description:
      'ターゲット探索・DD・バリュエーション・契約実務・PMI設計まで。日本本社とベトナム現地の双方に通じたチームで、意思決定と推進を高速化します。',
    href: '/services/ma',
    accentColor: '#84ab52',
    features: ['ターゲット企業探索', 'デューデリジェンス', 'バリュエーション', 'PMI設計・実行'],
  },
  {
    number: '03',
    title: '会計税務コンサルティング',
    subtitle: 'ACCOUNTING & TAX',
    description:
      '帳簿作成・月次/年次決算・税務申告・監査対応・日本連結レポーティングまで。現地基準と日本基準の「橋渡し」をワンチームで提供します。',
    href: '/services/accounting',
    accentColor: '#84ab52',
    features: [
      '帳簿作成・記帳代行',
      '月次・年次決算',
      '税務申告・税務調査対応',
      '日本連結レポーティング',
    ],
  },
  {
    number: '04',
    title: '法務及び労務相談',
    subtitle: 'LEGAL & LABOR',
    description:
      '契約書レビュー・労働法対応・就業規則整備・労務トラブル対応まで。現地法規制を熟知した専門家が、リスク管理と円滑な事業運営を支援します。',
    href: '/services/legal-labor',
    accentColor: '#84ab52',
    features: [
      '契約書作成・レビュー',
      '就業規則・社内規程整備',
      '労働法対応アドバイス',
      '労務トラブル対応',
    ],
  },
  {
    number: '05',
    title: '各種ライセンス申請',
    subtitle: 'LICENSE APPLICATION',
    description:
      '投資登録証明書・事業登録証明書・業種別ライセンス・労働許可証まで。複雑な申請手続きを代行し、スムーズな事業開始をサポートします。',
    href: '/services/license',
    accentColor: '#84ab52',
    features: [
      '投資登録証明書（IRC）',
      '事業登録証明書（ERC）',
      '業種別ライセンス取得',
      '労働許可証申請',
    ],
  },
  {
    number: '06',
    title: 'その他業務',
    subtitle: 'OTHER SERVICES',
    description:
      '翻訳・通訳サービス、不動産コンサルティング、信用調査、秘書代行など。ベトナムでのビジネスに関わる様々なご要望にお応えします。',
    href: '/services/other',
    accentColor: '#84ab52',
    features: [
      '翻訳・通訳サービス',
      '不動産コンサルティング',
      '信用調査・企業調査',
      '秘書代行サービス',
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
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
                    サービス一覧
                  </h1>
                  <p className="text-xs sm:text-sm sm:text-base text-white/90 font-light max-w-xl leading-relaxed">
                    ベトナムでのビジネス展開に必要なあらゆるサポートを
                    <br className="hidden sm:block" />
                    ワンストップでご提供いたします
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
                        <span>詳細を見る</span>
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
