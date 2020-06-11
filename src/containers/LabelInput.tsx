import React, { ChangeEvent, FC, FocusEvent, useRef, useState } from 'react'
import styled from 'styled-components'
import { UpdateIdeaData } from '../firebase/types'

type Props = {
  onBlur: (value: string) => Promise<UpdateIdeaData | null>
  value: string
}

const LabelInput: FC<Props> = ({ onBlur, value }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const [isTyping, setIsTyping] = useState(false)
  const [inputValue, setInputValue] = useState(value)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }
  const onClick = () => {
    setInputValue(value)
    setIsTyping(true)
    setTimeout(() => {
      if (inputRef && inputRef.current) {
        inputRef.current.focus()
      }
    }, 0)
  }

  const onDefaultBlur = (e: FocusEvent<HTMLInputElement>) => {
    onBlur(inputValue).then(() => {
      setIsTyping(false)
    })
  }

  return (
    <Label onClick={onClick}>
      <LabelInner>
        <LabelContent>
          {!isTyping && <LabelBody>{value}</LabelBody>}
          {isTyping && (
            <Input
              onChange={onChange}
              onBlur={onDefaultBlur}
              ref={inputRef}
              value={inputValue}
            />
          )}
        </LabelContent>
        <LabelSizer>{isTyping ? inputValue : value}</LabelSizer>
      </LabelInner>
    </Label>
  )
}

const Label = styled.div`
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.18);
  padding: 8px;
`

const LabelInner = styled.div`
  position: relative;
  display: inline-block;
`

const LabelContent = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  z-index: 2;
  width: 100%;
`

const LabelBody = styled.div`
  line-height: 20px;
  height: 20px;
`

const LabelSizer = styled.div`
  opacity: 0;
  pointer-events: none;
  font-size: 12px;
  line-height: 20px;
  height: 20px;
`

const Input = styled.input`
  appearance: none;
  font-size: 12px;
  outline: none;
  border: none;
  line-height: 20px;
  height: 20px;
  width: 100%;
`

export default LabelInput
