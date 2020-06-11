import firebase, { firestore } from './index'
import { CreateTheme } from './types'
import { PAGES } from './collections'
export default (name: string = '') => {
  const id = firestore.collection(PAGES).doc().id
  const theme: CreateTheme = {
    id,
    name,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  }
  return firestore
    .doc(`${PAGES}/${id}`)
    .set(theme)
    .then(() => {
      return theme
    })
}
