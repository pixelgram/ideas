import firebase, { firestore } from './index'
import { UpdateIdeaData } from './types'
import { IDEAS } from './collections'

type args = {
  name: string
}

export default (id: string, { name }: args) => {
  const idea: UpdateIdeaData = {
    name,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  }
  return firestore
    .doc(`${IDEAS}/${id}`)
    .update(idea)
    .then(() => {
      return idea
    })
}
