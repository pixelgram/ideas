import { firestore } from 'firebase/app'

export type id = string

export type Idea = {
  id: id
  name: string
  children: id[]
  parentId: id
  pageId: id
  likeCount: number
  createdAt: firestore.FieldValue
  updatedAt: firestore.FieldValue
}

export type Page = {
  id: id
  name: string
  createdAt: firestore.FieldValue
  updatedAt: firestore.FieldValue
}
