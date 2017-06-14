import axios from 'axios'
import { browserHistory } from 'react-router'

/* ------------------    ACTIONS    --------------------- */

const GET_REVIEWS_BY_PRODUCT = 'GET_REVIEWS_BY_PRODUCT'
const GET_REVIEWS_BY_USER = 'GET_REVIEWS_BY_USER'

/* --------------    ACTION CREATORS    ----------------- */

const getByProduct = (reviews) => ({ type: GET_REVIEWS_BY_PRODUCT, reviews })
const getByUser = (reviews) => ({ type: GET_REVIEWS_BY_USER, reviews })

/* ------------------    REDUCER    --------------------- */

export default function reducer(state = null, action) {
  switch (action.type) {
  case GET_REVIEWS_BY_PRODUCT:
    return action.reviews
  case GET_REVIEWS_BY_USER:
    return action.reviews
  default:
    return state
  }
}

/* ------------       DISPATCHERS     ------------------ */

const resToData = res => res.data

export const getReviewsByProduct = (pid) => dispatch => {
  return axios.get(`/api/reviews?product_id=${pid}`)
    .then(resToData)
    .then(reviews => {
      dispatch(getByProduct(reviews))
    })
    .catch(console.error)
}

export const getReviewsByUser = (uid) => dispatch => {
  return axios.get(`/api/reviews?user_id=${uid}`)
    .then(resToData)
    .then(reviews => {
      dispatch(getByProduct(reviews))
    })
    .catch(console.error)
}
