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
          return <h3> >> {category.name}</h3>
        })
      }
    </div>
  )
}

const mapStateToProps = function(state) {
  return {
    categories: store.dispatch(getAllCategories)
  }
}

export default connect(
  ({ category }) => ({ categories: category }), // state => ({}),
  {getAllCategories},
)(CategoriesContainer)
