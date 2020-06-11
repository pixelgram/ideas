import React, { FC } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import Idea from '../components/Idea'
import Sidebar from '../containers/Sidebar'
import usePage from '../hooks/usePage'
import firebase, { firestore } from '../firebase'
import { IDEAS, PAGES } from '../firebase/collections'
import useNodesByPageId from '../hooks/useIdeasByPageId'
const Id: FC = () => {
  const { id } = useParams()
  const page = usePage(id)
  const ideas = useNodesByPageId(id)

  const onClickAddNode = async () => {
    if (page) {
      firestore.collection(IDEAS).add({
        name: '新しいアイデア',
        children: [],
        parentId: '',
        pageId: page.id,
        likeCount: 0,
      })
    }
  }

  return (
    <Layout>
      <Main>
        <MainInner>
          {page && (
            <>
              <MainHeader>{page.name}</MainHeader>
              <MainBody>
                <button onClick={onClickAddNode}>追加</button>
                {ideas.map((idea) => (
                  <Idea key={idea.id} ideaId={idea.id} />
                ))}
              </MainBody>
            </>
          )}
        </MainInner>
      </Main>
      <Sidebar pageId={id} />
    </Layout>
  )
}

const Layout = styled.div`
  display: flex;
`
const Main = styled.div`
  overflow: scroll;
  width: calc(100vw - 400px);
  height: 100vh;
`

const MainInner = styled.div`
  width: max-content;
  min-width: 100%;
`

const MainHeader = styled.div`
  position: sticky;
  top: 0;
  background-color: #ff5103;
  color: #fff;
  padding: 16px;
  font-weight: bold;
`

const MainBody = styled.div`
  padding: 24px;
`

export default Id
