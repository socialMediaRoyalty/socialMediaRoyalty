import axios from 'axios'

/* -----------------    ACTIONS     ------------------ */

const FETCH_ORDERS = 'FETCH_ORDERS'
const FETCH_USER_ORDER = 'FETCH_USER_ORDER'
const FETCH_BY_STATUS = 'FETCH_BY_STATUS'
const UPDATE_STATUS = 'UPDATE_STATUS'
const ADD_ORDER = 'ADD_ORDER'

/* ------------   ACTION CREATORS     ------------------ */

const getAllOrders = (orders) => ({type: FETCH_ORDERS, orders})
const getUserOrders = (orders) => ({type: FETCH_USER_ORDER, orders})
const getByStatus = (orders) => ({type: FETCH_BY_STATUS, orders})
const updateStatus = (order) => ({type: UPDATE_STATUS, order})
const createOrder = (order) => ({type: ADD_ORDER, order})

/* ------------       INITIAL STATE     ------------------ */

const initialState = {
  orders: []
}

/* ------------       REDUCER     ------------------ */

export const reducer = (state=initialState, action) => {
  const newState = Object.assing({}, state)

  switch (action.type) {
  case FETCH_ORDERS:
    newState.orders = action.orders
    break
  case FETCH_USER_ORDER:
    newState.orders = action.orders
    break
  case FETCH_BY_STATUS:
    newState.orders = action.orders
    break
  case UPDATE_STATUS:
    newState.orders = action.orders
    break
  case ADD_ORDER:
    newState.orders = action.orders
    break

  default:
    return state
  }

  return newState
}

/* ------------       DISPATCHERS     ------------------ */

export const fetchAllOrders = () => {
  dispatch => {
    axios.get(`/api/orders`)
    .then(res => {
      dispatch(getAllOrders(res.data))
    })
  }
}

export const fetchUserOrders = () => {
  dispatch => {
    axios.get(`/api/orders`)
    .then(res => {
      dispatch(getUserOrders(res.data))
    })
  }
}

export const fetchOrdersByStatus = () => {
  dispatch => {
    axios.get(`/api/orders`)
    .then(res => {
      dispatch(getByStatus(res.data))
    })
  }
}

export const updateOrderStatus = (orderId) => {
  dispatch => {
    axios.put(`/api/orders/${orderId}`)
    .then(res => {
      dispatch(updateStatus(res.data))
    })
  }
}

export const createNewOrder = () => {
  dispatch => {
    axios.post(`/api/orders`)
    .then(res => {
      dispatch(createOrder(res.data))
    })
  }
}


