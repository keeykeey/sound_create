import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Top from './pages/Top'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'

function App() {
  return(
    <Router >
      <Switch>
        <Route exact path='/top/' component={Top} />
        <Route exact path='/login/' component={Login} />
        <Route exact path='/register/' component={Register} />
        <Route exact path='/' component = {Home} />
      </Switch>
    </Router>
  );
}

export default App
