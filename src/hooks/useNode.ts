import { useEffect, useState } from 'react'
import { docData } from 'rxfire/firestore'
import { firestore } from '../firebase'
import { Node } from '../types'
import { NODES } from '../firebase/collections'

export default (id: string) => {
  const [node, setNode] = useState<Node>()
  useEffect(() => {
    const docPath = firestore.doc(`${NODES}/${id}`)
    const subscription = docData(docPath, 'id').subscribe((data: any) => {
      setNode({
        id: data.id,
        name: data.name,
        children: data.children,
        parentId: data.parentId,
        pageId: data.pageId,
      })
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [id])

  return node
}
