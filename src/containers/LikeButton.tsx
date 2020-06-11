import React, { FC } from 'react'
import LikeIcon from '../components/LikeIcon'
import styled from 'styled-components'

type Props = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  count: number
}

const LikeButton: FC<Props> = ({ onClick, count }) => {
  return (
    <LikeButtonBody onClick={onClick}>
      <LikeIcon />
      <LikeCount>{count}</LikeCount>
    </LikeButtonBody>
  )
}

const LikeButtonBody = styled.button`
  appearance: none;
  border: none;
  border-radius: 100px;
  padding: 0 16px;
  height: 32px;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  outline: none;
  display: flex;
  align-items: center;
`

const LikeCount = styled.div`
  font-weight: bold;
  margin-left: 4px;
`

export default LikeButton
