export default function CompanyOverview() {
  return (
    <section id="why-us" className="bg-white py-16 sm:py-20 md:py-24 lg:py-32">
      {/* Section header (like Services/Case Studies) */}
      <div className="text-center mb-12 sm:mb-16 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <p className="text-xs sm:text-sm md:text-base text-[#84ab52] tracking-[0.25em] sm:tracking-[0.3em] uppercase font-light mb-2 sm:mb-3">
          Company Overview
        </p>
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-gray-600 tracking-wide">
          企業概要
        </h2>
      </div>
      {/* Top visual */}
      <div className="relative w-full h-[56vh] md:h-[72vh] overflow-hidden">
        <div className="absolute inset-0 bg-[url('/ho_chi_minh.png')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Copy + Links area (align to Hero green blobs) */}
      <div className="relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-gradient-to-bl from-[#A5D6A7]/40 via-[#C8E6C9]/25 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-gradient-to-tr from-[#81C784]/35 via-[#A5D6A7]/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#66BB6A]/15 to-transparent rounded-full blur-3xl"></div>
        </div>
        <div className="relative">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-14 md:py-16 lg:py-20 grid md:grid-cols-12 gap-6 sm:gap-8 md:gap-10 items-start">
            {/* Left: corporate overview copy */}
            <div className="md:col-span-6">
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light text-[#2E2E2E] leading-tight mb-4 sm:mb-5 md:mb-6">
                ベトナムでの事業拡大を、
                <br className="hidden md:block" />
                300社超の支援実績で確実に。
              </h3>
              <p className="text-[#5A5A5A] text-xs sm:text-sm md:text-base lg:text-lg max-w-prose leading-relaxed">
                当社は日系企業のベトナム進出・拠点運営を専門とするコンサルティングファームです。市場調査、戦略立案、法人設立、会計・税務、人材採用、PMOまでを一気通貫で支援します。現地法令と商習慣に通じた実務チームと、日本本社の意思決定に寄り添うガバナンス基準で、最短での立ち上げと持続的な成長を実現します。透明性の高いレポーティングと現場の実行力で、確かな成果にこだわります。
              </p>
            </div>

            {/* Right: link rows */}
            <div className="md:col-span-6 space-y-6 sm:space-y-7 md:space-y-8">
              <a href="/about#strengths" className="block group">
                <div className="border-b border-[#84ab52]/30 pb-3 sm:pb-4 flex items-center justify-between">
                  <span className="text-[#84ab52] text-base sm:text-lg md:text-xl lg:text-2xl">
                    Strengths
                  </span>
                  <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-[#84ab52]/40 grid place-items-center text-[#84ab52]/70 group-hover:translate-x-1 transition-transform text-sm sm:text-base">
                    →
                  </span>
                </div>
              </a>
              <a href="/about#members" className="block group">
                <div className="border-b border-[#84ab52]/30 pb-3 sm:pb-4 flex items-center justify-between">
                  <span className="text-[#84ab52] text-base sm:text-lg md:text-xl lg:text-2xl">
                    Member
                  </span>
                  <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-[#84ab52]/40 grid place-items-center text-[#84ab52]/70 group-hover:translate-x-1 transition-transform text-sm sm:text-base">
                    →
                  </span>
                </div>
              </a>
              <a href="/about#company-info" className="block group">
                <div className="border-b border-[#84ab52]/30 pb-3 sm:pb-4 flex items-center justify-between">
                  <span className="text-[#84ab52] text-base sm:text-lg md:text-xl lg:text-2xl">
                    Company Overview
                  </span>
                  <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-[#84ab52]/40 grid place-items-center text-[#84ab52]/70 group-hover:translate-x-1 transition-transform text-sm sm:text-base">
                    →
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
