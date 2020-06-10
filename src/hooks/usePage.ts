import { useEffect, useState } from 'react'
import { doc } from 'rxfire/firestore'
import { firestore } from '../firebase'
import { Page } from '../types'
import { PAGES } from '../firebase/collections'

export default (id: string) => {
  const [page, setPage] = useState<Page>()
  useEffect(() => {
    const docPath = firestore.doc(`${PAGES}/${id}`)
    const subscription = doc(docPath).subscribe((snapshot) => {
      const data = snapshot.data()
      setPage({
        id: snapshot.id,
        name: data ? data.name : '',
      })
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [id])

  return page
}
