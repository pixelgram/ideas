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
import LabelInput from './LabelInput'
import updateIdea from '../firebase/updateIdea'
import { UpdateIdeaData } from '../firebase/types'

type Props = {
  ideaId: string
}

const Idea: FC<Props> = ({ ideaId }) => {
  const routerParams: { id: string } = useParams()
  const idea = useIdea(ideaId)

  const onClickAddChild = async () => {
    if (idea) {
      const doc = await firestore.collection(IDEAS).add({
        name: '新しいアイデア',
        children: [],
        parentId: idea.id,
        themeId: routerParams.id,
        likeCount: 0,
      })
      firestore.doc(`${IDEAS}/${idea.id}`).update({
        children: firebase.firestore.FieldValue.arrayUnion(doc.id),
      })
    }
  }

  const onClickLike = () => {
    if (idea) {
      const docPath = `${IDEAS}/${ideaId}`
      firestore.doc(docPath).update({
        likeCount: firebase.firestore.FieldValue.increment(1),
      })
    }
  }

  const onBlurChangeIdeaName = (
    value: string,
  ): Promise<UpdateIdeaData | null> => {
    if (!idea) return Promise.resolve(null)
    const isChanged = idea.name !== value
    if (isChanged) {
      return updateIdea(idea.id, {
        name: value,
      })
    } else {
      return Promise.resolve(null)
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
            <LabelInput onBlur={onBlurChangeIdeaName} value={idea.name} />
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
