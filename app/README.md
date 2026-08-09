# SleepLog アプリ

SleepLog v0の実装本体です。

## 使用するもの

- React：画面を部品に分けて構築する
- TypeScript：データと処理を型付きで記述する
- Vite：開発サーバーと公開用ビルドを行う
- React Router：URLと画面を対応させる
- Vitest：自動テストを実行する
- ESLint：コードの問題を検査する
- Prettier：コードの書式を統一する

## コマンド

```text
npm run dev          開発用画面を起動する
npm run build        公開用ファイルを作る
npm run preview      公開用ファイルをローカル確認する
npm run lint         コードの問題を検査する
npm run test:run     自動テストを1回実行する
npm run test         自動テストを監視モードで実行する
npm run format       コードを整形する
npm run format:check 整形済みか確認する
```

Cloudflare Pagesでは、ルートディレクトリを`app`、ビルドコマンドを`npm run build`、出力先を`dist`に設定する想定です。
