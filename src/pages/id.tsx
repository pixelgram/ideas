import React, { FC } from 'react'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import Idea from '../containers/Idea'
import Sidebar from '../containers/Sidebar'
import useTheme from '../hooks/useTheme'
import useIdeasByPageId from '../hooks/useIdeasByPageId'
import createIdea from '../firebase/createIdea'
import DeleteIcon from '../components/DeleteIcon'
import IconButton from '../components/IconButton'
import AddIcon from '../components/AddIcon'
import BackIcon from '../components/BackIcon'
import deleteTheme from '../firebase/deleteTheme'
import LabelInput from '../containers/LabelInput'
import { UpdateIdeaData } from '../firebase/types'
import updateTheme from '../firebase/updateTheme'
const Id: FC = () => {
  const { id } = useParams()
  const theme = useTheme(id)
  const ideas = useIdeasByPageId(id)
  const history = useHistory()

  const onClickAddIdea = async () => {
    if (theme) {
      const data = {
        name: '新しいアイデア',
        parentId: '',
        themeId: theme.id,
      }
      createIdea(data).then(() => {})
    }
  }

  const onClickDeleteTheme = () => {
    deleteTheme(id).then(() => {
      history.push('/')
    })
  }

  const onBlurChangeThemeName = (
    value: string,
  ): Promise<UpdateIdeaData | null> => {
    if (!theme) return Promise.resolve(null)
    const isChanged = theme.name !== value
    if (isChanged) {
      return updateTheme(theme.id, {
        name: value,
      })
    } else {
      return Promise.resolve(null)
    }
  }

  return (
    <Layout>
      <Main>
        <MainInner>
          {theme && (
            <>
              <MainBody>
                <Theme>
                  <LabelInput
                    onBlur={onBlurChangeThemeName}
                    value={theme.name}
                  />
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
        <MainBackButtonOuter>
          <Link to="/">
            <MainBackButton>
              <BackIcon />
            </MainBackButton>
          </Link>
        </MainBackButtonOuter>
      </Main>
      <Sidebar themeId={id} />
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

const MainBackButtonOuter = styled.div`
  position: fixed;
  left: 16px;
  bottom: 16px;
`

const MainBackButton = styled.button`
  appearance: none;
  border: none;
  border-radius: 100%;
  width: 32px;
  height: 32px;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  outline: none;
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
