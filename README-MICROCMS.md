# microCMS 即時反映実装ガイド

このプロジェクトでは、microCMSとの連携で**即時反映**を実現しています。

## 🚀 実装の特徴

### 1. **即時反映の仕組み**

```
microCMS管理画面で記事を公開
    ↓ (自動・数秒以内)
Webhookが発火
    ↓
Next.jsのキャッシュを無効化
    ↓
次回アクセス時に最新データを表示
```

### 2. **ハイブリッド戦略**

- **ISR（Incremental Static Regeneration）**: 通常時は30秒キャッシュ
- **Webhook**: コンテンツ更新時に即座にキャッシュを無効化
- **結果**: 高速表示 + 即時反映を両立

## 📁 主要ファイル

### 1. microCMSクライアント (`app/lib/microcms.ts`)

- fetchベースの実装（microcms-js-sdk不使用）
- タグベースのキャッシュ戦略
- `next.tags` でキャッシュに識別子を付与

### 2. Webhookエンドポイント (`app/api/revalidate/route.ts`)

- microCMSからのWebhookを受信
- `revalidateTag()` でキャッシュを即座に無効化
- セキュリティトークンで認証

### 3. ページ設定 (`app/page.tsx`)

```typescript
// ISR設定: 30秒ごとに再検証
export const revalidate = 30;
```

## 🔧 セットアップ

### 1. 環境変数の設定

プロジェクトルートに `.env.local` ファイルを作成：

```env
MICROCMS_SERVICE_DOMAIN=kurosawa0130
MICROCMS_API_KEY=48VJIOmqxvRXOCw2dt4WDYCrkwtqAj48znsd
REVALIDATE_SECRET=your_random_secret_here
```

**重要:** `REVALIDATE_SECRET` を強力なランダム文字列に変更してください。

### 2. パッケージのインストール

```bash
npm install
```

**注意:** `microcms-js-sdk` は不要になりました（削除可能）

### 3. 開発サーバーの起動

```bash
npm run dev
```

### 4. Webhookの設定

詳細は `MICROCMS-WEBHOOK-SETUP.md` を参照してください。

## 📊 API仕様

### ブログ記事取得

```typescript
import { fetchMicroCmsBlogs } from '@/app/lib/microcms';

const data = await fetchMicroCmsBlogs({
  limit: 5,
  orderBy: 'publishedAt',
});
```

### ニュース取得

```typescript
import { fetchMicroCmsNews } from '@/app/lib/microcms';

const news = await fetchMicroCmsNews({
  limit: 5,
});
```

### 個別記事取得

```typescript
import { fetchMicroCmsBlogById } from '@/app/lib/microcms';

const blog = await fetchMicroCmsBlogById('article-id');
```

## 🔍 動作確認

### 1. エンドポイントの確認

```
http://localhost:3000/api/revalidate
```

### 2. ローカルでWebhookをテスト

PowerShellで実行：

```powershell
$body = @{
  api = "blogs"
  id = "test-id"
  type = "edit"
  secret = "your_secret_here"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/revalidate" -Method POST -Body $body -ContentType "application/json"
```

### 3. 記事の更新確認

1. microCMSで記事を作成・更新
2. サイトをリロード
3. 変更が反映されていることを確認

## 🎯 キャッシュ戦略の詳細

### fetchキャッシュ（タグベース）

```typescript
fetch(url, {
  next: {
    tags: ['blogs'], // タグを付与
  },
});
```

Webhook受信時に `revalidateTag("blogs")` でクリア。

### ページキャッシュ（ISR）

```typescript
export const revalidate = 30; // 30秒ごとに再検証
```

Webhook受信時に `revalidatePath("/")` でクリア。

## ✨ メリット

1. **即時反映**: 記事公開後、数秒以内にサイトに反映
2. **高速表示**: ISRキャッシュで初回アクセスも高速
3. **API節約**: キャッシュにより不要なAPI呼び出しを削減
4. **SEO最適化**: 安定したレスポンスタイム
5. **シンプル**: 外部SDKを使わず、Next.jsの標準機能のみ

## 🐛 トラブルシューティング

### ブログが表示されない

1. `.env.local` が正しく設定されているか確認
2. microCMS APIキーが有効か確認
3. コンソールのエラーログを確認

### Webhookが動作しない

1. `REVALIDATE_SECRET` が一致しているか確認
2. WebhookのURLが正しいか確認
3. microCMS管理画面の「テスト送信」で確認

### キャッシュが効かない

1. `cache: "no-store"` の設定を確認
2. `next.tags` が正しく設定されているか確認

## 📚 参考ドキュメント

- [MICROCMS-WEBHOOK-SETUP.md](./MICROCMS-WEBHOOK-SETUP.md) - Webhook設定の完全ガイド
- [Next.js Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [microCMS公式ドキュメント](https://document.microcms.io/)

## 🔄 他のプロジェクトへの適用

この実装はそのまま他のプロジェクトでも使用できます：

1. `app/lib/microcms.ts` をコピー
2. `app/api/revalidate/route.ts` をコピー
3. 環境変数を設定
4. ページに `export const revalidate = 30;` を追加
5. microCMSでWebhookを設定

以上で完了です！
