import { useEffect, useState } from 'react'
import { collection } from 'rxfire/firestore'
import { firestore } from '../firebase'
import { PAGES } from '../firebase/collections'
import { Page } from '../types'
import { map } from 'rxjs/operators'
import day from 'dayjs'
import { DATE_FORMAT } from '../constants'

let defaultState: Page[] = []

export default () => {
  const [pages, setPages] = useState(defaultState)
  useEffect(() => {
    const subscription = collection(firestore.collection(PAGES))
      .pipe(
        map((docs) =>
          docs.map((doc) => {
            return {
              id: doc.id,
              name: doc.data().name,
              createdAt: day(doc.data().createdAt.toDate()).format(DATE_FORMAT),
              updatedAt: day(doc.data().updatedAt.toDate()).format(DATE_FORMAT),
            } as Page
          }),
        ),
      )
      .subscribe((pages: Page[]) => {
        setPages(pages)
      })
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  defaultState = pages

  return pages
}
