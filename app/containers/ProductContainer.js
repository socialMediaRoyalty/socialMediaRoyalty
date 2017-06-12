import React from 'react'
import {connect} from 'react-redux'
import store from '../store'
import { getProductById } from '../reducers/product'

export const ProductContainer = ({product}) => {
  return (
    product && <div>
      <h1>This is Product Container</h1>
        <h2>Product Name: {product.name}</h2>
        <h2>Product Description: {product.description}</h2>
        <h2>Product Price: {product.price}</h2>
        <h2>Product quantity: {product.quantity}</h2>
    </div>
  )
}

export default connect(
  ({ product }) => ({ product: product }), // state => ({}),
  {getProductById},
)(ProductContainer)
