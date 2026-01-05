'use client';

export default function MAHero() {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      {/* 背景グラデーション */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]"></div>
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-[#84ab52]/20 via-transparent to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#84ab52]/10 to-transparent rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center max-w-4xl mx-auto">
          <p className="text-[#84ab52] text-sm tracking-[0.3em] uppercase font-light mb-4">
            M&A Advisory
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight mb-6">
            <span className="block">クロスボーダーM&Aを</span>
            <span className="block">戦略立案からPMIまで</span>
            <span className="block text-[#84ab52]">一気通貫で</span>
          </h1>
          <p className="text-base md:text-lg text-white/70 font-light leading-relaxed mb-12 max-w-2xl mx-auto">
            日本本社とベトナム現地の双方に通じたチームが、
            M&Aの検討段階から買収後の統合まで、すべてのフェーズをサポートします。
          </p>

          {/* 入り口ボタン */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <a
              href="#pre-acquisition"
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-[#1a1a2e] text-sm md:text-base font-medium tracking-wide transition-all duration-300 hover:bg-[#84ab52] hover:text-white overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                買収前サポート
              </span>
            </a>
            <a
              href="#pmi"
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-[#84ab52] text-white text-sm md:text-base font-medium tracking-wide transition-all duration-300 hover:bg-[#6d9143] overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                買収後（PMI）サポート
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* 下向き矢印アニメーション */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white/50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
