import Image from 'next/image';

export default function CompanyInfo() {
  const history = [
    '1969年: 創業者(現・会長) 黒澤功記が司法書士登録',
    '1972年: 東京都中野区中野に司法書士事務所を設立',
    '2009年: 業容拡大に伴い、司法書士部門を法人化し黒澤合同事務所を設立、同時に横浜事務所を開設',
    '2015年: 業容拡大に伴い、土地家屋調査士部門を法人化',
    '2016年: 相続・成年後見業務に特化した相続サポート室を開設',
    '2016年: KCVをホーチミンに設立',
    '2025年: 「高品質かつリーズナブル」が評判となり、顧問社数75社超、取引実績280社超まで成長',
  ];

  return (
    <section
      id="company-info"
      className="py-20 bg-gradient-to-b from-white via-[#f3f8f1] to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* サイドのビルディング画像（デスクトップのみ表示） */}
        <div className="pointer-events-none hidden lg:block absolute top-16 right-10">
          <div className="w-64 xl:w-72 h-80 rounded-3xl overflow-hidden shadow-[0_24px_48px_rgba(0,0,0,0.22)] border border-white/70 flex items-center justify-center">
            <Image
              src="/images/Building.jpg"
              alt="Office building in Ho Chi Minh City"
              width={360}
              height={260}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* セクションヘッダー */}
        <div className="text-center mb-12 sm:mb-14">
          <p className="text-xs sm:text-sm md:text-base text-[#84ab52] tracking-[0.25em] sm:tracking-[0.3em] uppercase font-light mb-2 sm:mb-3">
            Company Overview
          </p>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-gray-700 tracking-wide">
            会社概要
          </h2>
        </div>

        {/* 基本情報 */}
        <div className="divide-y divide-gray-100 rounded-3xl overflow-hidden bg-white/95 border border-[#dde7d7] shadow-lg">
          <div className="p-6 md:p-8 grid md:grid-cols-12 gap-4 md:gap-8">
            <div className="md:col-span-3 text-xs tracking-[0.2em] text-gray-500 uppercase">
              日本親会社
            </div>
            <div className="md:col-span-9 text-[#2E2E2E]">
              <div className="text-base">黒澤合同事務所グループ</div>
              <div className="text-sm text-[#6B6B6B] mt-1">
                （東京都で業歴55年・司法書士を中心とした士業集団）
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 grid md:grid-cols-12 gap-4 md:gap-8">
            <div className="md:col-span-3 text-xs tracking-[0.2em] text-gray-500 uppercase">
              現地法人
            </div>
            <div className="md:col-span-9 text-[#2E2E2E]">
              <div className="text-base">Kurosawa Consulting Vietnam (KCV)</div>
              <div className="text-sm text-[#6B6B6B] mt-1">
                （クロサワ・コンサルティング・ベトナム）
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 grid md:grid-cols-12 gap-4 md:gap-8">
            <div className="md:col-span-3 text-xs tracking-[0.2em] text-gray-500 uppercase">
              従業員数
            </div>
            <div className="md:col-span-9 text-[#2E2E2E]">
              <div className="text-base">95名</div>
              <div className="text-sm text-[#6B6B6B] mt-1">（日本：55名、ベトナム：40名）</div>
            </div>
          </div>

          <div className="p-6 md:p-8 grid md:grid-cols-12 gap-4 md:gap-8">
            <div className="md:col-span-3 text-xs tracking-[0.2em] text-gray-500 uppercase">
              Webサイト
            </div>
            <div className="md:col-span-9">
              <div className="flex flex-col gap-2">
                <a
                  href="https://www.kurosawa.gr.jp/"
                  className="text-[#84ab52] hover:underline break-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://www.kurosawa.gr.jp/
                </a>
                <a
                  href="http://kurosawa-vn.com/"
                  className="text-[#84ab52] hover:underline break-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  http://kurosawa-vn.com/
                </a>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 grid md:grid-cols-12 gap-4 md:gap-8">
            <div className="md:col-span-3 text-xs tracking-[0.2em] text-gray-500 uppercase">
              沿革
            </div>
            <div className="md:col-span-9">
              <ul className="space-y-2">
                {history.map((line, i) => (
                  <li key={i} className="text-sm text-[#2E2E2E]">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
