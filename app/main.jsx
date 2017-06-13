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

import CategoriesContainer from './containers/CategoriesContainer.jsx'
// import ProductsContainer from './containers/ProductsContainer'
// import ProductContainer from './containers/ProductContainer'

import SubmitPayment from './components/SubmitPayment'

import {getAllCategories} from './reducers/category'
import {getAllProducts, getProductById} from './reducers/product'
import { fetchAllUsers } from './reducers/user'

/* OnEnter Functions go Here */
const fetchInitialData = (newRouterState) => {
  // store.dispatch(getAllCategories())
// store.dispatch to get all Products too
}

const onUsersEnter = (newRouterState) =>
  store.dispatch(fetchAllUsers())

const onProductsEnter = () => {
  store.dispatch(getAllProducts())
}

const onProductEnter = (state) => {
  store.dispatch(getProductById(state.params.pid))
}

// const ExampleApp = connect(
//   // mapStateToProps
//   ({ auth }) => ({ user: auth })
// )(
//   ({ user, children }) =>
//     <div>
//       <nav>
//         {user ? <WhoAmI/> : <Login/>}
//       </nav>
//       {children}
//     </div>
// )

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={RootContainer} onEnter={fetchInitialData}>
        <IndexRoute component={Home} />
        <Route path="/categories" components={CategoriesContainer} />
        {/*<Route path="/products" components={ProductsContainer} onEnter={onProductsEnter}/>
        <Route path="/products/:pid" components={ProductContainer} onEnter={onProductEnter}/>*/}
        <Route path="/profile" component={ ProfileContainer } />
        <Route path="/payment" component={SubmitPayment} />
        <Route path="/admin/users"
          component={UsersContainer}
          onEnter={onUsersEnter} />
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('main')
)
