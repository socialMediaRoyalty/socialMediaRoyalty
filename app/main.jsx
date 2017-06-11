'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, IndexRoute, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'
import { Button } from 'react-bootstrap'

import store from './store'
import Jokes from './components/Jokes'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import NotFound from './components/NotFound'
import { Home } from './components/Home'
import RootContainer from './containers/RootContainer'

/* OnEnter Functions go Here */

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={RootContainer}>
        <IndexRoute component={Home} />
        <Route path="/jokes" component={Jokes} />
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('main')
)
