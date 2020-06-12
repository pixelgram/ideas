import { useEffect, useState } from 'react'
import { collection } from 'rxfire/firestore'
import { firestore } from '../firebase'
import { THEMES } from '../firebase/collections'
import { Theme } from '../types'
import { map } from 'rxjs/operators'
import day from 'dayjs'
import { DATETIME_FORMAT } from '../constants'
import timestampToDate from '../firebase/timestampToDate'

let defaultState: Theme[] = []

export default () => {
  const [themes, setThemes] = useState(defaultState)
  useEffect(() => {
    const subscription = collection(
      firestore.collection(THEMES).orderBy('createdAt', 'asc'),
    )
      .pipe(
        map((docs) =>
          docs.map((doc) => {
            return {
              id: doc.id,
              name: doc.data().name,
              createdAt: day(timestampToDate(doc.data().createdAt)).format(
                DATETIME_FORMAT,
              ),
              updatedAt: day(timestampToDate(doc.data().updatedAt)).format(
                DATETIME_FORMAT,
              ),
            } as Theme
          }),
        ),
      )
      .subscribe((themes: Theme[]) => {
        setThemes(themes)
      })
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  defaultState = themes

  return themes
}
