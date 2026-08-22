import { useState } from 'react'
import { Link } from 'react-router-dom'
import AppName from '../components/AppName'
import FooterNav from '../components/FooterNav'
import SleepDuration from '../components/SleepDuration'
import SleepDurationList from '../components/SleepDurationList'

export default function PracticePage() {
  const recordedSleepDurations = [40, 140, 480]
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  function handleMenuButtonClick() {
    setIsMenuOpen((currentState) => !currentState)
  }

  return (
    <main className="foundation-page">
      <AppName />
      <div className="account-menu-area">
        <button
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="account-menu-popover"
          onClick={handleMenuButtonClick}
        >
          右上メニュー
        </button>

        {isMenuOpen && (
          <div className="account-menu-popover" id="account-menu-popover">
            <Link className="text-link" to="/privacy">
              プライバシーポリシー
            </Link>
            <p>ログアウト</p>
          </div>
        )}
      </div>

      <h1>練習用の画面</h1>
      <p>このページは練習用に作った画面です。</p>
      <p>SleepDurationの場合</p>
      {recordedSleepDurations.map((minutes, index) => (
        <SleepDuration key={index} minutes={minutes} />
      ))}
      <p>SleepDurationListの場合</p>
      <SleepDurationList durations={recordedSleepDurations} />
      <FooterNav />
    </main>
  )
}
