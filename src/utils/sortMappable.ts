import { SortMappableType } from '../types'
import { formattedDate2, formattedTime } from './dateAndTimeUtils'

export function sortMappable(mappable: SortMappableType[], flipped: boolean) {
  const sortedMappable = mappable.sort((a, b) => {
    const dateA = new Date(formattedDate2(String(Object.values(a[1])[4])))
    const dateB = new Date(formattedDate2(String(Object.values(b[1])[4])))
    if (dateA < dateB) {
      return flipped ? 1 : -1
    }
    if (dateA > dateB) {
      return flipped ? -1 : 1
    }
    const timeA = formattedTime(String(Object.values(a[1])[4]))
    const timeB = formattedTime(String(Object.values(b[1])[4]))
    if (timeA < timeB) {
      return flipped ? 1 : -1
    }
    if (timeA > timeB) {
      return flipped ? -1 : 1
    }
    return 0
  })
  return sortedMappable
}
