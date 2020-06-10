import { useEffect, useState } from 'react'
import { collection } from 'rxfire/firestore'
import { firestore } from '../firebase'
import { IDEAS } from '../firebase/collections'
import { Idea } from '../types'
import { map } from 'rxjs/operators'

let defaultState: Idea[] = []

export default (id: string) => {
  const [ideas, setIdeas] = useState(defaultState)
  useEffect(() => {
    const subscription = collection(
      firestore
        .collection(IDEAS)
        .where('pageId', '==', id)
        .where('parentId', '==', ''),
    )
      .pipe(
        map((docs) =>
          docs.map((doc) => {
            return {
              id: doc.id,
              name: doc.data().name,
              children: doc.data().children,
              parentId: doc.data().parentId,
              pageId: doc.data().pageId,
              likeCount: doc.data().likeCount,
              createdAt: doc.data().createdAt,
              updatedAt: doc.data().updatedAt,
            } as Idea
          }),
        ),
      )
      .subscribe((ideas: Idea[]) => {
        setIdeas(ideas)
      })
    return () => {
      subscription.unsubscribe()
    }
  }, [id])

  defaultState = ideas

  return ideas
}
