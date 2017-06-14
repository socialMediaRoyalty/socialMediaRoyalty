import axios from 'axios'

/* -----------------    ACTIONS     ------------------ */

const FETCH_CART = 'FETCH_CART'
const GET_CART_BY_ID = 'GET_CART_BY_ID'
const FIND_CART_FOR_USER = 'FIND_CART_FOR_USER'
const ADD_CART = 'ADD_CART'
const ADD_PRODUCT = 'ADD_PRODUCT'
const DELETE_CART = 'DELETE_CART'

/* ------------   ACTION CREATORS     ------------------ */

const getCart = (cart) => ({type: FETCH_CART, cart})
const getById = (cart) => ({type: GET_CART_BY_ID, cart})
const findCart = (cart) => ({type: FIND_CART_FOR_USER, cart})
const addCart = (cart) => ({type: ADD_CART, cart})
const addProd = (cart) => ({type: ADD_PRODUCT, cart})
const delCart = (cart) => ({type: DELETE_CART, cart})

/* ------------       REDUCER     ------------------ */

const reducer = (cart = [], action) => {
  switch (action.type) {
  case FETCH_CART:
    return action.cart
  case FIND_CART_FOR_USER:
    return action.cart
  case GET_CART_BY_ID:
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

export const findCartForUser = (uid) =>
  dispatch => {
    axios.get(`/api/carts/user?id=${uid}`)
      .then(res => {
        dispatch(findCart(res.data))
      }).catch(console.error)
  }

export const getCartById = (cid) =>
  dispatch => {
    axios.get(`/api/carts/${cid}`)
      .then(res => {
        dispatch(getById(res.data))
      }).catch(console.error)
  }

export const saveCart = () =>
  dispatch =>
    axios.post(`/api/carts`)
    .then(res => {
      dispatch(addCart(res.data))
    }).catch(console.error)

export const addProductToCart = (cid, productInfo) =>
  dispatch =>
    axios.put(`/api/carts/${cid}`, productInfo)
    .then(res => {
      dispatch(addProd(res.data))
    }).catch(console.error)

export const deleteCart = () =>
  dispatch =>
    axios.delete(`/api/carts`)
    .then(res => {
      dispatch(delCart(res.data))
    }).catch(console.error)
