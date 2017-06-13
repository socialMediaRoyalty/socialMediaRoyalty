import React from 'react'
import {connect} from 'react-redux'
import store from '../store'
import { getAllCategories } from '../reducers/category'

export const CategoriesContainer = ({categories}) => { // destructuring!! Also, I am dumb and not a container
  return (
    <div>
      <h1>This is Categories Container</h1>
      {
        categories && categories.map(category => { // if we always expect categories and have initialState then I don't need `categories &&` -- KHLP
          return <h3 key={category.name /* I would expect this to be the id*/}> >> {category.name}</h3>
        })
      }
    </div>
  )
}

export default connect(
  ({ category }) => ({ categories: category }), // state => ({}),
  {getAllCategories}, // not used -- KHLP
)(CategoriesContainer)
