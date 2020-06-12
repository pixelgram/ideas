import { useEffect, useState } from 'react'
import { collection } from 'rxfire/firestore'
import { firestore } from '../firebase'
import { IDEAS } from '../firebase/collections'
import { Idea } from '../types'
import { map } from 'rxjs/operators'
import timestampToDate from '../firebase/timestampToDate'
import day from 'dayjs'
import { DATETIME_FORMAT } from '../constants'

let defaultState: Idea[] = []

export default (id: string) => {
  const [ideas, setIdeas] = useState(defaultState)
  useEffect(() => {
    const subscription = collection(
      firestore
        .collection(IDEAS)
        .where('themeId', '==', id)
        .orderBy('likeCount', 'desc'),
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
                DATETIME_FORMAT,
              ),
              updatedAt: day(timestampToDate(doc.data().updatedAt)).format(
                DATETIME_FORMAT,
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
