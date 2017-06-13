import axios from 'axios'

/* -----------------    ACTIONS     ------------------ */

const FETCH_CART = 'FETCH_CART'
const ADD_CART = 'ADD_CART'
const ADD_PRODUCT = 'ADD_PRODUCT'
const DELETE_CART = 'DELETE_CART'

/* ------------   ACTION CREATORS     ------------------ */

const getCart = (cart) => ({type: FETCH_CART, cart})
const addCart = (cart) => ({type: ADD_CART, cart})
const addProd = (product) => ({type: ADD_PRODUCT, product})
const delCart = (cart) => ({type: DELETE_CART, cart})

/* ------------       REDUCER     ------------------ */

const reducer = (cart = [], action) => {
  switch (action.type) {
  case FETCH_CART:
    return action.cart
  case ADD_CART:
    return action.cart
  case ADD_PRODUCT:
    return action.cart
  case DELETE_CART:
    return action.cart
  default:
    return cart
  }
}

export default reducer

/* ------------       DISPATCHERS     ------------------ */

export const fetchCart = () =>
  dispatch =>
    axios.get(`/api/carts`)
    .then(res => {
      dispatch(getCart(res.data))
    }).catch(console.error)

export const saveCart = () =>
  dispatch =>
    axios.post(`/api/carts`)
    .then(res => {
      dispatch(addCart(res.data))
    }).catch(console.error)

export const addProduct = () =>
  dispatch =>
    axios.post(`/api/carts`)
    .then(res => {
      dispatch(addProd(res.data))
    }).catch(console.error)

export const deleteCart = () =>
  dispatch =>
    axios.delete(`/api/carts`)
    .then(res => {
      dispatch(delCart(res.data))
    }).catch(console.error)