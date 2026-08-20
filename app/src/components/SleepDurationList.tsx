type SleepDurationListProps = {
  durations: number[]
}

export default function SleepDurationList({
  durations,
}: SleepDurationListProps) {
  const durationElements = durations.map((minutes, index) => {
    let hoursMessage = ''
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60

    if (hours > 0) {
      hoursMessage = `${hours}時間`
    }
    return (
      <p key={index}>
        睡眠時間：{hoursMessage}
        {remainingMinutes}分
      </p>
    )
  })

  return <section>{durationElements}</section>
}
