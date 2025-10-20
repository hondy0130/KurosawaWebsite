### サイト設計メモ（初期案）

このファイルは、情報設計やSEO方針、将来の連携メモを簡潔に残すためのメモです。実装にあわせて適宜更新してください。

---

### サイトリンクス希望順（上 → 下）
- 企業概要（/about）
- メンバー紹介（/members）
- お問い合わせ（/contact）
- サービス（/services）
- よくある質問（/faq）

備考: Googleのサイトリンクスは自動生成のため順序は指定不可。ナビ/内部リンク/構造化データ/タイトル・H1の整合で意図を伝える。

---

### 想定サイト構造（グローバルナビ基準のルーティング）
```
TOP (/)
├─ サービス (/services)
│   ├─ ベトナム進出 (/services/entry)
│   ├─ M&A (/services/ma)
│   ├─ ベトナム会計サポート (/services/accounting)
│   ├─ その他サービスA (/services/other-a)
│   └─ その他サービスB (/services/other-b)
│
├─ 実績・お客様の声 (/works)
│   └─ 実績詳細 (/works/[id])
│
├─ 料金プラン (/pricing)
│
├─ よくある質問 (/faq)
│
├─ 会社概要 (/about)
│
├─ お知らせ (/news)
│   └─ 記事詳細 (/news/[id])
│
├─ 記事・コラム (/articles)
│   └─ 記事詳細 (/articles/[id])
│
└─ お問い合わせ (/contact)
```

---

### トップページ内セクション（アンカー想定）
- Hero
- Achievement
- Services（#services）
- Company Overview（企業概要）※現状セクションID: `#why-us`
  - Company Overview（#outline）
  - Strengths（#strengths）
  - Member（#members）
- News（お知らせ）（#news）
- Articles（記事・コラム）（#articles）
- Contact / FAQ ダイジェスト（必要に応じて）

---

### 連携予定・実装メモ（後日）
- コンテンツ管理
  - microCMS 連携予定: お知らせ（/news）、記事・コラム（/articles）
- お問い合わせ
  - AWS SES を使用してメール送信（本番/ステージングでクレデンシャル分離）
- SEO 初期方針（開発初期から反映）
  - URL/IA確定、ナビ/フッターの順序を希望順に統一
  - アンカーテキスト統一（企業概要/メンバー紹介/お問い合わせ/サービス/よくある質問）
  - 構造化データ: BreadcrumbList / Organization / WebSite+SearchAction
  - タイトル・H1・メタの一貫性、XMLサイトマップ、canonical
  - ステージングは noindex / robots 制御（本番切替時に解除）


