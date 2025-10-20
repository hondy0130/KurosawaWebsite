'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // フォーム送信処理（ダミー）
    console.log('Form submitted:', formData);
    alert('お問い合わせを受け付けました。担当者より折り返しご連絡いたします。');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      {/* 背景：Hero準拠の柔らかいグリーンブロブ */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-200px] right-[-200px] w-[800px] h-[800px] bg-gradient-to-bl from-[#A5D6A7]/30 via-[#C8E6C9]/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-250px] left-[-200px] w-[700px] h-[700px] bg-gradient-to-tr from-[#81C784]/25 via-[#A5D6A7]/15 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* セクションヘッダー */}
        <div className="text-center mb-16">
          <p className="text-sm text-[#C8102E] tracking-[0.3em] uppercase font-light mb-2">
            Contact
          </p>
          <h2 className="text-xl md:text-2xl font-light text-gray-600 tracking-wide">
            お問い合わせ
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* 連絡先情報 */}
          <div className="md:col-span-1 space-y-8">
            <div>
              <h3 className="text-sm tracking-[0.25em] uppercase text-[#2C5F2D] mb-2">Ho Chi Minh Office</h3>
              <p className="text-sm text-[#5A5A5A] leading-relaxed">
                Floor 1B, 116-118, Nguyen Thi Minh Khai Street, Vo Thi Sau Ward, District 3, Ho Chi Minh City
              </p>
              <a href="tel:+842835200043" className="text-sm text-[#2E2E2E] hover:opacity-80 block mt-1">
                028-3520-0043（Ext 30）
              </a>
            </div>

            <div>
              <h3 className="text-sm tracking-[0.25em] uppercase text-[#2C5F2D] mb-2">Hanoi Office</h3>
              <p className="text-sm text-[#5A5A5A] leading-relaxed">
                22F, Ngoc Khanh Plaza Building, No.1 Pham Huy Thong Street, Ngoc Khanh Ward, Ba Dinh District, Hanoi
              </p>
              <a href="tel:+84902852032" className="text-sm text-[#2E2E2E] hover:opacity-80 block mt-1">
                090-2852-032
              </a>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm tracking-[0.25em] uppercase text-[#2C5F2D] mb-2">Email</h3>
                <a
                  href="mailto:KCV_JBS_HCM@kurosawa.vn"
                  className="text-sm text-[#2E2E2E] hover:opacity-80 block"
                >
                  KCV_JBS_HCM@kurosawa.vn
                </a>
              </div>
              <div>
                <h3 className="text-sm tracking-[0.25em] uppercase text-[#2C5F2D] mb-2">Website</h3>
                <div className="flex flex-col gap-2">
                  <a href="https://www.kurosawa.gr.jp/" target="_blank" rel="noopener noreferrer" className="text-sm text-[#2C5F2D] hover:underline break-all">https://www.kurosawa.gr.jp/</a>
                  <a href="http://kurosawa-vn.com/" target="_blank" rel="noopener noreferrer" className="text-sm text-[#2C5F2D] hover:underline break-all">http://kurosawa-vn.com/</a>
                </div>
              </div>
              <div>
                <h3 className="text-sm tracking-[0.25em] uppercase text-[#2C5F2D] mb-2">Facebook</h3>
                <p className="text-sm text-[#5A5A5A]">Kurosawa Consulting Vietnam（クロサワコンサルティングベトナム）</p>
              </div>
            </div>
          </div>

          {/* お問い合わせフォーム */}
          <div className="md:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="bg-white/70 backdrop-blur-sm p-10 border border-gray-200 space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    お名前 <span className="text-[#C8102E]">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                    placeholder="山田 太郎"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    会社名 <span className="text-[#C8102E]">*</span>
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                    placeholder="株式会社サンプル"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    メールアドレス <span className="text-[#C8102E]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                    placeholder="example@company.co.jp"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    電話番号
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                    placeholder="03-1234-5678"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                  ご希望のサービス
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                >
                  <option value="">選択してください</option>
                  <option value="strategy">経営戦略コンサルティング</option>
                  <option value="dx">業務改革・DX支援</option>
                  <option value="organization">組織・人材開発</option>
                  <option value="it">IT戦略・PMO</option>
                  <option value="marketing">マーケティング戦略</option>
                  <option value="risk">リスクマネジメント</option>
                  <option value="other">その他</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  お問い合わせ内容 <span className="text-[#C8102E]">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C8102E] focus:border-transparent resize-none"
                  placeholder="ご相談内容をご記入ください"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full h-12 bg-[#2E2E2E] text-white text-sm tracking-widest hover:bg-black transition-colors"
                >
                  送信する
                </button>
              </div>

              <p className="text-xs text-gray-500 text-center">
                ご入力いただいた情報は、お問い合わせへの対応のみに使用いたします
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
