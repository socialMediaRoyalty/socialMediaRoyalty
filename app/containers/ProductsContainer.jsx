import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import store from '../store'

import {Grid, Row, Col, Thumbnail, Button, Collapse, Well} from 'react-bootstrap'

import { getAllProducts } from '../reducers/product'

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

export default connect(
  ({ product }) => ({ products: product }),
  {getAllProducts},
)(ProductsContainer)

/* ========= class version ==

 export class ProductsContainer extends React.Component {
 constructor(props) {
 super(props)
 // products = props.products
 this.state = {products: this.props.products}
 console.log('>>>>>>>>>>', this.props)
 }
 render() {
 const products = this.state.products
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
 <p>{product.price}</p>
 <p>
 <Button onClick={() => this.setState({ open: !this.state.open })}>
 Description
 </Button>
 <Collapse in={this.state.open}>
 <div>
 <Well>
 Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
 Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
 </Well>
 </div>
 </Collapse>
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
 }

 export default connect(
 ({ product }) => ({ products: product }),
 {getAllProducts},
 )(ProductsContainer)

 */
