import AppName from '../components/AppName'
import FooterNav from '../components/FooterNav'

export default function FoundationPage() {
  return (
    <main className="foundation-page">
      <AppName />
      <h1>開発基盤の準備ができました</h1>
      <p>
        React、TypeScript、Viteで画面を実装するための最小構成です。
        次は共通UIと仮データによる画面を作ります。
      </p>
      <FooterNav />
    </main>
  )
}
