import React, { FC } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import styled from 'styled-components'
import Index from './pages'
import Id from './pages/id'
const App: FC = () => {
  return (
    <Inner>
      <BrowserRouter>
        <Switch>
          <Route path="/:id" expact>
            <Id />
          </Route>
          <Route path="/" expact>
            <Index />
          </Route>
        </Switch>
      </BrowserRouter>
    </Inner>
  )
}

const Inner = styled.div`
  padding: 16px;
`

export default App
