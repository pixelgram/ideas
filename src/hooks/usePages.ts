import { useEffect, useState } from 'react'
import { collection } from 'rxfire/firestore'
import { firestore } from '../firebase'
import { PAGES } from '../firebase/collections'
import { Page } from '../types'
import { map } from 'rxjs/operators'

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
            }
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
