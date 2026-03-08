# ICF資格試験 学習アプリ（日本語）

このリポジトリは、ICF試験学習用データ（ACC 20問 / PCC-MCC 20問）を使う日本語アプリです。

## 今回の修正（実行可能化）

この実行環境では `HTTP_PROXY=http://proxy:8080` が設定されており、npm registry へのアクセスが `403 Forbidden` で拒否されるため、`next` を含む依存インストールが不可能でした。

そのため、**依存ゼロで動く最小ランタイム**に切り替えています。

- `npm install` は外部依存がないため成功
- `npm run lint` は `data/questions.json` の構造・件数（ACC20/PCC_MCC20）を検証して成功
- `npm run dev` は Node.js の軽量サーバーで `http://localhost:3000` を起動

## 実行

```bash
npm install
npm run lint
npm run dev
```

## 主要ファイル

- `data/questions.json`: 問題データ（日本語、免責文付き）
- `scripts/dev-server.mjs`: 依存ゼロのローカルサーバー
- `scripts/lint.mjs`: 問題データ検証
- `static/index.html`: 動作確認ページ
