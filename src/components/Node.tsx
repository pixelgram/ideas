import React, {
  FC,
  ChangeEvent,
  KeyboardEvent,
  FocusEvent,
  useState,
  useRef,
} from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import useNode from '../hooks/useNode'
import firebase, { firestore } from '../firebase'
import { NODES } from '../firebase/collections'

type Props = {
  nodeId: string
}

const Node: FC<Props> = ({ nodeId }) => {
  const routerParams: { id: string } = useParams()
  const node = useNode(nodeId)
  const inputRef = useRef<HTMLInputElement>(null)

  const [isChangeName, setIsChangeName] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const onClickNode = () => {
    if (node) {
      setInputValue(node.name)
    }
    setIsChangeName(true)
    setTimeout(() => {
      if (inputRef && inputRef.current) {
        inputRef.current.focus()
      }
    }, 0)
  }

  const onChangeNodeName = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const onKeyDownInput = async (e: KeyboardEvent<HTMLInputElement>) => {
    const ENTER_KEY_CODE = 13
    if (e.keyCode === ENTER_KEY_CODE) {
      if (node) {
        const doc = await firestore.collection(NODES).add({
          name: 'テスト',
          children: [],
          parentId: node.parentId,
        })
        await firestore.doc(`${NODES}/${node.parentId}`).update({
          children: firebase.firestore.FieldValue.arrayUnion(doc.id),
        })
      }
    }
  }

  const onClickAddChild = async () => {
    if (node) {
      const doc = await firestore.collection(NODES).add({
        name: 'テスト',
        children: [],
        parentId: node.id,
        pageId: routerParams.id,
      })
      firestore.doc(`${NODES}/${node.id}`).update({
        children: firebase.firestore.FieldValue.arrayUnion(doc.id),
      })
    }
  }

  const onBlurInput = (e: FocusEvent<HTMLInputElement>) => {
    setIsChangeName(false)
    const docPath = `${NODES}/${nodeId}`
    firestore
      .doc(docPath)
      .update({
        name: inputValue,
      })
      .then((res) => {})
  }

  const onClickDeleteNode = () => {
    if (node) {
      const docPath = `${NODES}/${nodeId}`
      if (node.parentId) {
        firestore
          .doc(`${NODES}/${node.parentId}`)
          .update({
            children: firebase.firestore.FieldValue.arrayRemove(nodeId),
          })
          .then(() => {
            firestore
              .doc(docPath)
              .delete()
              .then((res) => {})
          })
      } else {
        firestore
          .doc(docPath)
          .delete()
          .then((res) => {})
      }
    }
  }

  return (
    <Inner>
      <Card onClick={onClickNode}>
        {!isChangeName && node && node.name}
        {isChangeName && (
          <Input
            type="text"
            value={inputValue}
            ref={inputRef}
            onChange={onChangeNodeName}
            onBlur={onBlurInput}
            onKeyDown={onKeyDownInput}
          />
        )}
      </Card>
      <button onClick={onClickAddChild}>追加</button>
      <button onClick={onClickDeleteNode}>削除</button>
      {node && node.children.map((id) => <Node key={id} nodeId={id} />)}
    </Inner>
  )
}

const Inner = styled.div`
  margin-left: 64px;
  margin-bottom: 8px;
`

const Input = styled.input`
  appearance: none;
  font-size: 12px;
  outline: none;
  border: none;
  line-height: 1;
  height: 100%;
`

const Card = styled.div`
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  padding: 8px;
  margin-bottom: 16px;
  display: inline-block;
  font-size: 12px;
`

export default Node
