# 問い合わせフォーム トラブルシューティングガイド

## 送信に失敗する場合の確認事項

### 1. VercelのRuntime Logsを確認する

Vercelダッシュボードでエラーの詳細を確認する方法：

#### 方法1: Runtime Logsタブから確認（推奨）

1. **Vercelダッシュボードにログイン**
   - https://vercel.com にアクセスしてログイン

2. **プロジェクトを選択**
   - ダッシュボードから `kurosawa-website` プロジェクトを選択

3. **デプロイメントを選択**
   - 上部の「Deployments」タブをクリック
   - 最新のデプロイメント（「Latest」と表示されているもの）をクリック

4. **Runtime Logsを開く**
   - デプロイメント詳細ページで「Runtime Logs」タブをクリック
   - または、ページ下部の「View and debug runtime logs & errors」セクションから「Runtime Logs」をクリック

5. **問い合わせフォームから送信**
   - 別のタブでサイトを開き、問い合わせフォームから送信を試す
   - Runtime Logsタブに戻ると、リアルタイムでログが表示されます

#### 方法2: Functionsタブから確認

1. **デプロイメント詳細ページを開く**（上記の手順1-3と同じ）

2. **Functionsタブをクリック**
   - デプロイメント詳細ページで「Functions」タブを選択

3. **APIルートを選択**
   - `/api/contact` をクリック
   - その関数のログが表示されます

#### 方法3: プロジェクト全体のログを確認

1. **プロジェクトページを開く**
   - プロジェクトのメインページに戻る

2. **「Logs」タブをクリック**
   - 左サイドバーまたは上部タブから「Logs」を選択
   - プロジェクト全体のログが時系列で表示されます

**ログで確認すべきポイント：**
- `Environment check:` - 環境変数の設定状況が表示されます
  - `hasApiKey: true/false`
  - `recipientEmailEnv: ***set***` または `NOT SET`
  - `fromEmailEnv: ...` または `using default`
- `❌` マークが付いているエラーメッセージ
- `Resend error:` - Resend APIからのエラー詳細
- `Sending email:` - メール送信時の詳細情報

**ログの見方：**
- 緑色のログ: 正常な動作
- 黄色/オレンジ色のログ: 警告
- 赤色のログ: エラー（`❌` マークが付いている）

### 2. 環境変数の確認

Vercelダッシュボードで以下を確認：

#### 必須の環境変数

1. **RESEND_API_KEY**
   - 値が設定されているか
   - `re_` で始まる正しい形式か
   - ResendダッシュボードでAPIキーが有効か

2. **CONTACT_RECIPIENT_EMAIL**
   - 値が設定されているか
   - メールアドレスの形式が正しいか（例: `email@example.com`）
   - 複数指定する場合、カンマ区切りで正しく設定されているか（例: `email1@example.com,email2@example.com`）
   - 余分な空白や改行が含まれていないか

#### オプションの環境変数

3. **RESEND_FROM_EMAIL**
   - 設定されていない場合、デフォルトの `onboarding@resend.dev` が使用されます
   - 本番環境では認証済みドメインのメールアドレスを設定することを推奨

### 3. よくあるエラーと解決方法

#### ❌ "APIキーが無効です"

**原因：**
- `RESEND_API_KEY` が設定されていない
- APIキーの値が間違っている
- APIキーが無効化されている

**解決方法：**
1. Resendダッシュボード（https://resend.com/api-keys）にアクセス
2. APIキーが有効か確認
3. 必要に応じて新しいAPIキーを作成
4. Vercelの環境変数に正しい値を設定
5. 再デプロイ

#### ❌ "送信元ドメインが認証されていません"

**原因：**
- `RESEND_FROM_EMAIL` に認証されていないドメインのメールアドレスを設定している
- Resendの「all domains」設定はAPIキーの権限設定であり、ドメイン認証とは別の概念です

**解決方法（推奨）：**

**方法1: デフォルトの送信元を使用（最も簡単）**
1. Vercelの環境変数設定で `RESEND_FROM_EMAIL` を**削除**する
2. コードが自動的に `onboarding@resend.dev` を使用します（これはResendが提供する認証済みドメイン）
3. 再デプロイ

**方法2: 独自ドメインを認証する**
1. Resendダッシュボード（https://resend.com/domains）にアクセス
2. 「Add Domain」をクリック
3. ドメインを入力（例: `yourdomain.com`）
4. 表示されたDNSレコードをDNS設定に追加：
   - SPFレコード
   - DKIMレコード
   - DMARCレコード（オプション）
5. DNS設定が反映されるまで数分〜数時間待つ
6. Resendダッシュボードで「Verify」をクリックして認証を確認
7. 認証後、`RESEND_FROM_EMAIL` に認証済みドメインのメールアドレスを設定（例: `noreply@yourdomain.com`）
8. 再デプロイ

**注意事項：**
- 送信先（`to`）のドメインは認証不要です
- 送信元（`from`）のドメインのみ認証が必要です
- 「all domains」設定はAPIキーの権限設定であり、ドメイン認証とは別です

#### ❌ "送信先メールアドレスの形式が正しくありません"

**原因：**
- `CONTACT_RECIPIENT_EMAIL` の値に不正な形式のメールアドレスが含まれている
- カンマ区切りの設定に問題がある

**解決方法：**
1. Vercelの環境変数を確認
2. メールアドレスの形式を確認（`user@domain.com`）
3. カンマ区切りの場合、各メールアドレスの前後に余分な空白がないか確認
4. 例: `email1@example.com,email2@example.com`（空白なし）

#### ❌ "送信制限に達しました"

**原因：**
- Resendの無料プランの送信制限（100通/日）に達している
- レート制限に達している

**解決方法：**
1. Resendダッシュボードで送信状況を確認
2. プランをアップグレードするか、翌日まで待つ
3. 不要なテスト送信を避ける

#### ❌ "メール送信先が設定されていません"

**原因：**
- `CONTACT_RECIPIENT_EMAIL` が設定されていない

**解決方法：**
1. Vercelの環境変数に `CONTACT_RECIPIENT_EMAIL` を追加
2. 正しいメールアドレスを設定
3. 再デプロイ

### 4. 環境変数の設定例

#### 正しい設定例

```env
RESEND_API_KEY=re_1234567890abcdefghijklmnopqrstuvwxyz
CONTACT_RECIPIENT_EMAIL=info@example.com
```

#### 複数のメールアドレスに送信する場合

```env
RESEND_API_KEY=re_1234567890abcdefghijklmnopqrstuvwxyz
CONTACT_RECIPIENT_EMAIL=info@example.com,admin@example.com
```

#### 認証済みドメインを使用する場合

```env
RESEND_API_KEY=re_1234567890abcdefghijklmnopqrstuvwxyz
CONTACT_RECIPIENT_EMAIL=info@example.com
RESEND_FROM_EMAIL=noreply@yourdomain.com
```

### 5. デバッグ手順

1. **ローカル環境でテスト**
   ```bash
   # .env.local に環境変数を設定
   npm run dev
   # ブラウザで http://localhost:3000 にアクセス
   # 問い合わせフォームから送信を試す
   ```

2. **Vercelのログを確認**
   - Deployments > Functions > Logs で `/api/contact` のログを確認
   - エラーメッセージの詳細を確認

3. **Resendダッシュボードで確認**
   - 「Emails」セクションで送信履歴を確認
   - エラーが発生している場合は詳細を確認

4. **環境変数の再設定**
   - Vercelの環境変数を一度削除して再設定
   - 余分な空白や改行が含まれていないか確認
   - 再デプロイ

### 6. テスト方法

#### APIエンドポイントの直接テスト

```bash
# PowerShellで実行
$body = @{
  name = "テスト太郎"
  company = "テスト株式会社"
  email = "test@example.com"
  message = "これはテストメッセージです"
} | ConvertTo-Json

Invoke-RestMethod -Uri "https://your-domain.vercel.app/api/contact" -Method POST -Body $body -ContentType "application/json"
```

#### ブラウザの開発者ツールで確認

1. ブラウザの開発者ツール（F12）を開く
2. 「Network」タブを開く
3. 問い合わせフォームから送信
4. `/api/contact` のリクエストを確認
5. レスポンスの内容を確認

### 7. サポート

問題が解決しない場合：

1. Vercelのログを確認してエラーの詳細を把握
2. Resendダッシュボードで送信状況を確認
3. 環境変数の設定を再確認
4. 必要に応じてResendのサポートに問い合わせ

**参考リンク：**
- Resend公式ドキュメント: https://resend.com/docs
- Vercel公式ドキュメント: https://vercel.com/docs
