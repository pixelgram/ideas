import React, { FC, ChangeEvent, FocusEvent, useState, useRef } from 'react'
import styled from 'styled-components'
import useNode from '../hooks/useNode'
import { firestore } from '../firebase'
import { NODES } from '../firebase/collections'

type Props = {
  id: string
}

const Node: FC<Props> = ({ id }) => {
  const node = useNode(id)
  const inputRef = useRef<HTMLInputElement>(null)

  const [isChangeName, setIsChangeName] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const onClickNode = () => {
    if (node) {
      setInputValue(node.name)
    }
    setIsChangeName(true)
    setTimeout(() => {
      if (inputRef && inputRef.current) {
        inputRef.current.focus()
      }
    }, 0)
  }

  const onChangeNodeName = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const onBlurInput = (e: FocusEvent<HTMLInputElement>) => {
    setIsChangeName(false)
    const docPath = `${NODES}/${id}`
    firestore
      .doc(docPath)
      .update({
        ...node,
        name: inputValue,
      })
      .then((res) => {
        console.log('hoge')
      })
  }

  return (
    <Inner>
      <Card onClick={onClickNode}>
        {!isChangeName && node && node.name}
        {isChangeName && (
          <Input
            type="text"
            value={inputValue}
            ref={inputRef}
            onChange={onChangeNodeName}
            onBlur={onBlurInput}
          />
        )}
      </Card>
      {node && node.children.map((id) => <Node key={id} id={id} />)}
    </Inner>
  )
}

const Inner = styled.div`
  margin-left: 64px;
  margin-bottom: 8px;
`

const Input = styled.input`
  font-size: 12px;
`

const Card = styled.div`
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  padding: 8px;
  margin-bottom: 16px;
  display: inline-block;
  font-size: 12px;
`

export default Node
