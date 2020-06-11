import { useEffect, useState } from 'react'
import { collection } from 'rxfire/firestore'
import { firestore } from '../firebase'
import { IDEAS } from '../firebase/collections'
import { Idea } from '../types'
import { map } from 'rxjs/operators'
import day from 'dayjs'
import { DATE_FORMAT } from '../constants'
import timestampToDate from '../firebase/timestampToDate'

let defaultState: Idea[] = []

export default (id: string) => {
  const [ideas, setIdeas] = useState(defaultState)
  useEffect(() => {
    const subscription = collection(
      firestore
        .collection(IDEAS)
        .where('themeId', '==', id)
        .where('parentId', '==', '')
        .orderBy('createdAt', 'desc'),
    )
      .pipe(
        map((docs) =>
          docs.map((doc) => {
            return {
              id: doc.id,
              name: doc.data().name,
              children: doc.data().children,
              parentId: doc.data().parentId,
              themeId: doc.data().pageId,
              likeCount: doc.data().likeCount,
              createdAt: day(timestampToDate(doc.data().createdAt)).format(
                DATE_FORMAT,
              ),
              updatedAt: day(timestampToDate(doc.data().updatedAt)).format(
                DATE_FORMAT,
              ),
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
