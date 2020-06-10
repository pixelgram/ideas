import React, { FC } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import Node from '../components/Node'
import usePage from '../hooks/usePage'
import firebase, { firestore } from '../firebase'
import { NODES, PAGES } from '../firebase/collections'
import useNodesByPageId from '../hooks/useNodesByPageId'
const Id: FC = () => {
  const { id } = useParams()
  const page = usePage(id)
  const nodes = useNodesByPageId(id)

  const onClickAddNode = async () => {
    if (page) {
      const doc = await firestore.collection(NODES).add({
        name: 'テスト',
        children: [],
        parentId: '',
        pageId: page.id,
      })
      const docPath = `${PAGES}/${page.id}`
      firestore.doc(docPath).update({
        children: firebase.firestore.FieldValue.arrayUnion(doc.id),
      })
    }
  }

  return (
    <div>
      {page && (
        <div>
          <PageName>{page.name}</PageName>
          <button onClick={onClickAddNode}>追加</button>
          {nodes.map((node) => (
            <Node key={node.id} nodeId={node.id} />
          ))}
        </div>
      )}
    </div>
  )
}

const PageName = styled.div`
  display: inline-block;
  margin-bottom: 24px;
  background-color: #0070f3;
  color: #fff;
  padding: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
`

export default Id
