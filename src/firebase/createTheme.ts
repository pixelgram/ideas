import firebase, { firestore } from './index'
import { CreateThemeData } from './types'
import { THEMES } from './collections'
export default (name: string = '') => {
  const id = firestore.collection(THEMES).doc().id
  const theme: CreateThemeData = {
    id,
    name,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  }
  return firestore
    .doc(`${THEMES}/${id}`)
    .set(theme)
    .then(() => {
      return theme
    })
}
