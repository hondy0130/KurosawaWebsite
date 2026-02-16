// 環境変数の型安全な取得ユーティリティ
//
// process.env はランタイムで評価されるため、
// 即時評価ではなく関数経由で取得する（Next.js サーバーレス対応）

/** 必須の環境変数を取得する（未設定時はエラーをスロー） */
export function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`環境変数 ${key} が設定されていません`);
  }
  return value;
}

/** オプションの環境変数を取得する（未設定時はデフォルト値を返す） */
export function getEnv(key: string, defaultValue: string): string {
  return process.env[key] || defaultValue;
}

/** 環境変数が設定されているかチェック */
export function hasEnv(key: string): boolean {
  return !!process.env[key];
}

// ─── Resend（メール送信） ───

export function getResendApiKey(): string {
  return requireEnv('RESEND_API_KEY');
}

export function getResendFromEmail(): string {
  return getEnv('RESEND_FROM_EMAIL', 'onboarding@resend.dev');
}

export function getContactRecipientEmail(): string {
  return requireEnv('CONTACT_RECIPIENT_EMAIL');
}

// ─── microCMS ───

export function getMicroCmsApiKey(): string {
  return requireEnv('MICROCMS_API_KEY');
}

export function getMicroCmsServiceDomain(): string {
  return getEnv('MICROCMS_SERVICE_DOMAIN', 'kurosawa0130');
}

// ─── Webhook ───

export function getRevalidateSecret(): string {
  return requireEnv('REVALIDATE_SECRET');
}
