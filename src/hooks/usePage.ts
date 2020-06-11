import { useEffect, useState } from 'react'
import { docData } from 'rxfire/firestore'
import { firestore } from '../firebase'
import { Theme } from '../types'
import { THEMES } from '../firebase/collections'

export default (id: string) => {
  const [theme, setTheme] = useState<Theme>()
  useEffect(() => {
    const docPath = firestore.doc(`${THEMES}/${id}`)
    const subscription = docData<Theme>(docPath, 'id').subscribe((data) => {
      setTheme({
        id: data.id,
        name: data.name,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      })
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [id])

  return theme
}
