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
        {page && (
          <div>
            <PageName>{page.name}</PageName>
            <button onClick={onClickAddNode}>追加</button>
            {ideas.map((idea) => (
              <Idea key={idea.id} ideaId={idea.id} />
            ))}
          </div>
        )}
      </Main>
      <Sidebar pageId={id} />
    </Layout>
  )
}

const Layout = styled.div`
  display: flex;
`
const Main = styled.div`
  width: calc(100vw - 400px);
`

const PageName = styled.div`
  display: inline-block;
  margin-bottom: 24px;
  background-color: #0070f3;
  color: #fff;
  padding: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
`

export default Id
