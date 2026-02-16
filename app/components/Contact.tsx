'use client';

import { useState, useMemo } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  // 必須項目がすべて入力されているかチェック
  const isFormValid = useMemo(() => {
    return (
      formData.name.trim() !== '' &&
      formData.company.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.message.trim() !== ''
    );
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || '送信に失敗しました');
      }

      setSubmitStatus({
        type: 'success',
        message: 'お問い合わせを受け付けました。担当者より折り返しご連絡いたします。',
      });

      // フォームをリセット
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        service: '',
        message: '',
      });

      // 3秒後にステータスメッセージをクリア
      setTimeout(() => {
        setSubmitStatus({ type: null, message: '' });
      }, 5000);
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : '送信に失敗しました。しばらくしてから再度お試しください。',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownload = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isFormValid) return;

    // TODO: AWS SES経由でinfoにダウンロード通知を送信
    console.log('Download requested:', formData);

    // ダミーPDFダウンロード（将来的に実際のPDFに置き換え）
    alert(
      `${formData.name}様\n\n企業資料のダウンロードを開始します。\n\nご入力いただいた情報を記録させていただきました。`
    );

    // 実際のダウンロード処理（将来実装）
    // const link = document.createElement('a');
    // link.href = '/documents/company-profile.pdf';
    // link.download = 'Kurosawa_Consulting_Vietnam_Company_Profile.pdf';
    // link.click();
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
    <section
      id="contact"
      className="py-16 sm:py-20 md:py-24 lg:py-32 bg-white relative overflow-hidden"
    >
      {/* 背景：Hero準拠の柔らかいグリーンブロブ */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-200px] right-[-200px] w-[800px] h-[800px] bg-gradient-to-bl from-[#A5D6A7]/30 via-[#C8E6C9]/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-250px] left-[-200px] w-[700px] h-[700px] bg-gradient-to-tr from-[#81C784]/25 via-[#A5D6A7]/15 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* セクションヘッダー */}
        <div className="text-center mb-12 sm:mb-14 md:mb-16">
          <p className="text-xs sm:text-sm md:text-base text-[#84ab52] tracking-[0.25em] sm:tracking-[0.3em] uppercase font-light mb-2 sm:mb-3">
            Contact
          </p>
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-gray-600 tracking-wide">
            お問い合わせ
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {/* 連絡先情報 */}
          <div className="md:col-span-1 space-y-6 sm:space-y-7 md:space-y-8">
            <div>
              <h3 className="text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.25em] uppercase text-[#84ab52] mb-2">
                Ho Chi Minh Office
              </h3>
              <p className="text-xs sm:text-sm text-[#5A5A5A] leading-relaxed">
                4th Floor, Phuong Long Building, 506 Nguyen Dinh Chieu Street, Ban Co Ward, Ho Chi Minh City, Vietnam
              </p>
              <a
                href="tel:+842835200043"
                className="text-xs sm:text-sm text-[#2E2E2E] hover:opacity-80 block mt-1"
              >
                028-3520-0043（Ext 30）
              </a>
            </div>

            <div>
              <h3 className="text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.25em] uppercase text-[#84ab52] mb-2">
                Hanoi Office
              </h3>
              <p className="text-xs sm:text-sm text-[#5A5A5A] leading-relaxed">
                22F, Ngoc Khanh Plaza Building, No.1 Pham Huy Thong Street, Ngoc Khanh Ward, Ba Dinh
                District, Hanoi
              </p>
              <a
                href="tel:+84902852032"
                className="text-xs sm:text-sm text-[#2E2E2E] hover:opacity-80 block mt-1"
              >
                090-2852-032
              </a>
            </div>

            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              <div>
                <h3 className="text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.25em] uppercase text-[#84ab52] mb-2">
                  Email
                </h3>
                <a
                  href="mailto:KCV_JBS_HCM@kurosawa.vn"
                  className="text-xs sm:text-sm text-[#2E2E2E] hover:opacity-80 block"
                >
                  KCV_JBS_HCM@kurosawa.vn
                </a>
              </div>
              <div>
                <h3 className="text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.25em] uppercase text-[#84ab52] mb-2">
                  Website
                </h3>
                <div className="flex flex-col gap-2">
                  <a
                    href="https://www.kurosawa.gr.jp/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm text-[#84ab52] hover:underline break-all"
                  >
                    https://www.kurosawa.gr.jp/
                  </a>
                  <a
                    href="http://kurosawa-vn.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm text-[#84ab52] hover:underline break-all"
                  >
                    http://kurosawa-vn.com/
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.25em] uppercase text-[#84ab52] mb-2">
                  Facebook
                </h3>
                <p className="text-xs sm:text-sm text-[#5A5A5A]">
                  Kurosawa Consulting Vietnam（クロサワコンサルティングベトナム）
                </p>
              </div>
            </div>
          </div>

          {/* お問い合わせフォーム */}
          <div className="md:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="bg-white/70 backdrop-blur-sm p-6 sm:p-8 md:p-10 border border-gray-200 space-y-5 sm:space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2"
                  >
                    お名前 <span className="text-[#84ab52]">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#84ab52] focus:border-transparent"
                    placeholder="山田 太郎"
                  />
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2"
                  >
                    会社名 <span className="text-[#84ab52]">*</span>
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#84ab52] focus:border-transparent"
                    placeholder="株式会社サンプル"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2"
                  >
                    メールアドレス <span className="text-[#84ab52]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#84ab52] focus:border-transparent"
                    placeholder="example@company.co.jp"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2"
                  >
                    電話番号
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#84ab52] focus:border-transparent"
                    placeholder="03-1234-5678"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="service"
                  className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2"
                >
                  ご希望のサービス
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#84ab52] focus:border-transparent"
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
                <label
                  htmlFor="message"
                  className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2"
                >
                  お問い合わせ内容 <span className="text-[#84ab52]">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#84ab52] focus:border-transparent resize-none"
                  placeholder="ご相談内容をご記入ください"
                />
              </div>

              {/* 送信ステータスメッセージ */}
              {submitStatus.type && (
                <div
                  className={`p-4 rounded-md text-xs sm:text-sm ${
                    submitStatus.type === 'success'
                      ? 'bg-green-50 text-green-800 border border-green-200'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}

              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {/* 送信ボタン */}
                <button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className={`h-10 sm:h-11 md:h-12 text-white text-xs sm:text-sm tracking-[0.2em] sm:tracking-widest transition-all duration-300 ${
                    isFormValid && !isSubmitting
                      ? 'bg-[#2E2E2E] hover:bg-black cursor-pointer'
                      : 'bg-gray-300 cursor-not-allowed opacity-60'
                  }`}
                >
                  {isSubmitting ? '送信中...' : '送信する'}
                </button>

                {/* 企業資料ダウンロードボタン */}
                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={!isFormValid}
                  className={`h-10 sm:h-11 md:h-12 text-xs sm:text-sm tracking-[0.2em] sm:tracking-widest transition-all duration-300 flex items-center justify-center gap-2 ${
                    isFormValid
                      ? 'border-2 border-[#84ab52] text-[#84ab52] hover:bg-[#84ab52] hover:text-white cursor-pointer'
                      : 'border-2 border-gray-300 text-gray-400 cursor-not-allowed opacity-60'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  企業資料ダウンロード
                </button>
              </div>

              <p className="text-[10px] sm:text-xs text-gray-500 text-center">
                ご入力いただいた情報は、お問い合わせへの対応および資料提供の目的のみに使用いたします
              </p>

              {!isFormValid && (
                <p className="text-[10px] sm:text-xs text-[#84ab52] text-center">
                  ※
                  必須項目（お名前・会社名・メールアドレス・お問い合わせ内容）をすべて入力してください
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
