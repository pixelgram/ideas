import React, { FC } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import Idea from '../containers/Idea'
import Sidebar from '../containers/Sidebar'
import usePage from '../hooks/usePage'
import useIdeasByPageId from '../hooks/useIdeasByPageId'
import createIdea from '../firebase/createIdea'
import DeleteIcon from '../components/DeleteIcon'
import IconButton from '../components/IconButton'
import AddIcon from '../components/AddIcon'
import deleteTheme from '../firebase/deleteTheme'
const Id: FC = () => {
  const { id } = useParams()
  const page = usePage(id)
  const ideas = useIdeasByPageId(id)
  const history = useHistory()

  const onClickAddIdea = async () => {
    if (page) {
      const data = {
        name: '新しいアイデア',
        parentId: '',
        pageId: page.id,
      }
      createIdea(data).then(() => {})
    }
  }

  const onClickDeleteTheme = () => {
    deleteTheme(id).then(() => {
      history.push('/')
    })
  }

  return (
    <Layout>
      <Main>
        <MainInner>
          {page && (
            <>
              <MainBody>
                <Theme>
                  <ThemeName>{page.name}</ThemeName>
                  <ButtonGroup>
                    <ButtonOuter>
                      <IconButton onClick={onClickAddIdea}>
                        <AddIcon />
                      </IconButton>
                    </ButtonOuter>
                    <ButtonOuter>
                      <IconButton onClick={onClickDeleteTheme}>
                        <DeleteIcon />
                      </IconButton>
                    </ButtonOuter>
                  </ButtonGroup>
                </Theme>
                <IdeaGroup>
                  {ideas.map((idea) => (
                    <Idea key={idea.id} ideaId={idea.id} />
                  ))}
                </IdeaGroup>
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

const Theme = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`

const ThemeName = styled.div`
  display: inline-block;
  background-color: #ff5103;
  color: #fff;
  font-weight: bold;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.18);
  padding: 8px;
  font-size: 12px;
`

const MainBody = styled.div`
  padding: 24px;
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

export default Id
