type MemberProfile = {
  nameJa: string;
  nameEn: string;
  bullets: string[];
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
          nameEn: 'K oei K u r os a wa',
          bullets: [
            '公認会計士・税理士(日本)',
            '1996年から欧米系監査法人にて監査業務及び株式公開業務に従事。',
            '2001年より日系コンサル及び米国企業にて戦略財務・経営コンサルティング業務に従事。',
            '2004年から黒澤功栄税理士事務所を開業し日本企業及び非居住者に対して税務・会計サービスを提供、現在黒澤合同事務所グループ社長に就任',
          ],
        },
        {
          nameJa: 'グエン・ゴック・キム・ガン',
          nameEn: 'Ng uy en Ng oc K i m Ng a n',
          bullets: [
            'N2（日本語検定2級）保有。',
            'Big4会計監査法人にて10年程度の業務経験あり。特に監査、税務、リスクコンサルティング分野において顧客窓口の最高責任者を経験。',
            '日本国内での業務経験もあり。日本語、英語での卓越したコミュニケーションスキルを有しており、顧客満足度の高い応対が可能。',
          ],
        },
        {
          nameJa: '本田 裕哉',
          nameEn: 'Yuya Honda',
          bullets: [
            '1級ファイナンシャル・プランニング技能士(FP1級)',
            '大学卒業後、株式会社福岡銀行に入社し、相続・事業承継支援、M&A業務、ストラクチャードファイナンス業務等に従事し頭取賞を2度受賞。',
            'その後大手M&A仲介会社にて、M&Aアドバイザーとして、ビルメンテナンス業をはじめ各種M&Aを仲介。',
            '現在クロサワ・コンサルティング・ベトナムにてクロスボーダーM&A、各種税務・会計コンサル業務に対応',
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
          bullets: [
            '公認会計士（日本）',
            '2005年よりBig4の大手監査法人にて監査業務及び株式公開業務、内部統制関連業務に従事',
            '2013年以降、約6年間同監査法人のベトナム法人に勤務。日系企業の進出支援ならびに税務・会計分野に関するコンサルティング業務、日系子会社の監査業務に従事',
            '2018年にK u r o s a w a C o n s u l t i n g V i e t n a mに加入、現在非常勤として日本から各種サポートを実施。',
            '特に連結会計支援、IFRS導入支援、M&Aデューデリジェンスなどを対応。',
          ],
        },
        {
          nameJa: 'レ・ティ・トゥ・マイ',
          nameEn: 'Le T h i T h u Ma i',
          bullets: [
            '財務省 チーフアカウンタント、ベトナム公認会計士協会会員',
            '製造業、貿易業、サービス業のクライアントに対し、13年以上にわたり会計・税務サポート業務に従事。VAT還付や事業閉鎖をはじめとする各種会計・税務業務を担当。',
            '特に日系企業の支援に豊富な経験を有し、また、タイ・シンガポール企業の財務管理業務にも従事。',
            'ベトナムの各当局と連携し、クライアントの税務監査および税務調査をサポートした実績を持つ。',
          ],
        },
        {
          nameJa: 'グエン・ティ・フォン・ニュン',
          nameEn: 'Ng u y en T h i Ph u on g Nh u n g',
          bullets: [
            'ベトナム国公認会計士、N2（日本語検定2級）保有。',
            '大手会計コンサルティング会社にて8年の業務経験あり。貿易業、製造業、サービス業の会計税務支援、VAT還付、移転価格対応などの様々な業務経験を有する。',
            '財務諸表作成、レビュー業務についても経験が長く、日系企業向けに財務デューデリジェンス業務についても経験が豊富',
          ],
        },
      ],
    },
    {
      title: '法務部門',
      members: [
        {
          nameJa: 'グエン・チュオン・ヒップ',
          nameEn: 'Ng u y en T r u on g Hi ep',
          bullets: [
            '弁護士(ベトナム・ホーチミン法律大学学士)、チーフアカウンタント、豪州公認会計士協会メンバー。',
            'モスクワ大学学士(経営管理)及び修士(工業管理学)、欧米系大手会計事務所出身。',
            'ベトナム進出、会社設立、会計・税務、財務管理・経営管理、事業再編、クロスボーダー取引、リストラクチャリング分野で10年以上の経験。',
            '外資系企業に対する専門サービス提供の経験が豊富。',
          ],
        },
        {
          nameJa: 'ハー・ティー・ゴック・アン',
          nameEn: 'Ha T h i Ng oc An h',
          bullets: [
            '弁護士(ベトナム・ホーチミン法律大学学士)、弁護士資格保有、ホーチミン法律大学経済法修士。',
            '売買・サービス契約、オフィス賃貸契約、労働契約に関する紛争のコンサルティングに従事。',
            '日系企業のベトナム法人設立や撤退、ローン登録手続き、企業が直面しやすい法的問題への対応に幅広い経験を有する。',
          ],
        },
      ],
    },
  ];

  return (
    <section id="members" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm text-[#C8102E] tracking-[0.3em] uppercase font-light mb-2">Member</p>
          <h2 className="text-xl md:text-2xl font-light text-gray-600 tracking-wide">メンバー</h2>
        </div>

        {groups.map((group, groupIndex) => (
          <div key={group.title} className="mb-14">
            <h3 className="text-lg md:text-xl font-light text-[#2E2E2E] tracking-wide mb-6">{group.title}</h3>

            <div className="space-y-8">
              {group.members.map((member, memberIndex) => {
                const isEven = memberIndex % 2 === 0;
                return (
                  <div
                    key={`${group.title}-${member.nameJa}`}
                    className="grid md:grid-cols-12 gap-6 items-center"
                  >
                    <div className={`${isEven ? 'md:col-span-7 md:order-1' : 'md:col-span-7 md:order-2'}`}>
                      <div className="bg-white border border-gray-100 rounded-xl p-6">
                        <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-3">
                          <div className="text-base font-medium text-[#2E2E2E]">{member.nameJa}</div>
                          <div className="text-xs text-[#6B6B6B] tracking-wide">{member.nameEn}</div>
                        </div>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-[#5A5A5A] leading-relaxed">
                          {member.bullets.map((b, i) => (
                            <li key={i}>{b}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className={`${isEven ? 'md:col-span-5 md:order-2' : 'md:col-span-5 md:order-1'}`}>
                      <div className="aspect-[4/3] rounded-xl bg-gray-200 border border-gray-100"></div>
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


