'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import {
  type ContactFormData,
  INITIAL_FORM_DATA,
  STATUS_MESSAGE_TIMEOUT_MS,
  isContactFormFilled,
} from '../lib/contact';

export default function Contact() {
  const t = useTranslations('Contact');
  const locale = useLocale();
  const [formData, setFormData] = useState<ContactFormData>({ ...INITIAL_FORM_DATA });

  // ハニーポット：botが入力するための見えないフィールド
  const [honeypot, setHoneypot] = useState('');
  // フォーム表示時刻（タイムスタンプチェック用）
  const formLoadTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    formLoadTimeRef.current = Date.now();
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  // 必須項目がすべて入力されているかチェック
  const isFormValid = useMemo(() => isContactFormFilled(formData), [formData]);

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
        body: JSON.stringify({
          ...formData,
          _honeypot: honeypot,
          _formLoadTime: formLoadTimeRef.current,
          locale,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus({
          type: 'success',
          message: t('success'),
        });

        // フォームをリセット
        setFormData({ ...INITIAL_FORM_DATA });

        // ステータスメッセージをクリア
        setTimeout(() => {
          setSubmitStatus({ type: null, message: '' });
        }, STATUS_MESSAGE_TIMEOUT_MS);
      } else {
        setSubmitStatus({
          type: 'error',
          message: t('genericError'),
        });
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus({
        type: 'error',
        message: t('networkError'),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownload = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isFormValid) return;

    alert(t('downloadAlert', { name: formData.name }));
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
            {t('heading')}
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
                  {t('facebookName')}
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
              {/*
                ハニーポット：CSSで人間には見えないが、botが自動入力してしまうフィールド。
                display:none は使わない（一部botが検知するため position/opacity で隠す）。
                autocomplete="off" でブラウザの自動補完を無効化。
              */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  left: '-9999px',
                  width: '1px',
                  height: '1px',
                  overflow: 'hidden',
                  opacity: 0,
                  pointerEvents: 'none',
                }}
              >
                <label htmlFor="website">{t('honeypotLabel')}</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  autoComplete="off"
                  tabIndex={-1}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2"
                  >
                    {t('name')} <span className="text-[#84ab52]">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#84ab52] focus:border-transparent text-base"
                    placeholder={t('namePlaceholder')}
                  />
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2"
                  >
                    {t('company')} <span className="text-[#84ab52]">*</span>
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#84ab52] focus:border-transparent text-base"
                    placeholder={t('companyPlaceholder')}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2"
                  >
                    {t('email')} <span className="text-[#84ab52]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#84ab52] focus:border-transparent text-base"
                    placeholder={t('emailPlaceholder')}
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2"
                  >
                    {t('phone')}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#84ab52] focus:border-transparent text-base"
                    placeholder={t('phonePlaceholder')}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="service"
                  className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2"
                >
                  {t('service')}
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#84ab52] focus:border-transparent text-base"
                >
                  <option value="">{t('serviceSelect')}</option>
                  <option value="strategy">{t('serviceOptions.strategy')}</option>
                  <option value="dx">{t('serviceOptions.dx')}</option>
                  <option value="organization">{t('serviceOptions.organization')}</option>
                  <option value="it">{t('serviceOptions.it')}</option>
                  <option value="marketing">{t('serviceOptions.marketing')}</option>
                  <option value="risk">{t('serviceOptions.risk')}</option>
                  <option value="other">{t('serviceOptions.other')}</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2"
                >
                  {t('message')} <span className="text-[#84ab52]">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#84ab52] focus:border-transparent resize-none"
                  placeholder={t('messagePlaceholder')}
                />
              </div>

              {/* 送信ステータスメッセージ */}
              {submitStatus.type && (
                <div
                  className={`p-3 sm:p-4 rounded-md text-xs sm:text-sm ${
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
                  {isSubmitting ? t('submitting') : t('submit')}
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
                  {t('download')}
                </button>
              </div>

              <p className="text-[10px] sm:text-xs text-gray-500 text-center">
                {t('privacyNote')}
              </p>

              {!isFormValid && (
                <p className="text-[10px] sm:text-xs text-[#84ab52] text-center">
                  {t('requiredNote')}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
