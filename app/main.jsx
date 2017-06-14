'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, IndexRoute, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import NotFound from './components/NotFound'
import SubmitPayment from './components/SubmitPayment'
import OrderSuccess from './components/OrderSuccess'
import SubmitPayment from './components/SubmitPayment'
import OrderSuccess from './components/OrderSuccess'

import RootContainer from './containers/RootContainer.jsx'
import ProfileContainer from './containers/ProfileContainer'
import UsersContainer from './containers/UsersContainer'
import Orders from './containers/OrdersContainer'
import SignupContainer from './containers/SignupContainer'
import HomeContainer from './containers/HomeContainer'
import CategoriesContainer from './containers/CategoriesContainer'
import ProductsContainer from './containers/ProductsContainer'
import ProductContainer from './containers/ProductContainer'
import CartContainer from './containers/CartContainer'

import {getAllCategories} from './reducers/category'
import {getAllProducts, getProductById, getProductByCategory} from './reducers/product'
import {fetchAllUsers} from './reducers/user'
import {getCartById} from './reducers/carts'

import {getReviewsByProduct} from './reducers/reviews'
import { fetchAllOrders } from './reducers/orders'

/* OnEnter Functions go Here */
const fetchInitialData = (newRouterState) => {
  store.dispatch(getAllCategories())
  store.dispatch(getAllProducts())
}

const onHomeEnter = (newRouterState) => {
  store.dispatch(getAllProducts())
}

const onUsersEnter = (newRouterState) =>
  store.dispatch(fetchAllUsers())

const onProductByCategoryEnter = (newRouterState) => {
  store.dispatch(getProductByCategory(newRouterState.params.cid))
}

const onProductEnter = (newRouterState) => {
  store.dispatch(getProductById(newRouterState.params.pid))
}

const onCartEnter = (newRouterState) => {
  store.dispatch(getCartById(newRouterState.params.cid))
}

const onOrdersEnter = (newRouterState) => {
  store.dispatch(fetchAllOrders())
}

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={RootContainer} onEnter={fetchInitialData}>
        <IndexRoute component={HomeContainer} />
        <Route path="/categories" component={CategoriesContainer} />
        <Route path="/profile" component={ ProfileContainer } />
        <Route path="/payment" component={SubmitPayment} />
         <Route path="/submitted" component={OrderSuccess} />
        <Route path="/orders" component={Orders} onEnter={onOrdersEnter} />
        <Route path="/products" component={ProductsContainer} />
        <Route path="/products/categories/:cid" component={ProductsContainer} onEnter={onProductByCategoryEnter}/>
        <Route path="/products/:pid" component={ProductContainer} onEnter={onProductEnter}/>
        <Route path="/carts/:cid" components={CartContainer} onEnter={onCartEnter} />
        <Route path="/admin/users" component={UsersContainer} onEnter={onUsersEnter} />

      </Route>
      <Route path="/signup" component={SignupContainer} />
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('main')
)
