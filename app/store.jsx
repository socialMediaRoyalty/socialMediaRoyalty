import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import {whoami} from './reducers/auth'
import { getAllCategories } from './reducers/category' // delete me -- KHLP
import { getAllProducts } from './reducers/product' // delete me -- KHLP

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      thunkMiddleware,
      createLogger({collapsed: true})
    )
  )
)

export default store

// Set the auth info at start
store.dispatch(whoami())
store.dispatch(getAllCategories()) // no - I am in the initialFetch in main.jsx -- KHLP
