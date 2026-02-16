### サイト設計メモ（初期案）

このファイルは、情報設計やSEO方針、将来の連携メモを簡潔に残すためのメモです。実装にあわせて適宜更新してください。

---

### サイトリンクス希望順（上 → 下）

- 会社概要（/about）
- サービス（/services）
- 実績・お客様の声（/works）
- 料金プラン（/pricing）
- よくある質問（/faq）
- 無料相談・お問い合わせ（/contact）

備考: Googleのサイトリンクスは自動生成のため順序は指定不可。ナビ/内部リンク/構造化データ/タイトル・H1の整合で意図を伝える。

---

### 現在のサイト構造（グローバルナビ基準のルーティング）

```
TOP (/)
├─ サービス (/services)
│   ├─ 【設立・投資サポート】
│   │   ├─ ライセンス取得 (/services/license)
│   │   ├─ ビジネスパートナー紹介 (/services/partners)
│   │   └─ M&Aコンサル (/services/ma)
│   │
│   ├─ 【会計・税務アドバイザリー】
│   │   ├─ 企業評価（バリュエーション） (/services/valuation)
│   │   ├─ 財務・税務DD (/services/dd)
│   │   └─ 顧問契約 (/services/retainer)
│   │
│   └─ 【その他のサービス】
│       ├─ 翻訳サービス (/services/translation)
│       ├─ 個人情報保護対応 (/services/privacy)
│       ├─ 債権回収 (/services/debt-collection)
│       ├─ 不動産コンサル (/services/real-estate)
│       ├─ 信用調査 (/services/credit-check)
│       └─ 秘書代行 (/services/secretarial)
│
├─ 実績・お客様の声 (/works) ※未実装
│   └─ 実績詳細 (/works/[id])
│
├─ 料金プラン (/pricing) ※未実装
│
├─ よくある質問 (/faq) ※未実装（トップページにセクションあり）
│
├─ 会社概要 (/about) ✓実装済み
│   ├─ 強み・特長（Strengths）
│   ├─ メンバー紹介（Members）
│   └─ 会社情報（CompanyInfo）
│
└─ 無料相談・お問い合わせ (/contact) ※未実装（トップページにセクションあり）

【補足】
- お知らせ (/news) ※未実装（トップページにセクションあり）
  └─ 記事詳細 (/news/[id])
- 記事・コラム (/articles) ※未実装（トップページにセクションあり）
  └─ 記事詳細 (/articles/[id])
```

---

### トップページ内セクション（現在の実装順序）

1. Hero（ヒーローセクション）
2. News（お知らせ）
3. Achievement（実績）
4. Services（サービス）
5. CompanyOverview（企業概要）
6. Articles（記事・コラム）
7. Contact（お問い合わせ）
8. FAQ（よくある質問）

※各セクションにアンカーID設定を推奨（例: #news, #services, #company, #articles, #contact, #faq）

---

### 連携予定・実装メモ（後日）

- コンテンツ管理
  - microCMS 連携予定: お知らせ（/news）、記事・コラム（/articles）
- お問い合わせ
  - Resend を使用してメール送信（✅ 実装済み）
- SEO 初期方針（開発初期から反映）
  - URL/IA確定、ナビ/フッターの順序を希望順に統一
  - アンカーテキスト統一（企業概要/メンバー紹介/お問い合わせ/サービス/よくある質問）
  - 構造化データ: BreadcrumbList / Organization / WebSite+SearchAction
  - タイトル・H1・メタの一貫性、XMLサイトマップ、canonical
  - ステージングは noindex / robots 制御（本番切替時に解除）
