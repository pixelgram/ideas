import React, { FC } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import theme from './themes'
import Index from './pages'
import Id from './pages/id'
const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  )
}

export default App
