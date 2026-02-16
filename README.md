This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### 環境変数の設定

プロジェクトルートに `.env.local` ファイルを作成し、以下の環境変数を設定してください：

```env
# Resend API設定
# Resendのダッシュボード（https://resend.com/api-keys）からAPIキーを取得してください
# APIキーの形式: re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# 問い合わせフォームの送信先メールアドレス
# 問い合わせフォームから送信されるメールの受信先を指定します
# 複数のメールアドレスに送信する場合は、カンマ区切りで指定できます
# 例（単一）: KCV_JBS_HCM@kurosawa.vn
# 例（複数）: KCV_JBS_HCM@kurosawa.vn,info@example.com,admin@example.com
CONTACT_RECIPIENT_EMAIL=KCV_JBS_HCM@kurosawa.vn

# Resendの送信元メールアドレス（オプション）
# Resendで認証済みのドメインから送信する場合は、そのメールアドレスを指定してください
# 例: noreply@yourdomain.com
# 未設定の場合は、Resendのデフォルトアドレス（onboarding@resend.dev）が使用されます
# 注意: テスト環境では onboarding@resend.dev を使用できますが、本番環境では認証済みドメインが必要です
RESEND_FROM_EMAIL=onboarding@resend.dev
```

**重要**: 
- `.env.local` ファイルは `.gitignore` に含まれているため、Gitにコミットされません。
- 本番環境（Vercelなど）では、ホスティングサービスの環境変数設定から同様の値を設定してください。
- ResendのAPIキーは機密情報です。絶対にGitにコミットしないでください。

#### Resendの設定手順

1. **Resendアカウントの作成**
   - https://resend.com にアクセスしてアカウントを作成

2. **APIキーの取得**
   - Resendダッシュボードにログイン
   - 「API Keys」セクションに移動
   - 「Create API Key」をクリックして新しいAPIキーを作成
   - 作成されたAPIキーをコピー（`re_`で始まる文字列）
   - `.env.local`の`RESEND_API_KEY`に設定

3. **送信元メールアドレスの設定（本番環境）**
   - 本番環境では、Resendでドメインを認証する必要があります
   - Resendダッシュボードの「Domains」セクションでドメインを追加
   - DNSレコードを設定してドメインを認証
   - 認証後、`RESEND_FROM_EMAIL`に認証済みドメインのメールアドレスを設定
   - 例: `noreply@yourdomain.com` または `info@yourdomain.com`

## Quality tools

Run checks:

```bash
# Lint
npm run lint

# Type check
npm run typecheck

# Prettier check / write
npm run format
npm run format:write
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Vercelでの環境変数設定

Vercelにデプロイする際は、以下の環境変数を設定する必要があります：

#### 設定手順

1. **Vercelダッシュボードにアクセス**
   - https://vercel.com にログイン
   - プロジェクトを選択（または新規プロジェクトを作成）

2. **環境変数の設定**
   - プロジェクトの「Settings」タブを開く
   - 左サイドバーから「Environment Variables」を選択
   - 以下の環境変数を追加：

   **必須の環境変数：**
   
   | 変数名 | 説明 | 例 |
   |--------|------|-----|
   | `RESEND_API_KEY` | ResendのAPIキー | `re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` |
   | `CONTACT_RECIPIENT_EMAIL` | 問い合わせフォームの送信先メールアドレス<br>（複数指定する場合はカンマ区切り） | `KCV_JBS_HCM@kurosawa.vn`<br>または<br>`KCV_JBS_HCM@kurosawa.vn,info@example.com` |
   
   **オプションの環境変数：**
   
   | 変数名 | 説明 | 例 |
   |--------|------|-----|
   | `RESEND_FROM_EMAIL` | Resendの送信元メールアドレス（認証済みドメインを使用する場合） | `noreply@yourdomain.com` |

3. **環境ごとの設定**
   - 各環境変数を追加する際、「Environment」で適用環境を選択：
     - **Production**（本番環境）
     - **Preview**（プレビュー環境）
     - **Development**（開発環境）
   - 通常は **Production** と **Preview** の両方に設定することを推奨

4. **設定後のデプロイ**
   - 環境変数を追加・変更した後は、再デプロイが必要です
   - 「Deployments」タブから最新のデプロイメントを選択し、「Redeploy」をクリック
   - または、新しいコミットをプッシュすると自動的に再デプロイされます

#### 注意事項

- 環境変数は機密情報のため、Vercelのダッシュボードでのみ管理してください
- `.env.local` ファイルはローカル開発用です。Vercelには自動的にアップロードされません
- 環境変数を変更した後は、必ず再デプロイしてください
- 本番環境では、`RESEND_FROM_EMAIL` に認証済みドメインのメールアドレスを設定することを強く推奨します
