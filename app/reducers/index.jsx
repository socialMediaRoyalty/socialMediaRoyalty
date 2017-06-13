import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  product: require('./product').default,
  users: require('./user').default,
  category: require('./category').default,
  orders: require('./orders').default
})

export default rootReducer
