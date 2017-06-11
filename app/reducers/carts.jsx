import axios from 'axios'

/* -----------------    ACTIONS     ------------------ */

// const CREATE_CART = 'CREATE_CART'
const FETCH_CART = 'FETCH_CART'
const ADD_CART = 'ADD_CART'
const ADD_PRODUCT = 'ADD_PRODUCT'
const DELETE_CART = 'DELETE_CART'

/* ------------   ACTION CREATORS     ------------------ */

// const createCart = (cart) => ({type: CREATE_CART, cart})
const getCart = (cart) => ({type: FETCH_CART, cart})
const addCart = (cart) => ({type: ADD_CART, cart})
const addProd = (product) => ({type: ADD_PRODUCT, product})
const delCart = (cart) => ({type: DELETE_CART, cart})

/* ------------       INTIAL STATE     ------------------ */

const intialState = {
  carts: []
}

/* ------------       REDUCER     ------------------ */

export const reducer = (state = intialState, action) => {
  const newState = Object.assign({}, state)

  switch (action.type) {
  // case CREATE_CART:
  //   newState.cart = action.cart
  //   break
  case FETCH_CART:
    newState.cart = action.cart
    break
  case ADD_CART:
    newState.cart = action.cart
    break
  case ADD_PRODUCT:
    newState.product = action.product
    break
  case DELETE_CART:
    newState.cart = action.cart
    break
  default:
    return state
  }
  return newState
}

/* ------------       DISPATCHERS     ------------------ */

// export const makeCart = () => {
//   dispatch => {
//     axios.post(`/api/carts`)
//     .then(res => {
//       dispatch(addCart(res.data))
//     })
//   }
// }

export const fetchCart = () => {
  dispatch => {
    axios.get(`/api/carts`)
    .then(res => {
      dispatch(getCart(res.data))
    })
  }
}

export const saveCart = () => {
  dispatch => {
    axios.post(`/api/carts`)
    .then(res => {
      dispatch(addCart(res.data))
    })
  }
}

export const addProduct = () => {
  dispatch => {
    axios.post(`/api/carts`)
    .then(res => {
      dispatch(addProd(res.data))
    })
  }
}

export const deleteCart = () => {
  dispatch => {
    axios.delete(`/api/carts`)
    .then(res => {
      dispatch(delCart(res.data))
    })
  }
}
