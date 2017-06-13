import React from 'react'
import {connect} from 'react-redux'
import store from '../store' // why am I here? -- KHLP

import {Carousel} from 'react-bootstrap'

import { getAllProducts } from '../reducers/product' // I am not needed - KHLP

export const HomeContainer = (props) => { // I am a home component and I am dumb. Also, destructure me ({products}) -- KHLP
  const products = props.products // if you only want 4 do that here instead of the map. Yes sending most popular from the back could be cool -- KHLP
  return (
    <div>
      <h1>This is Home Container with Featured Products</h1>
      <Carousel>
          {
            products && products.map((product, idx) => { // if you updated your reducers you wouldn't need this conditional. Also it could theoretically break because products is sometimes an object -- KHLP
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
  {getAllProducts}, // I am not needed - KHLP
)(HomeContainer) // connect homeComponent here
