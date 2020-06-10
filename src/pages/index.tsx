import React, { FC } from 'react'
import usePages from '../hooks/usePages'
import { Link } from 'react-router-dom'

const Home: FC = () => {
  const pages = usePages()
  return (
    <div>
      {pages.map((page: any) => (
        <Link key={page.id} to={`/${page.id}`}>
          {page.name}
        </Link>
      ))}
    </div>
  )
}

export default Home
