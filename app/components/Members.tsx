import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

type MemberProfile = {
  id: string;
  name: string;
  sub: string;
  bullets: string[];
  image?: string;
  /** 写真の余白が大きいため拡大表示する */
  zoom?: boolean;
};

type MemberGroup = {
  title: string;
  members: MemberProfile[];
};

// 言語に依存しない構成（氏名・経歴は messages/*.json の Members.people）
const GROUPS: { key: string; members: { id: string; image: string; zoom?: boolean }[] }[] = [
  {
    key: 'japanDesk',
    members: [
      { id: 'koei', image: '/images/koei-kurosawa.jpg', zoom: true },
      { id: 'ngan', image: '/images/Nguyen-ngoc-kim-ngan.jpg' },
      { id: 'honda', image: '/images/yuya-honda.jpg' },
    ],
  },
  {
    key: 'accounting',
    members: [
      { id: 'morita', image: '/images/teppei-morita.jpg' },
      { id: 'mai', image: '/images/le-thi-thu-mai.jpg' },
      { id: 'nhung', image: '/images/nguyen-thi-phuong-nhung.jpg' },
    ],
  },
  {
    key: 'legal',
    members: [
      { id: 'hiep', image: '/images/nguyen-truong-hiep.jpg' },
      { id: 'duong', image: '/images/tran-thi-thuy-duong.jpg' },
    ],
  },
];

export default async function Members() {
  const t = await getTranslations('Members');

  const groups: MemberGroup[] = GROUPS.map((g) => ({
    title: t(`groups.${g.key}`),
    members: g.members.map((m) => ({
      ...m,
      name: t(`people.${m.id}.name`),
      sub: t(`people.${m.id}.sub`),
      bullets: t.raw(`people.${m.id}.bullets`) as string[],
    })),
  }));
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
            {t('heading')}
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
                    key={member.id}
                    className="bg-white/95 rounded-2xl border border-[#dde7d7] shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 px-5 sm:px-6 md:px-8 py-5 sm:py-6 md:py-7 grid md:grid-cols-12 gap-6 items-center"
                  >
                    <div
                      className={`${isEven ? 'md:col-span-7 md:order-1' : 'md:col-span-7 md:order-2'}`}
                    >
                      <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-3">
                        <div className="text-lg sm:text-xl font-semibold text-[#2E2E2E]">
                          {member.name}
                        </div>
                        <div className="text-xs sm:text-sm text-[#6B6B6B] tracking-wide">
                          {member.sub}
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
                            alt={member.name}
                            fill
                            className={`object-cover ${
                              member.zoom ? 'scale-115' : ''
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
