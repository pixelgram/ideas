import React, { FC, ReactNode } from 'react'
import styled from 'styled-components'

type Props = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  children: ReactNode
}

const Button: FC<Props> = ({ children, onClick }) => {
  return <ButtonComponent onClick={onClick}>{children}</ButtonComponent>
}

const ButtonComponent = styled.button`
  appearance: none;
  border: none;
  padding: 16px;
  color: ${(props) => props.theme.colors.TEXT_WHITE};
  background-color: ${(props) => props.theme.colors.BG_BLACK};
  font-weight: bold;
  font-size: 12px;
`

export default Button
