import React, { FC } from 'react'
import usePages from '../hooks/usePages'
import { Link } from 'react-router-dom'
import firebase, { firestore } from '../firebase'
import { PAGES } from '../firebase/collections'
import { Page } from '../types'

const Home: FC = () => {
  const pages = usePages()
  const onClickCreatePage = () => {
    const id = firestore.collection(PAGES).doc().id
    const pageDate: Page = {
      id,
      name: '新しいページ',
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    }
    firestore
      .doc(`${PAGES}/${id}`)
      .set(pageDate)
      .then(() => {})
  }
  return (
    <div>
      {pages.map((page: any) => (
        <div key={page.id}>
          <Link to={`/${page.id}`}>{page.name}</Link>
        </div>
      ))}
      <div>
        <button onClick={onClickCreatePage}>新しいページを作る</button>
      </div>
    </div>
  )
}

export default Home
