import { id } from '../types'
import { firestore } from 'firebase'

export type CreateTheme = {
  id: id
  name: string
  createdAt: firestore.FieldValue
  updatedAt: firestore.FieldValue
}
