import { Link, Navigate, Route, Routes } from 'react-router-dom'

function FoundationPage() {
  return (
    <main className="foundation-page">
      <p className="eyebrow">SleepLog v0</p>
      <h1>開発基盤の準備ができました</h1>
      <p>
        React、TypeScript、Viteで画面を実装するための最小構成です。
        次は共通UIと仮データによる画面を作ります。
      </p>
      <Link className="text-link" to="/privacy">
        仮のプライバシーポリシー画面を開く
      </Link>
    </main>
  )
}

function PrivacyPlaceholderPage() {
  return (
    <main className="foundation-page">
      <p className="eyebrow">SleepLog</p>
      <h1>プライバシーポリシー</h1>
      <p>このページはReact Routerによる画面遷移の確認用です。</p>
      <Link className="text-link" to="/">
        開発基盤の確認画面へ戻る
      </Link>
    </main>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<FoundationPage />} />
      <Route path="/privacy" element={<PrivacyPlaceholderPage />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  )
}
