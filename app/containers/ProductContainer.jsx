import React from 'react'
import {connect} from 'react-redux'
import {browserHistory, Link} from 'react-router'
import store from '../store'
import {Button, Image, Well, FieldGroup, FormGroup, FormControl, Panel, Table, ListGroup, ListGroupItem} from 'react-bootstrap'
import { getProductById } from '../reducers/product'

export const ProductContainer = (props) => {
  const product = props.product
  const reviews = props.reviews
  return (
    product && <div key={product.id}>
      <Table striped bordered={false} condensed hover>
        <tbody>
        <tr>
          <td>
            <Image src={product.imageUrl} />
          </td>
          <td>
            <Well bsSize="large">
              <h2>{product.name}</h2>
              <h1>${product.price}</h1>
              <h5>Available Quantity: {product.quantity}</h5>
              <form>
                  <FormGroup>
                    <FormControl type="text" placeholder="Enter Quantity" />
                  </FormGroup>
              </form>
              <Button bsStyle="success">Add To Cart</Button>
            </Well>
          </td>
        </tr>
        <tr>
          <td colSpan="2">
            <Panel header="DESCRIPTION" bsStyle="info">
              <h4>{product.description}</h4>
            </Panel>
          </td>
        </tr>
        <tr>
          <td colSpan="2">
            <Panel header="REVIEWS" bsStyle="info">
              <ListGroup>
                {
                  reviews && reviews.map(review => {
                    return (
                      <ListGroupItem key={review.id}>
                        <h4>User ID: {review.user_id} Rating: {review.rating} Date: {review.date.slice(0, 10)}</h4>
                        <p>{review.comment}</p>
                      </ListGroupItem>
                    )
                  })
                }
              </ListGroup>
            </Panel>
          </td>
        </tr>
        </tbody>
      </Table>
    </div>
  )
}

export default connect(
  ({ product, reviews }) => ({ product, reviews }),
  {getProductById},
)(ProductContainer)
