import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { getAllProducts } from 'APP/app/reducers/product'
import { Form, Grid, Col, Row, Thumbnail, Button, Collapse, Well } from 'react-bootstrap'
import store from 'APP/app/store'

export class Products extends Component {
  constructor(props) {
    super(props)
  }



  render() {
    return (
			<div>
      <Grid>
      <Row>
        {
					this.props.products && this.props.products.map(product => (
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
        ))}
      </Row>
      </Grid>
			<Link to={`/admin/editproducts`}>
				<Button bsStyle="default">Edit Products</Button>
			</Link>
			</div>
  )
  }
}

export default connect(
  ({ product }) => ({ products: product }),
  {getAllProducts},
)(Products)
