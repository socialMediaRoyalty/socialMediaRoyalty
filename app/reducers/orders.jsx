import axios from 'axios'

/* -----------------    ACTIONS     ------------------ */

const ALL_ORDERS = 'ALL_ORDERS'
const USER_ORDERS = 'USER_ORDERS'
const ORDERS_BY_STATUS = 'ORDERS_BY_STATUS'
const UPDATE_STATUS = 'UPDATE_STATUS'
const NEW_ORDER = 'NEW_ORDER'

/* ------------   ACTION CREATORS     ------------------ */

const getAllOrders = (orders) => ({ type: ALL_ORDERS, orders})
const getUserOrders = (orders) => ({ type: USER_ORDERS, orders})
const getByStatus = (orders) => ({ type: ORDERS_BY_STATUS, orders})
const updateStatus = (order) => ({ type: UPDATE_STATUS, order})
const createOrder = (order) => ({ type: NEW_ORDER, order})

/* ------------       INITIAL STATE     ------------------ */

const initialState = {
  orders: []
}

/* ------------       REDUCER     ------------------ */

export const reducer = (state=initialState, action) => {
  const newState = Object.assing({}, state)

  switch (action.type) {
  case ALL_ORDERS:
    newState.orders = action.orders
    break
  case USER_ORDERS:
    newState.orders = action.orders
    break
  case ORDERS_BY_STATUS:
    newState.orders = action.orders
    break
  case UPDATE_STATUS:
    newState.orders = action.orders
    break
  case NEW_ORDER:
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


