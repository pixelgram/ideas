import React, { FC } from 'react'
import styled from 'styled-components'
import useIdeasOrderByLikeCount from '../hooks/useIdeasOrderByLikeCount'
import LikeButton from './LikeButton'
import { IDEAS } from '../firebase/collections'
import firebase, { firestore } from '../firebase'
import updateIdea from '../firebase/updateIdea'

type Props = {
  themeId: string
}

const Sidebar: FC<Props> = ({ themeId }) => {
  const mostLikeNodes = useIdeasOrderByLikeCount(themeId)
  const onClickLike = (ideaId: string) => {
    updateIdea(ideaId, {
      likeCount: firebase.firestore.FieldValue.increment(1),
    }).then(() => {})
  }
  return (
    <Layout>
      <Header>もっともいいね！されたアイデア</Header>
      {mostLikeNodes.map((idea) => (
        <Idea key={idea.id}>
          <IdeaName>{idea.name}</IdeaName>
          <IdeaDate>{idea.createdAt}</IdeaDate>
          <IdeaButtonOuter>
            <LikeButton
              onClick={() => onClickLike(idea.id)}
              count={idea.likeCount}
            />
          </IdeaButtonOuter>
        </Idea>
      ))}
    </Layout>
  )
}

const Layout = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.BG_WHITE};
  box-shadow: -10px 1px 10px rgba(0, 0, 0, 0.08);
  overflow-y: scroll;
  overflow-scrolling: touch;
`

const Header = styled.div`
  position: sticky;
  top: 0;
  background-color: ${(props) => props.theme.colors.BG_BLACK};
  color: #fff;
  padding: 24px 16px;
  font-size: 14px;
  font-weight: bold;
`

const Idea = styled.div`
  padding: 16px;
  border-bottom: solid 2px #eee;
`

const IdeaName = styled.div`
  font-size: 14px;
  margin-bottom: 16px;
`

const IdeaDate = styled.div`
  font-size: 12px;
  margin-bottom: 16px;
  color: ${(props) => props.theme.colors.TEXT_GRAY};
`

const IdeaButtonOuter = styled.div`
  display: flex;
  justify-content: flex-end;
`

export default Sidebar
