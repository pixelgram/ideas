import React, { FC, ReactNode } from 'react'
import styled from 'styled-components'

type Props = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  children: ReactNode
}

const IconButton: FC<Props> = ({ onClick, children }) => {
  return <Body onClick={onClick}>{children}</Body>
}

const Body = styled.button`
  appearance: none;
  border: none;
  border-radius: 100%;
  width: 32px;
  height: 32px;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  outline: none;
`

export default IconButton
