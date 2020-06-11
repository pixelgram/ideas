import React, { FC } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import usePages from '../hooks/usePages'
import { Link } from 'react-router-dom'
import createTheme from '../firebase/createTheme'
import ThemeCard from '../containers/ThemeCard'
import Button from '../components/Button'
import { Page } from '../types'

const Index: FC = () => {
  const pages = usePages()
  const history = useHistory()
  const onClickCreatePage = () => {
    createTheme('新しいテーマ').then(({ id }) => {
      history.push(`/${id}`)
    })
  }
  return (
    <Container>
      <ThemeGroup>
        {pages.map((page: Page) => (
          <Link to={`/${page.id}`}>
            <ThemeCard
              key={page.id}
              name={page.name ? page.name : '名称未設定'}
              date={page.createdAt}
            />
          </Link>
        ))}
      </ThemeGroup>
      <Button onClick={onClickCreatePage}>新しいテーマを作る</Button>
    </Container>
  )
}

const Container = styled.div`
  padding: 24px;
`

const ThemeGroup = styled.div``

export default Index
