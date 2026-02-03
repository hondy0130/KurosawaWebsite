'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function MAHero() {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl bg-[#84ab52]/10"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-3xl bg-[#84ab52]/5"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl bg-[#84ab52]/5"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* パンくずリスト */}
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-gray-400">
            <li>
              <Link href="/" className="hover:text-[#84ab52] transition-colors">
                TOP
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/services" className="hover:text-[#84ab52] transition-colors">
                サービス
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-600">M&Aアドバイザリー</li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* テキストコンテンツ */}
          <div>
            <p className="text-[#84ab52] text-sm tracking-[0.3em] uppercase font-light mb-4">
              M&A Advisory
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-800 leading-tight mb-6">
              <span className="block">M&Aアドバイザリー</span>
            </h1>
            <p className="text-base md:text-lg text-gray-600 font-light leading-relaxed">
              ターゲット探索・DD・バリュエーション・契約実務・PMI設計まで。
              日本本社とベトナム現地の双方に通じたチームで、意思決定と推進を高速化します。
            </p>
          </div>

          {/* イメージエリア */}
          <div className="relative h-[300px] lg:h-[400px] rounded-2xl overflow-hidden bg-gradient-to-br from-[#84ab52]/20 to-[#84ab52]/5">
            <Image
              src="/images/service-ma.svg"
              alt="M&Aアドバイザリー"
              fill
              className="object-contain md:object-cover opacity-90"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
