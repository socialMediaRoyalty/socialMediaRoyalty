import axios from 'axios'
import { browserHistory } from 'react-router'

/* ------------------    ACTIONS    --------------------- */

const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES'
const SELECT_CATEGORY = 'SELECT_CATEGORY'
const ADD_CATEGORY = 'ADD_CATEGORY'
const UPDATE_CATEGORY = 'UPDATE_CATEGORY'
const REMOVE_CATEGORY = 'DELETE_CATEGORY'

/* --------------    ACTION CREATORS    ----------------- */

const get = (categories) => ({ type: GET_ALL_CATEGORIES, categories })
const add = (category) => ({ type: ADD_CATEGORY, category })
const update = (category) => ({type: UPDATE_CATEGORY, category})
const remove = () => ({type: REMOVE_CATEGORY})

/* ------------------    REDUCER    --------------------- */

export default function reducer(state = null, action) {
  switch (action.type) {
  case GET_ALL_CATEGORIES:
    return action.categories
  case ADD_CATEGORY:
    return action.category
  case UPDATE_CATEGORY:
    return action.category
  case REMOVE_CATEGORY:
    return action.category
  default:
    return state
  }
}

/* ------------       DISPATCHERS     ------------------ */

const resToData = res => res.data

export const getAllCategories = () => dispatch => axios.get('/api/categories')
    .then(resToData)
    .then(categories => {
      dispatch(get(categories))
    })
    .catch(console.error)

// categoryInfo is an object of all the category information
export const addCategory = (categoryInfo) => dispatch => axios.post('/api/categories', categoryInfo)
    .then(resToData)
    .then(category => {
      dispatch(add(category))
    })
    .catch(console.error)

export const updateCategory = (categoryInfo) => dispatch => axios.put(`/api/categories/${categoryInfo.id}`, categoryInfo)
    .then(resToData)
    .then(category => {
      dispatch(update(category))
    })
    .catch(console.error)

export const removeCategory = (cid) => dispatch => axios.delete(`/api/categories/cid`)
    .then(() => {
      dispatch(remove())
    })
    .catch(console.error)
