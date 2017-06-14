import React from 'react'
import {connect} from 'react-redux'
import store from '../store'
import {Link} from 'react-router'

import {Carousel} from 'react-bootstrap'

export const HomeContainer = (props) => {
  const products = props.products
  return (
    <div>
      <Carousel id="carousel">
          {
            products && products.map((product, idx) => {
              if (idx === 4) return
              return (
                <Carousel.Item key={product.id}>
                  <Link to = {`/products/${product.id}`}>
                    <img id="CarImg" width={600} height={300} alt="600x300" src={product.imageUrl}/>
                  </Link>
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

const mapStateToProps = (state) => {
  return {
    products: state.product.products
  }
}

export default connect(
  mapStateToProps,
  {},
)(HomeContainer)
