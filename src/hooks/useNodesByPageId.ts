import { useEffect, useState } from 'react'
import { collection } from 'rxfire/firestore'
import { firestore } from '../firebase'
import { NODES } from '../firebase/collections'
import { Node } from '../types'
import { map } from 'rxjs/operators'

let defaultState: Node[] = []

export default (id: string) => {
  const [nodes, setNodes] = useState(defaultState)
  useEffect(() => {
    const subscription = collection(
      firestore
        .collection(NODES)
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
            }
          }),
        ),
      )
      .subscribe((nodes: Node[]) => {
        setNodes(nodes)
      })
    return () => {
      subscription.unsubscribe()
    }
  }, [id])

  defaultState = nodes

  return nodes
}
