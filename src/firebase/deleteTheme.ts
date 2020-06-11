import firebase, { firestore } from './index'
import { CreateThemeData } from './types'
import { THEMES } from './collections'
export default (id: string = '') => {
  return firestore
    .doc(`${THEMES}/${id}`)
    .delete()
    .then(() => {
      return true
    })
}
