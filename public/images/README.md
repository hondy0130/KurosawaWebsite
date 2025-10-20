# サービス画像配置ガイド

このディレクトリにサービスセクションの背景画像を配置してください。

## 必要な画像

以下の6枚の画像を配置してください：

1. `service-entry.jpg` - ベトナム進出支援
2. `service-operations.jpg` - 現地法人運営支援
3. `service-hr.jpg` - 人材採用・研修
4. `service-manufacturing.jpg` - 製造・工場立上げ
5. `service-marketing.jpg` - マーケティング・販路開拓
6. `service-ma.jpg` - M&A・提携支援

## 推奨仕様

- **アスペクト比**: 4:3
- **推奨サイズ**: 1200×900px 以上
- **ファイル形式**: JPG または WebP
- **ファイルサイズ**: 各画像 500KB 以下を推奨

## 画像を配置したら

`app/components/Services.tsx` の72行目のコメントを解除してください：

```tsx
{
  /* <Image src={service.image} alt={service.title} fill className="object-cover" /> */
}
```

↓

```tsx
<Image src={service.image} alt={service.title} fill className="object-cover" />
```

また、ファイル冒頭に Next.js の Image コンポーネントをインポートしてください：

```tsx
import Image from 'next/image';
```

## 注意事項

- 画像がない場合は、カラフルなグラデーションが自動的に表示されます
- 画像を配置すると、グラデーションの上に画像が重なります
- 暗めのオーバーレイが自動的に適用されるため、明るめの画像を推奨します
