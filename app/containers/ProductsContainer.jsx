import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import store from '../store'

import {Grid, Row, Col, Thumbnail, Button, Collapse, Well} from 'react-bootstrap'

export const ProductsContainer = (props) => {
  const products = props.products
  return (
    <div>
      <h1>This is Products Container</h1>
      <Grid>
        <Row>
          {
            products && products.map(product => (
              <Col xs={6} md={4} key={product.id}>
                <Thumbnail src={product.imageUrl} alt="242x200">
                  <h3>{product.name}</h3>
                  <p>{product.price}</p>
                  <p>
                    <Link to={`/products/${product.id}`}>
                      <Button bsStyle="default">View Detail</Button>
                    </Link>
                    <Button bsStyle="default">Add To Cart</Button>
                  </p>
                </Thumbnail>
              </Col>
            ))
          }
        </Row>
      </Grid>
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
)(ProductsContainer)
