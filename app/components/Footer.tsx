import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#2E2E2E] text-white">
      <div className="max-w-7xl mx-auto px-8 lg:px-12 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* 会社情報 */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <Image
                src="/kcv-logo.webp"
                alt="Kurosawa Consulting Vietnam"
                width={150}
                height={40}
                className="h-10 w-auto"
              />
              <span className="text-base font-light tracking-wider text-white">
                Kurosawa Consulting Vietnam
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed font-light tracking-wide">
              日本企業のベトナムビジネスを支援する総合コンサルティングファーム
            </p>
          </div>

          {/* サービス */}
          <div>
            <h3 className="font-light text-white mb-6 text-sm tracking-widest uppercase">
              Services
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="/services/establishment"
                  className="text-gray-400 hover:text-white transition-colors font-light tracking-wide"
                >
                  ベトナム拠点設立
                  <span className="block text-xs text-gray-500">現地法人/駐在員事務所/支店</span>
                </a>
              </li>
              <li>
                <a
                  href="/services/ma"
                  className="text-gray-400 hover:text-white transition-colors font-light tracking-wide"
                >
                  M&Aアドバイザリー
                </a>
              </li>
              <li>
                <a
                  href="/services/accounting"
                  className="text-gray-400 hover:text-white transition-colors font-light tracking-wide"
                >
                  会計税務コンサルティング
                </a>
              </li>
              <li>
                <a
                  href="/services/legal-labor"
                  className="text-gray-400 hover:text-white transition-colors font-light tracking-wide"
                >
                  法務及び労務相談
                </a>
              </li>
              <li>
                <a
                  href="/services/license"
                  className="text-gray-400 hover:text-white transition-colors font-light tracking-wide"
                >
                  各種ライセンス申請
                </a>
              </li>
              <li>
                <a
                  href="/services/other"
                  className="text-gray-400 hover:text-white transition-colors font-light tracking-wide"
                >
                  その他業務
                </a>
              </li>
            </ul>
          </div>

          {/* 企業情報 */}
          <div>
            <h3 className="font-light text-white mb-6 text-sm tracking-widest uppercase">
              Company
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="/about#company-info"
                  className="text-gray-400 hover:text-white transition-colors font-light tracking-wide"
                >
                  会社概要
                </a>
              </li>
              <li>
                <a
                  href="/about#members"
                  className="text-gray-400 hover:text-white transition-colors font-light tracking-wide"
                >
                  メンバー紹介
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  className="text-gray-400 hover:text-white transition-colors font-light tracking-wide"
                >
                  よくある質問
                </a>
              </li>
              <li>
                <a
                  href="/news"
                  className="text-gray-400 hover:text-white transition-colors font-light tracking-wide"
                >
                  ニュース/コラム
                </a>
              </li>
              <li>
                <a
                  href="/careers"
                  className="text-gray-400 hover:text-white transition-colors font-light tracking-wide"
                >
                  採用
                </a>
              </li>
              <li>
                <a
                  href="/articles"
                  className="text-gray-400 hover:text-white transition-colors font-light tracking-wide"
                >
                  記事コラム
                </a>
              </li>
            </ul>
          </div>

          {/* お問い合わせ */}
          <div>
            <h3 className="font-light text-white mb-6 text-sm tracking-widest uppercase">
              Contact
            </h3>
            <ul className="space-y-6 text-sm">
              <li className="text-gray-400">
                <div className="font-light text-white mb-2 tracking-wide">Ho Chi Minh Office</div>
                <div className="font-light">
                  4th Floor, Phuong Long Building, 506 Nguyen Dinh Chieu Street, Ban Co Ward, Ho Chi Minh City, Vietnam
                </div>
                <a
                  href="tel:+842835200043"
                  className="hover:text-white transition-colors font-light tracking-wide block mt-1"
                >
                  028-3520-0043（Ext 30）
                </a>
              </li>
              <li className="text-gray-400">
                <div className="font-light text-white mb-2 tracking-wide">Hanoi Office</div>
                <div className="font-light">
                  22F, Ngoc Khanh Plaza Building, No.1 Pham Huy Thong Street, Ngoc Khanh Ward, Ba
                  Dinh District, Hanoi
                </div>
                <a
                  href="tel:+84902852032"
                  className="hover:text-white transition-colors font-light tracking-wide block mt-1"
                >
                  090-2852-032
                </a>
              </li>
              <li className="text-gray-400 space-y-2">
                <div className="font-light text-white tracking-wide">Email</div>
                <a
                  href="mailto:KCV_JBS_HCM@kurosawa.vn"
                  className="hover:text-white transition-colors break-all font-light tracking-wide block"
                >
                  KCV_JBS_HCM@kurosawa.vn
                </a>
              </li>
              <li className="text-gray-400 space-y-2">
                <div className="font-light text-white tracking-wide">Website</div>
                <div className="flex flex-col gap-2">
                  <a
                    href="https://www.kurosawa.gr.jp/"
                    className="hover:text-white transition-colors break-all font-light tracking-wide"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://www.kurosawa.gr.jp/
                  </a>
                  <a
                    href="http://kurosawa-vn.com/"
                    className="hover:text-white transition-colors break-all font-light tracking-wide"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    http://kurosawa-vn.com/
                  </a>
                </div>
              </li>
              <li className="text-gray-400 space-y-2">
                <div className="font-light text-white tracking-wide">Facebook</div>
                <div className="font-light">
                  Kurosawa Consulting Vietnam（クロサワコンサルティングベトナム）
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* ボーダーとコピーライト */}
        <div className="border-t border-gray-700 pt-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-xs text-gray-500 font-light tracking-wide">
              © {new Date().getFullYear()} Kurosawa Consulting Vietnam. All rights reserved.
            </div>
            <div className="flex gap-8 text-xs">
              <a
                href="#"
                className="text-gray-500 hover:text-white transition-colors font-light tracking-wide"
              >
                プライバシーポリシー
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-white transition-colors font-light tracking-wide"
              >
                サイトマップ
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
