import React from 'react'
import {connect} from 'react-redux'
import store from '../store'

import {Carousel} from 'react-bootstrap'

import { getAllProducts } from '../reducers/product'

export const HomeContainer = (props) => {
  const products = props.products
  return (
    <div>
      <h1>This is Home Container with Featured Products</h1>
      <Carousel>
          {
            products && products.map((product, idx) => {
              if (idx === 4) return
              return (
                <Carousel.Item key={product.id}>
                  <img width={600} height={300} alt="600x300" src={product.imageUrl}/>
                  <Carousel.Caption>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              )
            })
          }
      </Carousel>
    </div>
  )
}

export default connect(
  ({ product }) => ({ products: product }), // state => ({}),
  {getAllProducts},
)(HomeContainer)
