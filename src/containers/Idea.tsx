import React, { FC, ChangeEvent, FocusEvent, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import useIdea from '../hooks/useIdea'
import firebase, { firestore } from '../firebase'
import { IDEAS } from '../firebase/collections'
import AddIcon from '../components/AddIcon'
import DeleteIcon from '../components/DeleteIcon'
import LikeButton from './LikeButton'
import IconButton from '../components/IconButton'

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
        name: '新しいアイデア',
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
        <Container>
          <Content>
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
            <ButtonGroup>
              <ButtonOuter>
                <LikeButton onClick={onClickLike} count={idea.likeCount} />
              </ButtonOuter>
              <ButtonOuter>
                <IconButton onClick={onClickAddChild}>
                  <AddIcon />
                </IconButton>
              </ButtonOuter>
              <ButtonOuter>
                <IconButton onClick={onClickDeleteIdea}>
                  <DeleteIcon />
                </IconButton>
              </ButtonOuter>
            </ButtonGroup>
          </Content>
          <IdeaGroup>
            {idea && idea.children.map((id) => <Idea key={id} ideaId={id} />)}
          </IdeaGroup>
        </Container>
      )}
    </Inner>
  )
}

const Inner = styled.div`
  margin-left: 64px;
`

const Input = styled.input`
  appearance: none;
  font-size: 12px;
  outline: none;
  border: none;
  line-height: 1;
  height: 100%;
`

const Container = styled.div`
  position: relative;
  margin-bottom: 24px;
`

const Content = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: -32px;
    width: 20px;
    height: 2px;
    background-color: #f3f3f3;
    transform: translateY(-50%);
  }
`

const Card = styled.div`
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.18);
  padding: 8px;
  display: inline-block;
  font-size: 12px;
`

const ButtonOuter = styled.div`
  display: inline-block;
  margin-left: 8px;
`

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  margin-left: 8px;
`

const IdeaGroup = styled.div`
  position: relative;
  &:after {
    content: '';
    display: block;
    position: absolute;
    top: calc(50% - 16px);
    left: 16px;
    width: 2px;
    height: 100%;
    background-color: #f3f3f3;
    transform: translateY(-50%);
  }
`

export default Idea
