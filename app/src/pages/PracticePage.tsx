import AppName from '../components/AppName'
import FooterNav from '../components/FooterNav'
import SleepDuration from '../components/SleepDuration'
import SleepDurationList from '../components/SleepDurationList'

export default function PracticePage() {
  const recordedSleepDurations = [40, 140, 480]

  return (
    <main className="foundation-page">
      <AppName />
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
