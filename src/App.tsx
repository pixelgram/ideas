import React, { FC } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
const App: FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" expact>
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
