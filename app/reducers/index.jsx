import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  users: require('./user').default,
  category: require('./category').default
})

export default rootReducer
