import React, { FC } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import useThemes from '../hooks/useThemes'
import { Link } from 'react-router-dom'
import createTheme from '../firebase/createTheme'
import ThemeCard from '../containers/ThemeCard'
import Button from '../components/Button'
import { Theme } from '../types'

const Index: FC = () => {
  const themes = useThemes()
  const history = useHistory()
  const onClickCreateTheme = () => {
    createTheme('新しいテーマ').then(({ id }) => {
      history.push(`/${id}`)
    })
  }
  return (
    <Container>
      <ThemeGroup>
        {themes.map((theme: Theme) => (
          <Link key={theme.id} to={`/${theme.id}`}>
            <ThemeCard
              name={theme.name ? theme.name : '名称未設定'}
              date={theme.createdAt}
            />
          </Link>
        ))}
      </ThemeGroup>
      <Button onClick={onClickCreateTheme}>新しいテーマを作る</Button>
    </Container>
  )
}

const Container = styled.div`
  padding: 24px;
`

const ThemeGroup = styled.div``

export default Index
