import Image from 'next/image';

type MemberProfile = {
  nameJa: string;
  nameEn: string;
  bullets: string[];
  image?: string;
};

type MemberGroup = {
  title: string;
  members: MemberProfile[];
};

export default function Members() {
  const groups: MemberGroup[] = [
    {
      title: '日系企業サポートチーム',
      members: [
        {
          nameJa: '黒澤 功栄',
          nameEn: 'Koei Kurosawa',
          image: '/images/koei-kurosawa.jpg',
          bullets: [
            '公認会計士・税理士 ( 日本 ) 。',
            '1996 年から欧米系監査法人にて監査業務及び株式公開業務に従事。',
            '2001 年より日系コンサル及び米国企業にて戦略財務・経営コンサルティング業務に従事。',
            '2004 年から黒澤功栄税理士事務所を開業し日本企業及び非居住者に対して税務・会計サービスを提供、現在黒澤合同事務所グループ社長に就任。',
          ],
        },
        {
          nameJa: 'グエン・ゴック・キム・ガン',
          nameEn: 'Nguyen Ngoc Kim Ngan',
          image: '/images/Nguyen-ngoc-kim-ngan.jpg',
          bullets: [
            '日本語学士号取得、日本語能力試験（ JLPT ） N2 保有。',
            '税務、会計、法務分野における企業向けコンサルティングに 10 年以上の経験を持ち、 Big4 会計事務所出身。',
            '日本企業との直接的な取引において豊富な経験を有し、日本での実務経験もあり、日本企業および FDI 企業を幅広い分野で支援してきた。',
          ],
        },
        {
          nameJa: '本田 裕哉',
          nameEn: 'Yuya Honda',
          image: '/images/yuya-honda.jpg',
          bullets: [
            '1 級ファイナンシャル・プランニング技能士 ( FP1 級 )',
            '大学卒業後、株式会社福岡銀行に入社し、相続・事業承継支援、 M&A 業務、ストラクチャードファイナンス業務等に従事し頭取賞を 2 度受賞。',
            'その後大手Ｍ＆Ａ仲介会社にて、Ｍ＆Ａアドバイザーとして、ビルメンテナンス業をはじめ各種Ｍ＆Ａを仲介。',
            '現在クロサワ・コンサルティング・ベトナムにてクロスボーダー M&A 、各種税務・会計コンサル業務に対応。',
          ],
        },
      ],
    },
    {
      title: '会計部門',
      members: [
        {
          nameJa: '森田 哲平',
          nameEn: 'Teppei Morita',
          image: '/images/teppei-morita.jpg',
          bullets: [
            '公認会計士（日本）。',
            '2005 年より Big4 の大手監査法人にて監査業務及び株式公開業務、内部統制関連業務に従事。',
            '2013 年以降、約６年間同監査法人のベトナム法人を含めベトナムにて勤務、日系企業の進出支援ならびに税務、会計分野に関するコンサルティング業務、日系子会社の監査業務に従事。',
            '2018 年に Kurosawa Consulting Vietnam に加入、ベトナム及び日本の両面から各種サポートを実施。',
            '特に連結会計支援、 IFRS 導入支援、 M&A デューデリジェンスなどを対応。',
          ],
        },
        {
          nameJa: 'レ・ティ・トゥ・マイ',
          nameEn: 'Le Thi Thu Mai',
          image: '/images/le-thi-thu-mai.jpg',
          bullets: [
            '財務省　チーフアカウンタント、ベトナム公認会計士協会会員。',
            '製造業、貿易業、サービス業のクライアントに対し、 13 年以上にわたり会計・税務サポート業務に従事。',
            'VAT 還付や事業閉鎖をはじめとする各種会計・税務業務を担当。',
            '特に日系企業の支援に豊富な経験を有し、また、タイ・シンガポール企業の財務管理業務にも従事。',
            'ベトナムの各当局と連携し、クライアントの税務監査および税務調査をサポートした実績を持つ。',
          ],
        },
        {
          nameJa: 'グエン・ティ・フォン・ニュン',
          nameEn: 'Nguyen Thi Phuong Nhung',
          image: '/images/nguyen-thi-phuong-nhung.jpg',
          bullets: [
            'ベトナム国公認会計士、 N2 （日本語検定 2 級）保有。',
            '大手会計コンサルティング会社にて 8 年の業務経験あり。貿易業、製造業、サービス業の会計税務支援、 VAT 還付、移転価格対応などの様々な業務経験を有する。',
            '財務諸表作成、レビュー業務についても経験が長く、日系企業向けに財務デューデリジェンス業務についても経験が豊富。',
          ],
        },
      ],
    },
    {
      title: '法務部門',
      members: [
        {
          nameJa: 'グエン・チュオン・ヒエップ',
          nameEn: 'Nguyen Truong Hiep',
          image: '/images/nguyen-truong-hiep.jpg',
          bullets: [
            '弁護士 ( ベトナム・ ホーチミン市法科大学 ) 、チーフアカウンタント、豪州公認会計士協会メンバー。',
            'モスクワ大学学士 ( 経営管理 ) 及び修士 ( 工業管理学 ) 、欧米系大手会計事務所出身。',
            'ベトナム進出、会社設立、会計・税務、財務管理・経営管理、事業再編、クロスボーダー取引、リストラクチャリング分野で 10 年以上の経験。',
            '外資系企業に対する専門サービス提供の経験が豊富。',
          ],
        },
        {
          nameJa: 'ダオ・ティー・ラン・アン',
          nameEn: 'Dao Thi Lan Anh',
          image: '/images/dao-thi-lan-anh.jpg',
          bullets: [
            '弁護士 ( ベトナム・ホーチミン法律大学学士 ) 、弁護士資格保有、パンテオン・アサス大学パリ第２校修士',
            '売買・クロスボーダー投資、商取引、サービス契約、労働契約に関する紛争などのコンサルティングに従事。',
            '外国企業のベトナム法人設立や撤退、デューデリジェンス、企業が直面しやすい法的問題への対応に幅広い経験を有する。',
          ],
        },
      ],
    },
  ];

  return (
    <section
      id="members"
      className="py-20 bg-gradient-to-b from-white via-[#f3f8f1] to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* セクションヘッダー */}
        <div className="text-center mb-10 sm:mb-12 md:mb-14">
          <p className="text-xs sm:text-sm md:text-base text-[#84ab52] tracking-[0.25em] sm:tracking-[0.3em] uppercase font-light mb-2 sm:mb-3">
            Member
          </p>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-light text-gray-700 tracking-wide">
            メンバー
          </h2>
        </div>

        {groups.map((group) => (
          <div key={group.title} className="mb-14 sm:mb-16">
            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-[#6b7c5c] tracking-wide mb-4 sm:mb-6">
              {group.title}
            </h3>

            <div className="space-y-6 sm:space-y-8">
              {group.members.map((member, memberIndex) => {
                const isEven = memberIndex % 2 === 0;
                return (
                  <div
                    key={`${group.title}-${member.nameJa}`}
                    className="bg-white/95 rounded-2xl border border-[#dde7d7] shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 px-5 sm:px-6 md:px-8 py-5 sm:py-6 md:py-7 grid md:grid-cols-12 gap-6 items-center"
                  >
                    <div
                      className={`${isEven ? 'md:col-span-7 md:order-1' : 'md:col-span-7 md:order-2'}`}
                    >
                      <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-3">
                        <div className="text-lg sm:text-xl font-semibold text-[#2E2E2E]">
                          {member.nameJa}
                        </div>
                        <div className="text-xs sm:text-sm text-[#6B6B6B] tracking-wide">
                          {member.nameEn}
                        </div>
                      </div>
                      <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-[#5A5A5A] leading-relaxed">
                        {member.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    </div>
                    <div
                      className={`${isEven ? 'md:col-span-5 md:order-2' : 'md:col-span-5 md:order-1'} flex justify-center`}
                    >
                      {member.image ? (
                        <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full overflow-hidden bg-gray-100 border border-[#dde7d7] shadow-md relative">
                          <Image
                            src={member.image}
                            alt={member.nameJa}
                            fill
                            className={`object-cover ${
                              member.nameJa === '黒澤 功栄' ? 'scale-115' : ''
                            }`}
                            sizes="(max-width: 640px) 160px, (max-width: 768px) 192px, 224px"
                          />
                        </div>
                      ) : (
                        <div className="aspect-[4/3] rounded-xl bg-gray-200 border border-[#dde7d7] w-40 sm:w-48 md:w-56"></div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
