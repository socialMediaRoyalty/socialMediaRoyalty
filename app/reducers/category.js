import axios from 'axios'
import { browserHistory } from 'react-router'

/* ------------------    ACTIONS    --------------------- */

const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES'
const SELECT_CATEGORY = 'SELECT_CATEGORY' // am I used? -- KHLP
const ADD_CATEGORY = 'ADD_CATEGORY'
const UPDATE_CATEGORY = 'UPDATE_CATEGORY'
const REMOVE_CATEGORY = 'DELETE_CATEGORY'

/* --------------    ACTION CREATORS    ----------------- */

const get = (categories) => ({ type: GET_ALL_CATEGORIES, categories })
const add = (category) => ({ type: ADD_CATEGORY, category })
const update = (category) => ({type: UPDATE_CATEGORY, category})
const remove = () => ({type: REMOVE_CATEGORY}) // take in id to remove -- KHLP

/* ------------------    REDUCER    --------------------- */

export default function reducer(state = null, action) { // set initial state and always return all categories -- KHLP
  switch (action.type) {
  case GET_ALL_CATEGORIES:
    return action.categories
  case ADD_CATEGORY: // expect you to concat to category array that exists
    return action.category
  case UPDATE_CATEGORY: // expect you to update correct category in category array that exists
    return action.category
  case REMOVE_CATEGORY:
    return action.category // expect you to remove this category from category array that exists
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
      dispatch(remove()) // finish me :D, remove(cid) -- KHLP
    })
    .catch(console.error)
