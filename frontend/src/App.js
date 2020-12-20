import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Top from './pages/Top'
import Login from './pages/Login'
import Register from './pages/Register'
import Auth from './pages/Auth'
import Mypage from './pages/Mypage'


function App() {
  return(
    <Router >
      <Switch>
        <Route exact path='/' component={Top} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Auth>
          <Switch>
            <Route exact path='/mypage' component={Mypage} />
          </Switch>
        </Auth>
      </Switch>
    </Router>
  );
}

export default App
