import React, { FC } from 'react'
import styled from 'styled-components'
import useIdeasOrderByLikeCount from '../hooks/useIdeasOrderByLikeCount'

type Props = {
  pageId: string
}

const Sidebar: FC<Props> = ({ pageId }) => {
  const mostLikeNodes = useIdeasOrderByLikeCount(pageId)
  return (
    <Layout>
      <Header>もっともいいね！されたアイデア</Header>
      {mostLikeNodes.map((idea) => (
        <Idea>
          {idea.name} - いいね（{idea.likeCount}）
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
  background-color: #f9f9f9;
  overflow-y: scroll;
  overflow-scrolling: touch;
`

const Header = styled.div`
  background-color: #ff5103;
  color: #fff;
  padding: 16px;
  font-weight: bold;
`

const Idea = styled.div`
  padding: 16px;
  border-bottom: solid 2px #eee;
`

export default Sidebar
