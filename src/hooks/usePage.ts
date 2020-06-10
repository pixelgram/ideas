import { useEffect, useState } from 'react'
import { docData } from 'rxfire/firestore'
import { firestore } from '../firebase'
import { Page } from '../types'
import { PAGES } from '../firebase/collections'

export default (id: string) => {
  const [page, setPage] = useState<Page>()
  useEffect(() => {
    const docPath = firestore.doc(`${PAGES}/${id}`)
    const subscription = docData<Page>(docPath, 'id').subscribe((data) => {
      setPage({
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

  return page
}
