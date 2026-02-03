export default function Hero() {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* 背景画像 */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('/u8124795841_Panoramic_view_of_Ho_Chi_Minh_City_skyline_at_gol_4f218260-c434-48c1-b720-6f017e6256a1_0.png')",
          }}
        >
          {/* オーバーレイ - 画像を少し暗くしてテキストを読みやすく */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>
        </div>
      </div>

      {/* コンテンツ */}
      <div className="relative z-10 w-full h-full flex items-center justify-center px-6 sm:px-8 lg:px-12 py-24 sm:py-28">
        <div className="max-w-6xl mx-auto w-full">
          <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8 xl:space-y-10">
            {/* 小見出し */}
            <div className="animate-fade-in">
              <p className="text-xs sm:text-sm lg:text-base tracking-[0.25em] lg:tracking-[0.35em] text-white/80 font-light uppercase">
                Vietnam Business Solutions
              </p>
            </div>

            {/* メインコピー */}
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light text-white leading-relaxed tracking-wide px-4 animate-fade-in-delay-1 whitespace-nowrap">
              -YOUR BRIDGE BETWEEN JAPAN AND VIETNAM-
            </h1>

            {/* サブコピー */}
            <div className="max-w-3xl mx-auto animate-fade-in-delay-2">
              <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white/85 font-light tracking-wide leading-relaxed px-4">
                ベトナム進出設立・雇用代行から、進出後の運営にかかわるご不安の解消まで
              </p>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white/85 font-light tracking-wide leading-relaxed mt-1.5 sm:mt-2 px-4">
                経理・税務・リーガル・労務を問わず、貴社のベトナムビジネスを包括的に支援
              </p>
            </div>

            {/* CTAボタン */}
            <div className="pt-3 sm:pt-4 md:pt-5 lg:pt-6 xl:pt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto animate-fade-in-delay-3">
              <a
                href="#contact"
                className="w-full sm:w-auto inline-block px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-3.5 md:py-4 border-2 border-white text-white text-xs sm:text-sm lg:text-base font-light tracking-[0.2em] hover:bg-white hover:text-[#2E2E2E] transition-all duration-300 backdrop-blur-sm"
              >
                無料相談を予約
              </a>
              <a
                href="#services"
                className="w-full sm:w-auto inline-block px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-3.5 md:py-4 border-2 border-white/70 text-white/90 text-xs sm:text-sm lg:text-base font-light tracking-[0.2em] hover:bg-white hover:text-[#2E2E2E] hover:border-white transition-all duration-300 backdrop-blur-sm"
              >
                サービス詳細
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* スクロールインジケーター */}
      <div className="absolute bottom-4 sm:bottom-5 md:bottom-6 lg:bottom-8 xl:bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-1 sm:gap-1.5 animate-bounce">
          <span className="text-white/60 text-[9px] sm:text-[10px] lg:text-xs tracking-[0.25em] font-light uppercase">
            Scroll
          </span>
          <svg
            className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white/60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
