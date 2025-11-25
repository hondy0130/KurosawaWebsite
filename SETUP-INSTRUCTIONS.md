# microCMS即時反映機能 セットアップ手順

microCMSとの連携を即時反映できる実装にアップグレードしました。以下の手順でセットアップしてください。

## 📝 実施した変更

### 1. **microCMSクライアントの刷新** (`app/lib/microcms.ts`)

- microcms-js-sdkを使わない、fetchベースの実装に変更
- タグベースのキャッシュ戦略を導入
- 型定義を統合

### 2. **Webhookエンドポイントの追加** (`app/api/revalidate/route.ts`)

- microCMSからのWebhookを受信
- キャッシュを即座に無効化
- セキュリティトークンで認証

### 3. **ISR設定の追加** (`app/page.tsx`)

- 30秒ごとの自動再検証を設定

## 🚀 セットアップ手順

### ステップ1: 不要なパッケージの削除

以下のコマンドを実行してください：

```bash
npm uninstall microcms-js-sdk
```

### ステップ2: 環境変数の更新

プロジェクトルートの `.env.local` ファイルに以下を追加：

```env
# microCMS API Settings
MICROCMS_SERVICE_DOMAIN=kurosawa0130
MICROCMS_API_KEY=48VJIOmqxvRXOCw2dt4WDYCrkwtqAj48znsd

# Webhook Revalidation Secret
# 以下を強力なランダム文字列に変更してください
REVALIDATE_SECRET=change_this_to_random_string_min_32_chars
```

**重要:** `REVALIDATE_SECRET` を以下の方法で生成してください：

#### PowerShellでの生成方法：

```powershell
[Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
```

#### または、オンラインツールを使用：

- https://generate-random.org/api-token-generator?count=1&length=64

### ステップ3: 開発サーバーの再起動

```bash
# 既存のサーバーを停止（Ctrl+C）してから
npm run dev
```

### ステップ4: エンドポイントの動作確認

ブラウザで以下のURLにアクセス：

```
http://localhost:3000/api/revalidate
```

以下のようなJSONが表示されればOK：

```json
{
  "status": "ok",
  "message": "microCMS Webhook Revalidation endpoint is working",
  "timestamp": "2025-11-25T..."
}
```

### ステップ5: microCMSでWebhookを設定

詳細は `MICROCMS-WEBHOOK-SETUP.md` を参照してください。

**概要:**

1. microCMS管理画面 > API設定 > Webhook
2. 「追加」ボタンをクリック
3. 以下を設定：
   - **URL**: `https://your-domain.vercel.app/api/revalidate`
   - **対象API**: blogs, news
   - **トリガー**: 公開、更新、削除
   - **リクエストボディ**:
     ```json
     {
       "service": "{サービスID}",
       "api": "{API}",
       "id": "{コンテンツID}",
       "type": "{イベント種別}",
       "secret": "your_REVALIDATE_SECRET_here"
     }
     ```

## 🧪 動作テスト

### 1. ローカルでテスト

PowerShellで実行：

```powershell
$secret = "your_REVALIDATE_SECRET_here"
$body = @{
  api = "blogs"
  id = "test-id"
  type = "edit"
  secret = $secret
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/revalidate" -Method POST -Body $body -ContentType "application/json"
```

成功すれば以下のようなレスポンスが返ります：

```json
{
  "success": true,
  "revalidated": true,
  "paths": ["/", "/articles"],
  "tags": ["blogs"],
  "timestamp": "..."
}
```

### 2. 実際の記事で確認

1. microCMSで記事を作成または更新
2. 公開ボタンをクリック
3. サイトをリロード
4. 変更が即座に反映されていることを確認

## 📦 デプロイ時の設定（Vercel）

### 環境変数の設定

Vercelダッシュボードで：

1. プロジェクトを選択
2. Settings > Environment Variables
3. 以下を追加：
   - `MICROCMS_API_KEY`
   - `MICROCMS_SERVICE_DOMAIN`
   - `REVALIDATE_SECRET`
4. すべての環境にチェックを入れて保存

### Webhookの設定

microCMS管理画面で：

- URL: `https://your-project.vercel.app/api/revalidate`
- 本番環境のURLを使用してください

## ✅ チェックリスト

- [ ] `microcms-js-sdk` をアンインストール
- [ ] `.env.local` に環境変数を追加
- [ ] `REVALIDATE_SECRET` を強力なランダム文字列に変更
- [ ] 開発サーバーを再起動
- [ ] `/api/revalidate` エンドポイントの動作確認
- [ ] PowerShellでローカルテスト
- [ ] microCMSでWebhookを設定
- [ ] 記事を更新して即時反映を確認
- [ ] Vercelに環境変数を設定（デプロイ時）

## 🎉 完了！

以上でセットアップは完了です。microCMSで記事を更新すると、数秒以内にサイトに反映されるようになります。

## 📚 詳細情報

- **Webhook設定の詳細**: `MICROCMS-WEBHOOK-SETUP.md`
- **実装の詳細**: `README-MICROCMS.md`
- **トラブルシューティング**: `MICROCMS-WEBHOOK-SETUP.md` の該当セクション

## ❓ 問題が発生した場合

1. コンソールのエラーログを確認
2. 環境変数が正しく設定されているか確認
3. microCMSのWebhookログを確認
4. Vercelのデプロイログを確認

必要に応じて、ドキュメントのトラブルシューティングセクションを参照してください。
