# microCMS Webhook 設定ガイド

このドキュメントでは、microCMSからのWebhookを使用して、コンテンツ更新時に自動的にサイトを再生成する設定方法を説明します。

## 🎯 概要

Webhookを設定することで、microCMS管理画面で記事を公開・更新した際に、数秒以内にサイトに反映されます。

## 📋 前提条件

1. Next.jsアプリケーションがデプロイ済み（Vercel推奨）
2. microCMSアカウントとAPIが設定済み
3. 環境変数が正しく設定されている

## 🔧 セットアップ手順

### 1. 環境変数の設定

`.env.local` ファイルに以下を追加：

```env
MICROCMS_SERVICE_DOMAIN=kurosawa0130
MICROCMS_API_KEY=48VJIOmqxvRXOCw2dt4WDYCrkwtqAj48znsd
REVALIDATE_SECRET=your_random_secret_here_change_this
```

**重要:** `REVALIDATE_SECRET` は強力なランダム文字列に変更してください。

生成例：

```bash
# PowerShellで実行
[Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
```

### 2. Vercelに環境変数を設定

Vercelダッシュボードで：

1. プロジェクトを選択
2. Settings > Environment Variables
3. 以下の変数を追加：
   - `MICROCMS_API_KEY`
   - `MICROCMS_SERVICE_DOMAIN`
   - `REVALIDATE_SECRET`
4. すべての環境（Production, Preview, Development）にチェック

### 3. microCMS管理画面でWebhookを設定

#### 3-1. Webhook設定画面を開く

1. microCMS管理画面にログイン
2. 対象のサービス（kurosawa0130）を選択
3. 左メニューの「API設定」をクリック
4. 「Webhook」タブを選択
5. 「追加」ボタンをクリック

#### 3-2. Webhook情報を入力

**基本設定:**

- **Webhook名**: `Next.js自動更新`
- **URL**: `https://your-domain.vercel.app/api/revalidate`
  - 例: `https://kurosawa-web.vercel.app/api/revalidate`

**トリガー設定:**

- ✅ コンテンツの公開
- ✅ コンテンツの更新
- ✅ コンテンツの削除（オプション）

**対象API:**

- ✅ blogs（記事）
- ✅ news（お知らせ）

**カスタムヘッダー（オプション）:**

- 不要（bodyにsecretを含めるため）

**リクエストボディ:**

カスタムフォーマットを選択し、以下のJSONを入力：

```json
{
  "service": "{サービスID}",
  "api": "{API}",
  "id": "{コンテンツID}",
  "type": "{イベント種別}",
  "secret": "your_random_secret_here_change_this"
}
```

**注意:** `secret` の値は `.env.local` の `REVALIDATE_SECRET` と同じものを使用してください。

#### 3-3. 保存

「保存」ボタンをクリックして設定を完了します。

## 🧪 動作確認

### 1. エンドポイントの確認

ブラウザで以下のURLにアクセス：

```
https://your-domain.vercel.app/api/revalidate
```

正常に動作していれば、以下のようなJSONが返ります：

```json
{
  "status": "ok",
  "message": "microCMS Webhook Revalidation endpoint is working",
  "timestamp": "2025-11-25T..."
}
```

### 2. Webhookのテスト送信

microCMS管理画面で：

1. 作成したWebhookの「編集」をクリック
2. 「テスト送信」ボタンをクリック
3. レスポンスを確認

**成功例:**

```json
{
  "success": true,
  "revalidated": true,
  "paths": ["/", "/articles"],
  "tags": ["blogs"],
  "timestamp": "2025-11-25T..."
}
```

### 3. 実際の記事で確認

1. microCMSで記事を新規作成または更新
2. 公開ボタンをクリック
3. 数秒待ってサイトをリロード
4. 変更が反映されていることを確認

## 🔍 トラブルシューティング

### Webhookが動作しない場合

#### 1. ログの確認

Vercelダッシュボードで：

- Deployments > Functions > Logs
- `/api/revalidate` のログを確認

#### 2. よくあるエラー

**401 Unauthorized**

- 原因: `REVALIDATE_SECRET` が一致していない
- 解決: 環境変数とWebhook設定の `secret` を確認

**500 Internal Server Error**

- 原因: microCMS API エラーまたはコード不具合
- 解決: Vercelのログで詳細を確認

**404 Not Found**

- 原因: WebhookのURLが間違っている
- 解決: URL末尾の `/api/revalidate` を確認

#### 3. デバッグ方法

ローカルでテスト：

```bash
# PowerShellで実行
$body = @{
  api = "blogs"
  id = "test-id"
  type = "edit"
  secret = "your_secret_here"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/revalidate" -Method POST -Body $body -ContentType "application/json"
```

## 📊 動作の仕組み

```
microCMS管理画面
    │
    │ (1) 記事を公開/更新
    │
    ▼
microCMS Webhook
    │
    │ (2) POST /api/revalidate
    │     + シークレットトークン
    │
    ▼
Next.jsアプリ
    │
    ├─ (3) revalidateTag("blogs")     ← fetchキャッシュを即座にクリア
    └─ (4) revalidatePath("/")         ← ページキャッシュをクリア
    │
    ▼
次回アクセス時に最新データを取得
```

## ✨ メリット

1. **即時反映**: 記事公開後、数秒以内にサイトに反映
2. **パフォーマンス**: ISRによるキャッシュで高速表示
3. **API節約**: 不要なAPI呼び出しを削減
4. **SEO最適化**: 安定したレスポンスタイムでSEO向上

## 🔐 セキュリティのベストプラクティス

1. **シークレットトークンの管理**
   - 強力なランダム文字列を使用
   - Gitにコミットしない
   - 定期的に変更

2. **環境変数の保護**
   - `.env.local` を `.gitignore` に追加
   - Vercelの環境変数機能を使用

3. **HTTPSの使用**
   - Webhookは必ずHTTPS経由で送信

## 📞 サポート

問題が解決しない場合：

- microCMS公式ドキュメント: https://document.microcms.io/
- Vercel公式ドキュメント: https://vercel.com/docs
