export function formattedDate(dateTimeString: string) {
  const dateTimeParts = dateTimeString.split('-')

  const day = dateTimeParts[0]
  const month = dateTimeParts[1]
  const year = dateTimeParts[2]

  return `${day}-${month}-${year}`
}

export function formattedDate2(dateTimeString: string) {
  const dateTimeParts = dateTimeString.split('-')

  const day = dateTimeParts[0]
  const month = dateTimeParts[1]
  const year = dateTimeParts[2]

  return `${month}-${day}-${year}`
}

export function formattedTime(dateTimeString: string) {
  const dateTimeParts = dateTimeString.split('-')

  const hours = dateTimeParts[3]
  const minutes = dateTimeParts[4]
  const seconds = dateTimeParts[5]

  return `${hours}-${minutes}-${seconds}`
}
