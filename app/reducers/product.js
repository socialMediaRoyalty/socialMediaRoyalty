import axios from 'axios'
import { browserHistory } from 'react-router'

/* ------------------    ACTIONS    --------------------- */

const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const GET_PRODUCT_BY_ID = 'GET_PRODUCT_BY_ID'
const GET_PRODUCT_BY_CATEGORY = 'GET_PRODUCT_BY_CATEGORY'
const ADD_PRODUCT = 'ADD_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
const REMOVE_PRODUCT = 'DELETE_PRODUCT'

/* --------------    ACTION CREATORS    ----------------- */

const get = (products) => ({ type: GET_ALL_PRODUCTS, products })
const getById = (product) => ({ type: GET_PRODUCT_BY_ID, product })
const getByCategory =(cid) => ({type: GET_PRODUCT_BY_CATEGORY, cid})
const add = (product) => ({ type: ADD_PRODUCT, product })
const update = (product) => ({type: UPDATE_PRODUCT, product})
const remove = () => ({type: REMOVE_PRODUCT})

/* ------------------    REDUCER    --------------------- */

export default function reducer(state = null, action) {
  switch (action.type) {
  case GET_ALL_PRODUCTS:
    return action.products
  case GET_PRODUCT_BY_ID:
    return action.product
  case GET_PRODUCT_BY_CATEGORY:
    return action.products
  case ADD_PRODUCT:
    return action.product
  case UPDATE_PRODUCT:
    return action.product
  case REMOVE_PRODUCT:
    return action.product
  default:
    return state
  }
}

/* ------------       DISPATCHERS     ------------------ */

const resToData = res => res.data

export const getAllProducts = () => dispatch => {
  return axios.get('/api/products')
    .then(resToData)
    .then(products => {
      dispatch(get(products))
    })
    .catch(console.error)
}

export const getProductById = (pid) => dispatch => {
  return axios.get(`/api/products/${pid}`)
    .then(resToData)
    .then(product => {
      dispatch(getById(product))
    })
    .catch(console.error)
}

// need help on query
export const getProductByCategory = (cid) => dispatch => {
  return axios.get(`/api/products?categoryId=${cid}`)
    .then(resToData)
    .then(prodcuts => {
      dispatch(getByCategory(cid))
    })
    .catch(console.error)
}

// productInfo is an object of all the product information
export const addProduct = (productInfo) => dispatch => {
  return axios.post('/api/products', productInfo)
    .then(resToData)
    .then(product => {
      dispatch(add(product))
    })
    .catch(console.error)
}

export const updateProduct = (productInfo) => dispatch => {
  return axios.put(`/api/products/${productInfo.id}`, productInfo)
    .then(resToData)
    .then(product => {
      dispatch(update(product))
    })
    .catch(console.error)
}

export const removeProduct = (pid) => dispatch => {
  return axios.delete(`/api/products/pid`)
    .then(() => {
      dispatch(remove())
    })
    .catch(console.error)
}
