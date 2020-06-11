import { id } from '../types'
import { firestore } from 'firebase'

export type CreateThemeData = {
  id: id
  name: string
  createdAt: firestore.FieldValue
  updatedAt: firestore.FieldValue
}

export type CreateIdeaData = {
  id: id
  name: string
  children: []
  parentId: id
  pageId: id
  likeCount: number
  createdAt: firestore.FieldValue
  updatedAt: firestore.FieldValue
}
