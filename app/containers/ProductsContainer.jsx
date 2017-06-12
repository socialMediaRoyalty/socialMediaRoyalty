import React from 'react'
import {connect} from 'react-redux'
import store from '../store'
import { getAllProducts } from '../reducers/product'

export const CategoriesContainer = ({products}) => {
  return (
    <div>
      <h1>This is Products Container</h1>
      {
        products && products.map(product => {
          return <h3 key={product.name}> >> {product.name}</h3>
        })
      }
    </div>
  )
}

export default connect(
  ({ product }) => ({ products: product }), // state => ({}),
  {getAllProducts},
)(CategoriesContainer)
