type SleepDurationProps = {
  minutes: number
}

export default function SleepDuration({ minutes }: SleepDurationProps) {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  let hoursMsg: string

  if (hours > 0) {
    hoursMsg = `${hours}時間`
  } else if (hours === 0) {
    hoursMsg = ''
  } else {
    hoursMsg = ''
  }
  return (
    <p>
      睡眠時間：{hoursMsg}
      {remainingMinutes}分
    </p>
  )
}
