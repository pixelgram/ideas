import { id } from '../types'
import { firestore } from 'firebase'

export type CreateThemeData = {
  id: id
  name: string
  createdAt: firestore.FieldValue
  updatedAt: firestore.FieldValue
}

export type UpdateThemeData = {
  name: string
  updatedAt: firestore.FieldValue
}

export type CreateIdeaData = {
  id: id
  name: string
  children: []
  parentId: id
  themeId: id
  likeCount: number
  createdAt: firestore.FieldValue
  updatedAt: firestore.FieldValue
}

export type UpdateIdeaData = {
  name: string
  updatedAt: firestore.FieldValue
}
