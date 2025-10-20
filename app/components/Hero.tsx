export default function Hero() {
  return (
    <section className="relative pt-32 pb-40 lg:pt-48 lg:pb-56 bg-white overflow-hidden">
      {/* 背景装飾 - さわやかな緑のグラデーション（強化版） */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-gradient-to-bl from-[#A5D6A7]/40 via-[#C8E6C9]/25 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-gradient-to-tr from-[#81C784]/35 via-[#A5D6A7]/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#66BB6A]/15 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-8 lg:px-12 relative z-10">
        <div className="max-w-4xl">
          {/* メインコピー */}
          <div className="space-y-10">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-[#2E2E2E] leading-tight tracking-wider">
              Creating the future
              <br />
              through trust and <span className="font-normal text-[#2C5F2D]">proven results</span>
            </h1>
            <div className="space-y-4 text-[#5A5A5A] max-w-2xl">
              <p className="text-lg md:text-xl font-light tracking-wide leading-relaxed">
                ベトナム進出から現地法人設立、市場調査、
              </p>
              <p className="text-lg md:text-xl font-light tracking-wide leading-relaxed">
                人材採用まで。日本企業のベトナムビジネスを包括的に支援します。
              </p>
            </div>
            <div className="pt-8 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="inline-block px-12 py-4 bg-[#2C5F2D] text-white text-sm font-light tracking-widest hover:bg-[#1E4620] transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                無料相談を予約
              </a>
              <a
                href="#services"
                className="inline-block px-12 py-4 border border-[#2C5F2D] text-[#2C5F2D] text-sm font-light tracking-widest hover:bg-[#2C5F2D] hover:text-white transition-all duration-300"
              >
                サービス詳細
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 装飾的なライン */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#2C5F2D]/30 to-transparent"></div>
    </section>
  );
}
