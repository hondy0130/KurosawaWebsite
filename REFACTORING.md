# リファクタリング推奨事項

## 🔴 高優先度（すぐに対応すべき）

### 1. **Contact.tsxのTODOコメントの更新**
**場所**: `app/components/Contact.tsx:90`

**問題**:
- `handleDownload`関数に「AWS SES経由でinfoにダウンロード通知を送信」というTODOコメントが残っている
- 現在はResendを使用しているため、コメントが古い

**対応**:
```typescript
// TODO: Resend経由でダウンロード通知を送信
// または、TODOコメントを削除して実装を完了する
```

### 2. **型定義の重複解消**
**場所**: `app/api/contact/route.ts` と `app/components/Contact.tsx`

**問題**:
- `ContactFormData`型がAPIルートとコンポーネントで重複定義されている
- 型の変更時に両方を更新する必要があり、保守性が低い

**対応**:
- `app/lib/types.ts` または `app/types/contact.ts` を作成して共通型を定義
- 両方のファイルでインポートして使用

```typescript
// app/lib/types/contact.ts
export type ContactFormData = {
  name: string;
  company: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
};
```

### 3. **バリデーションロジックの共通化**
**場所**: `app/api/contact/route.ts` と `app/components/Contact.tsx`

**問題**:
- メールアドレスのバリデーション正規表現が重複している
- バリデーションルールを変更する際に複数箇所を修正する必要がある

**対応**:
- `app/lib/validation.ts` を作成してバリデーション関数を共通化

```typescript
// app/lib/validation.ts
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

export function validateContactForm(data: ContactFormData): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (!data.name?.trim()) errors.push('お名前は必須です');
  if (!data.company?.trim()) errors.push('会社名は必須です');
  if (!data.email?.trim()) errors.push('メールアドレスは必須です');
  if (!isValidEmail(data.email)) errors.push('メールアドレスの形式が正しくありません');
  if (!data.message?.trim()) errors.push('お問い合わせ内容は必須です');
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}
```

## 🟡 中優先度（改善推奨）

### 4. **環境変数の型安全性向上** ✅ 完了
**場所**: `app/lib/env.ts`（新規作成）

**対応内容**:
- `requireEnv` / `getEnv` / `hasEnv` ユーティリティ関数を作成
- Resend / microCMS / Webhook 用の個別ヘルパー関数を提供
- `app/api/contact/route.ts`、`app/lib/microcms.ts`、`app/api/revalidate/route.ts` で使用

### 5. **定数の抽出** ✅ 完了（高優先度で対応済み）
**場所**: `app/lib/contact.ts`

**対応内容**:
- `CONTACT_MESSAGES`、`INITIAL_FORM_DATA`、`STATUS_MESSAGE_TIMEOUT_MS` を共通化済み

### 6. **エラーハンドリングの統一** ✅ 完了
**場所**: `app/lib/api-response.ts`（新規作成）

**対応内容**:
- `successResponse` / `errorResponse` / `extractErrorMessage` / `healthResponse` を作成
- 全APIルート（`/api/contact`、`/api/revalidate`）で統一された形式のレスポンスを返す
- 開発環境のみ詳細エラーを含む仕組み

## 🟢 低優先度（将来的な改善）

### 7. **メール送信ロジックの分離**
**場所**: `app/api/contact/route.ts`

**問題**:
- メール送信ロジックがAPIルートに直接書かれている
- テストが困難

**対応**:
- `app/lib/email.ts` を作成してメール送信ロジックを分離

```typescript
// app/lib/email.ts
import { Resend } from 'resend';
import { env } from './env';
import type { ContactFormData } from './types/contact';

const resend = new Resend(env.resend.apiKey);

export async function sendContactEmail(data: ContactFormData): Promise<{ id: string }> {
  const emailBody = formatContactEmailBody(data);
  
  const { data: result, error } = await resend.emails.send({
    from: env.resend.fromEmail,
    to: parseRecipientEmails(env.resend.recipientEmail),
    replyTo: data.email,
    subject: `【お問い合わせ】${data.company}様より`,
    text: emailBody,
  });

  if (error) {
    throw new Error(`メール送信に失敗しました: ${error.message}`);
  }

  return { id: result!.id };
}
```

### 8. **ログレベルの統一**
**場所**: 複数ファイル

**問題**:
- `console.log`、`console.error`が混在している
- ログレベルの管理が統一されていない

**対応**:
- ロガーユーティリティを作成（本番環境では構造化ログを使用）

### 9. **テストコードの追加**
**場所**: 全体的に

**問題**:
- テストコードが存在しない
- リファクタリング時の安全性が低い

**対応**:
- Jest/Vitestのセットアップ
- ユニットテストと統合テストの追加

## 📋 実装優先順位

1. ✅ **型定義の重複解消** - 完了（`app/lib/contact.ts` に統合）
2. ✅ **バリデーションロジックの共通化** - 完了（`validateContactForm`, `isValidEmail` 等を共通化）
3. ✅ **Contact.tsxのTODOコメント更新** - 完了（AWS SES → Resend に更新）
4. ✅ **定数の抽出（一部）** - 完了（`CONTACT_MESSAGES`, `INITIAL_FORM_DATA` 等を共通化）
5. ✅ **環境変数の型安全性向上** - 完了（`app/lib/env.ts` に統合）
6. ✅ **エラーハンドリングの統一** - 完了（`app/lib/api-response.ts` に統合）

## 🔍 コードレビューポイント

- [x] 型定義の重複がないか → `app/lib/contact.ts` に統合済み
- [x] バリデーションロジックが重複していないか → `app/lib/contact.ts` に統合済み
- [x] エラーハンドリングが統一されているか → `app/lib/api-response.ts` で統一済み
- [x] 環境変数の取得が型安全か → `app/lib/env.ts` で型安全に取得済み
- [x] 定数が適切に抽出されているか → `app/lib/contact.ts` に抽出済み
- [x] TODOコメントが残っていないか → AWS SES → Resend に更新済み
