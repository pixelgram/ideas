import { useEffect, useState } from 'react'
import { docData } from 'rxfire/firestore'
import { firestore } from '../firebase'
import { Idea } from '../types'
import { IDEAS } from '../firebase/collections'

export default (id: string) => {
  const [idea, setIdea] = useState<Idea>()
  useEffect(() => {
    const docPath = firestore.doc(`${IDEAS}/${id}`)
    const subscription = docData<Idea>(docPath, 'id').subscribe((data) => {
      setIdea({
        id: data.id,
        name: data.name,
        children: data.children,
        parentId: data.parentId,
        pageId: data.pageId,
        likeCount: data.likeCount,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      })
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [id])

  return idea
}
