'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import Jokes from './components/Jokes'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import NotFound from './components/NotFound'

import RootContainer from './containers/RootContainer'
import CategoriesContainer from './containers/CategoriesContainer'
import ProductsContainer from './containers/ProductsContainer'
import ProductContainer from './containers/ProductContainer'

import {getAllCategories} from './reducers/category'
import {getAllProducts, getProductById} from './reducers/product'

const onProductsEnter = () => {
  store.dispatch(getAllProducts())
}

const onProductEnter = (state) => {
  store.dispatch(getProductById(2))
}

const ExampleApp = connect(
  // mapStateToProps
  ({ auth }) => ({ user: auth })
)(
  ({ user, children }) =>
    <div>
      <nav>
        {user ? <WhoAmI/> : <Login/>}
      </nav>
      {children}
    </div>
)

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={ExampleApp}>
        <IndexRedirect to="/index" />
        <Route path="/index" component={RootContainer} >
          <Route path="/categories" components={CategoriesContainer} />
          <Route path="/products" components={ProductsContainer} onEnter={onProductsEnter}/>
          <Route path="/products/:pid" components={ProductContainer} onEnter={onProductEnter}/>
        </Route>
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('main')
)
