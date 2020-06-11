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
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
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
