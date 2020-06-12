import { firestore } from './index'
import { THEMES } from './collections'
export default (id: string = '') => {
  return firestore
    .doc(`${THEMES}/${id}`)
    .delete()
    .then(() => {
      return true
    })
}
