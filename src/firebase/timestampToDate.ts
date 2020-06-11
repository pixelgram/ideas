import { firestore } from 'firebase/app'

function timestampToDate(value: any): any {
  if (value == null) {
    return value
  } else if (value.constructor === firestore.Timestamp) {
    return value.toDate()
  } else if (Array.isArray(value)) {
    return value.map(timestampToDate)
  } else if (value.constructor === Object) {
    const converted: any = {}
    for (const key in value) {
      converted[key] = timestampToDate(value[key])
    }
    return converted
  } else {
    return value
  }
}

export default timestampToDate
