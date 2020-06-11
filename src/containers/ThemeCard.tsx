import React, { FC } from 'react'
import styled from 'styled-components'

type Props = {
  name: string
  date: string
}

const ThemeCard: FC<Props> = ({ name, date }) => {
  return (
    <Card>
      <CardName>{name}</CardName>
      <CardDate>{date}</CardDate>
    </Card>
  )
}

const Card = styled.div`
  padding: 16px;
  margin-bottom: 16px;
  background-color: ${(props) => props.theme.colors.BG_WHITE};
  box-shadow: ${(props) => props.theme.colors.LIGHT_SHADOW};
`

const CardName = styled.div`
  color: ${(props) => props.theme.colors.BG_BLACK};
  margin-bottom: 8px;
  font-size: 14px;
`

const CardDate = styled.div`
  font-size: 12px;
  color: ${(props) => props.theme.colors.TEXT_GRAY};
`

export default ThemeCard
