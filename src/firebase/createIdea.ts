import firebase, { firestore } from './index'
import { CreateIdeaData } from './types'
import { IDEAS } from './collections'

type args = {
  name: string
  parentId: string
  themeId: string
}

export default ({ name, parentId, themeId }: args) => {
  const id = firestore.collection(IDEAS).doc().id
  const idea: CreateIdeaData = {
    id,
    name,
    children: [],
    parentId: parentId,
    themeId: themeId,
    likeCount: 0,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  }
  return firestore
    .doc(`${IDEAS}/${id}`)
    .set(idea)
    .then(() => {
      return idea
    })
}
