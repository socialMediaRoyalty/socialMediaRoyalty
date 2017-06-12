import React from 'react'
import {connect} from 'react-redux'
import store from '../store'

import {Grid, Row, Col, Thumbnail, Button} from 'react-bootstrap'

import { getAllProducts } from '../reducers/product'

export const CategoriesContainer = (props) => {
  const products = props.products
  return (
    <div>
      <h1>This is Products Container</h1>
      <Grid>
        <Row>
          {
            products && products.map(product => {
              return (
                  <Col xs={6} md={4} key={product.id}>
                    <Thumbnail src={product.imageUrl} alt="242x200">
                      <h3>{product.name}</h3>
                      <p>{product.description}</p>
                      <p>
                        <Button bsStyle="primary">Button</Button>&nbsp;
                        <Button bsStyle="default">Button</Button>
                      </p>
                    </Thumbnail>
                  </Col>
              )
            })
          }
        </Row>
      </Grid>
    </div>
  )
}

export default connect(
  ({ product }) => ({ products: product }), // state => ({}),
  {getAllProducts},
)(CategoriesContainer)
