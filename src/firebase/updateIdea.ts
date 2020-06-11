import firebase, { firestore } from './index'
import { UpdateIdeaData } from './types'
import { IDEAS } from './collections'

type args = {
  name?: string
  likeCount?: firebase.firestore.FieldValue
}

export default (id: string, { name, likeCount }: args) => {
  const idea: UpdateIdeaData = {
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  }

  if (name) idea.name = name
  if (likeCount) idea.likeCount = likeCount

  return firestore
    .doc(`${IDEAS}/${id}`)
    .update(idea)
    .then(() => {
      return idea
    })
}
