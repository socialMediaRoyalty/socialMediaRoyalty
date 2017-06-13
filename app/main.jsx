'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, IndexRoute, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import NotFound from './components/NotFound'
import Home from './components/Home'
import RootContainer from './containers/RootContainer.jsx'
import ProfileContainer from './containers/ProfileContainer'
import UsersContainer from './containers/UsersContainer'

import HomeContainer from './containers/HomeContainer'
import CategoriesContainer from './containers/CategoriesContainer'
import ProductsContainer from './containers/ProductsContainer'
import ProductContainer from './containers/ProductContainer'

import {getAllCategories} from './reducers/category'
import {getAllProducts, getProductById, getProductByCategory} from './reducers/product'
import { fetchAllUsers } from './reducers/user'
import {getReviewsByProduct} from './reducers/reviews'

/* OnEnter Functions go Here */
const fetchInitialData = (newRouterState) => {
  store.dispatch(getAllCategories())
  store.dispatch(getAllProducts())
}

const onUsersEnter = (newRouterState) =>
  store.dispatch(fetchAllUsers())

const onProductByCategoryEnter = (newRouterState) => {
  store.dispatch(getProductByCategory(newRouterState.params.cid))
}

const onProductEnter = (newRouterState) => {
  store.dispatch(getProductById(newRouterState.params.pid))
  store.dispatch(getReviewsByProduct(newRouterState.params.pid))
}

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={RootContainer} onEnter={fetchInitialData}>
        <IndexRoute component={HomeContainer} />
        <Route path="/categories" components={CategoriesContainer} />
        <Route path="/products" components={ProductsContainer} />
        <Route path="/products/categories/:cid" components={ProductsContainer} onEnter={onProductByCategoryEnter}/>
        <Route path="/products/:pid" components={ProductContainer} onEnter={onProductEnter}/>
        <Route path="/profile" component={ ProfileContainer } />
        <Route path="/admin/users" component={UsersContainer} onEnter={onUsersEnter} />
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('main')
)
