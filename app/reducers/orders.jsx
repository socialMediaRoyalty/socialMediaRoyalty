import axios from 'axios'

/* -----------------    ACTIONS     ------------------ */

const FETCH_ORDERS = 'FETCH_ORDERS'
const FETCH_USER_ORDERS = 'FETCH_USER_ORDER'
const FETCH_BY_STATUS = 'FETCH_BY_STATUS'
const UPDATE_STATUS = 'UPDATE_STATUS'
const ADD_ORDER = 'ADD_ORDER'

/* ------------   ACTION CREATORS     ------------------ */

const getAllOrders = (orders) => ({type: FETCH_ORDERS, orders})
const getUserOrders = (orders) => ({type: FETCH_USER_ORDERS, orders})
const getByStatus = (orders) => ({type: FETCH_BY_STATUS, orders})
const updateStatus = (order) => ({type: UPDATE_STATUS, order})
const createOrder = (orders) => ({type: ADD_ORDER, orders})

/* ------------       REDUCER     ------------------ */

const reducer = (orders=[], action) => {
  switch (action.type) {
  case FETCH_ORDERS:
    return action.orders
  case FETCH_USER_ORDERS:
    return action.orders
  case FETCH_BY_STATUS:
    return action.orders
  case UPDATE_STATUS:
    return action.orders
  case ADD_ORDER:
    return action.orders
  default:
    return orders
  }
}

export default reducer

/* ------------       DISPATCHERS     ------------------ */

export const fetchAllOrders = () =>
  dispatch =>
    axios.get(`/api/orders`)
    .then(res => {
      dispatch(getAllOrders(res.data))
    }).catch(console.error)

export const fetchUserOrders = () =>
  dispatch =>
    axios.get(`/api/orders`)
    .then(res => {
      dispatch(getUserOrders(res.data))
    }).catch(console.error)

export const fetchOrdersByStatus = () =>
  dispatch =>
    axios.get(`/api/orders`)
    .then(res => {
      dispatch(getByStatus(res.data))
    }).catch(console.error)

export const updateOrderStatus = (orderId) =>
  dispatch =>
    axios.put(`/api/orders/${orderId}`)
    .then(res => {
      dispatch(updateStatus(res.data))
    }).catch(console.error)

export const createNewOrder = (orderInfo) =>
  dispatch =>
    axios.post(`/api/orders`, orderInfo)
    .then(res => {
      dispatch(createOrder(res.data))
    }).catch(err => console.error(`Create new order: unsuccesful`, err))
