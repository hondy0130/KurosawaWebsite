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
    <section id="company-info" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* セクションヘッダー */}
        <div className="text-center mb-14">
          <p className="text-sm text-[#C8102E] tracking-[0.3em] uppercase font-light mb-2">Company Information</p>
          <h2 className="text-xl md:text-2xl font-light text-gray-600 tracking-wide">企業情報</h2>
        </div>

        {/* 基本情報 */}
        <div className="divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden bg-white">
          <div className="p-6 md:p-8 grid md:grid-cols-12 gap-4 md:gap-8">
            <div className="md:col-span-3 text-xs tracking-[0.2em] text-gray-500 uppercase">日本親会社</div>
            <div className="md:col-span-9 text-[#2E2E2E]">
              <div className="text-base">黒澤合同事務所グループ</div>
              <div className="text-sm text-[#6B6B6B] mt-1">（東京都で業歴55年・司法書士を中心とした士業集団）</div>
            </div>
          </div>

          <div className="p-6 md:p-8 grid md:grid-cols-12 gap-4 md:gap-8">
            <div className="md:col-span-3 text-xs tracking-[0.2em] text-gray-500 uppercase">現地法人</div>
            <div className="md:col-span-9 text-[#2E2E2E]">
              <div className="text-base">Kurosawa Consulting Vietnam (KCV)</div>
              <div className="text-sm text-[#6B6B6B] mt-1">（クロサワ・コンサルティング・ベトナム）</div>
            </div>
          </div>

          <div className="p-6 md:p-8 grid md:grid-cols-12 gap-4 md:gap-8">
            <div className="md:col-span-3 text-xs tracking-[0.2em] text-gray-500 uppercase">従業員数</div>
            <div className="md:col-span-9 text-[#2E2E2E]">
              <div className="text-base">95名</div>
              <div className="text-sm text-[#6B6B6B] mt-1">（日本：55名、ベトナム：40名）</div>
            </div>
          </div>

          <div className="p-6 md:p-8 grid md:grid-cols-12 gap-4 md:gap-8">
            <div className="md:col-span-3 text-xs tracking-[0.2em] text-gray-500 uppercase">Webサイト</div>
            <div className="md:col-span-9">
              <div className="flex flex-col gap-2">
                <a href="https://www.kurosawa.gr.jp/" className="text-[#2C5F2D] hover:underline break-all" target="_blank" rel="noopener noreferrer">
                  https://www.kurosawa.gr.jp/
                </a>
                <a href="http://kurosawa-vn.com/" className="text-[#2C5F2D] hover:underline break-all" target="_blank" rel="noopener noreferrer">
                  http://kurosawa-vn.com/
                </a>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 grid md:grid-cols-12 gap-4 md:gap-8">
            <div className="md:col-span-3 text-xs tracking-[0.2em] text-gray-500 uppercase">沿革</div>
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


