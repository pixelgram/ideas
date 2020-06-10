import React, { FC, ChangeEvent, FocusEvent, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import useIdea from '../hooks/useIdea'
import firebase, { firestore } from '../firebase'
import { IDEAS } from '../firebase/collections'

type Props = {
  ideaId: string
}

const Idea: FC<Props> = ({ ideaId }) => {
  const routerParams: { id: string } = useParams()
  const idea = useIdea(ideaId)
  const inputRef = useRef<HTMLInputElement>(null)

  const [isChangeName, setIsChangeName] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const onClickIdea = () => {
    if (idea) {
      setInputValue(idea.name)
    }
    setIsChangeName(true)
    setTimeout(() => {
      if (inputRef && inputRef.current) {
        inputRef.current.focus()
      }
    }, 0)
  }

  const onChangeIdeaName = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const onClickAddChild = async () => {
    if (idea) {
      const doc = await firestore.collection(IDEAS).add({
        name: '新しいノード',
        children: [],
        parentId: idea.id,
        pageId: routerParams.id,
        likeCount: 0,
      })
      firestore.doc(`${IDEAS}/${idea.id}`).update({
        children: firebase.firestore.FieldValue.arrayUnion(doc.id),
      })
    }
  }

  const onBlurInput = (e: FocusEvent<HTMLInputElement>) => {
    setIsChangeName(false)
    const docPath = `${IDEAS}/${ideaId}`
    firestore
      .doc(docPath)
      .update({
        name: inputValue,
      })
      .then((res) => {})
  }

  const onClickLike = () => {
    console.log(1)
    if (idea) {
      const docPath = `${IDEAS}/${ideaId}`
      firestore.doc(docPath).update({
        likeCount: firebase.firestore.FieldValue.increment(1),
      })
    }
  }

  const onClickDeleteIdea = () => {
    if (idea) {
      const docPath = `${IDEAS}/${ideaId}`
      if (idea.parentId) {
        firestore
          .doc(`${IDEAS}/${idea.parentId}`)
          .update({
            children: firebase.firestore.FieldValue.arrayRemove(ideaId),
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
      {idea && (
        <div>
          <Card onClick={onClickIdea}>
            {!isChangeName && idea.name}
            {isChangeName && (
              <Input
                type="text"
                value={inputValue}
                ref={inputRef}
                onChange={onChangeIdeaName}
                onBlur={onBlurInput}
              />
            )}
          </Card>
          <button onClick={onClickAddChild}>追加</button>
          <button onClick={onClickDeleteIdea}>削除</button>
          <button onClick={onClickLike}>いいね + {idea.likeCount}</button>
          {idea && idea.children.map((id) => <Idea key={id} ideaId={id} />)}
        </div>
      )}
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

export default Idea
