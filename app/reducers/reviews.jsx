import axios from 'axios'
import { browserHistory } from 'react-router'

/* ------------------    ACTIONS    --------------------- */

const GET_REVIEWS_BY_PRODUCT = 'GET_REVIEWS_BY_PRODUCT'

/* --------------    ACTION CREATORS    ----------------- */

const getByProduct = (reviews) => ({ type: GET_REVIEWS_BY_PRODUCT, reviews })

/* ------------------    REDUCER    --------------------- */

export default function reducer(state = null, action) {
  switch (action.type) {
  case GET_REVIEWS_BY_PRODUCT:
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
