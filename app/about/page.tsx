import Image from 'next/image';
import Strengths from '../components/Strengths';
import Members from '../components/Members';
import CompanyInfo from '../components/CompanyInfo';

export default function AboutPage() {
  return (
    <main>
      {/* ヒーローセクション：Office写真＋「Our company」カード */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 bg-white overflow-hidden">
        {/* 背景写真 */}
        <div className="relative max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-xl">
          <div className="relative h-[260px] sm:h-[320px] md:h-[380px] lg:h-[420px]">
            <Image
              src="/images/Office.jpg"
              alt="Kurosawa Consulting Vietnam Office"
              fill
              priority
              className="object-cover"
            />
            {/* グラデーションオーバーレイ（右側は少し透けるように） */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-black/10" />

            {/* フローティングカード（左上寄せ・少し小さめ） */}
            <div className="absolute inset-0 flex items-start justify-start px-4 sm:px-8 pt-6 sm:pt-8 md:pt-10">
              <div className="w-[82%] sm:w-[60%] md:w-[50%] lg:w-[42%] bg-white/14 border border-white/25 rounded-3xl backdrop-blur-md px-5 py-6 sm:px-7 sm:py-7 md:px-8 md:py-8 flex flex-col gap-4 shadow-[0_16px_40px_rgba(0,0,0,0.35)]">
                <div className="space-y-2 sm:space-y-3">
                  <p className="text-xs sm:text-sm tracking-[0.25em] text-white/70 uppercase mb-2">
                    Professional
                  </p>
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-1 sm:mb-2">
                    Our company
                  </h1>
                  <p className="text-xs sm:text-sm md:text-base text-white/85 leading-relaxed max-w-xl">
                    ベトナムビジネスの拡大を伴走型パートナーとしてご支援いたします。
                  </p>
                </div>

                <div className="flex flex-row items-center justify-start gap-3 pt-1">
                  <div className="w-12 sm:w-16 border-t border-white/60" />
                  <a
                    href="#company-info"
                    className="inline-flex items-center text-xs sm:text-sm md:text-base font-medium text-white tracking-wide group"
                  >
                    Read More
                    <span className="ml-2 w-4 sm:w-5 h-[1px] bg-white/80 group-hover:w-8 transition-all duration-300" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strengths */}
      <Strengths />

      {/* Company Information (会社概要) */}
      <CompanyInfo />

      {/* Member */}
      <Members />
    </main>
  );
}
