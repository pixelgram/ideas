import React, { FC } from 'react'
import { useParams } from 'react-router-dom'
import Node from '../components/Node'
import usePage from '../hooks/usePage'
const Id: FC = () => {
  const { id } = useParams()
  const page = usePage(id)
  return (
    <div>{page && page.children.map((id) => <Node key={id} id={id} />)}</div>
  )
}
export default Id
