'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, IndexRoute, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import Jokes from './components/jokes'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import NotFound from './components/NotFound'
import Home from './components/Home'
import UsersContainer from './components/UsersContainer'
import { fetchAllUsers } from './reducers/user'
import RootContainer from './containers/RootContainer'

/* OnEnter Functions go Here */
const onUsersEnter = (newRouterState) =>
  store.dispatch(fetchAllUsers())

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={RootContainer}>
        <IndexRoute component={Home} />
        <Route path="/admin/users"
          component={UsersContainer}
          onEnter={onUsersEnter} />
        <Route path="/jokes" component={Jokes} />

      </Route>
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('main')
)
