import firebase, { firestore } from './index'
import { UpdateThemeData } from './types'
import { THEMES } from './collections'

type args = {
  name: string
}

export default (id: string, { name }: args) => {
  const theme: UpdateThemeData = {
    name,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  }
  return firestore
    .doc(`${THEMES}/${id}`)
    .update(theme)
    .then(() => {
      return theme
    })
}
