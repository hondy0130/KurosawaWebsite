// 問い合わせフォーム共通の型定義・バリデーション・定数

// ─── 型定義 ───

/** 問い合わせフォームのデータ型 */
export type ContactFormData = {
  name: string;
  company: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
};

/** フォーム初期値（フォームリセット用） */
export const INITIAL_FORM_DATA: ContactFormData = {
  name: '',
  company: '',
  email: '',
  phone: '',
  service: '',
  message: '',
};

// ─── 定数 ───

/** ステータスメッセージの表示時間（ms） */
export const STATUS_MESSAGE_TIMEOUT_MS = 5000;

/** メッセージ定数 */
export const CONTACT_MESSAGES = {
  SUCCESS: 'お問い合わせを受け付けました。担当者より折り返しご連絡いたします。',
  NETWORK_ERROR:
    'ネットワークエラーが発生しました。しばらくしてからもう一度お試しください。',
  GENERIC_ERROR: '送信に失敗しました。もう一度お試しください。',
} as const;

// ─── バリデーション ───

/** メールアドレスの形式チェック正規表現 */
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** メールアドレスの形式をチェックする */
export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

/** 問い合わせフォームのバリデーション結果 */
export type ContactValidationResult = {
  isValid: boolean;
  errors: string[];
};

/** 問い合わせフォームの必須項目バリデーション */
export function validateContactForm(
  data: ContactFormData
): ContactValidationResult {
  const errors: string[] = [];

  if (!data.name?.trim()) errors.push('お名前は必須です');
  if (!data.company?.trim()) errors.push('会社名は必須です');
  if (!data.email?.trim()) {
    errors.push('メールアドレスは必須です');
  } else if (!isValidEmail(data.email)) {
    errors.push('メールアドレスの形式が正しくありません');
  }
  if (!data.message?.trim()) errors.push('お問い合わせ内容は必須です');

  return { isValid: errors.length === 0, errors };
}

/** 必須フィールドがすべて入力済みか（クライアント側の簡易チェック用） */
export function isContactFormFilled(data: ContactFormData): boolean {
  return (
    data.name.trim() !== '' &&
    data.company.trim() !== '' &&
    data.email.trim() !== '' &&
    data.message.trim() !== ''
  );
}
