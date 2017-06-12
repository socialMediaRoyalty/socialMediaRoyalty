import React from 'react'
import {connect} from 'react-redux'
import store from '../store'
import { getAllCategories } from '../reducers/category'

export const CategoriesContainer = ({categories}) => {
  return (
    <div>
      <h1>This is Categories Container</h1>
      {
        categories && categories.map(category => {
          return <h3 key={category.name}> >> {category.name}</h3>
        })
      }
    </div>
  )
}

export default connect(
  ({ category }) => ({ categories: category }), // state => ({}),
  {getAllCategories},
)(CategoriesContainer)
