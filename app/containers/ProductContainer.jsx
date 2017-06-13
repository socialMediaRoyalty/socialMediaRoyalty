import React from 'react'
import {connect} from 'react-redux'
import {browserHistory, Link} from 'react-router'
import store from '../store'
import {Button, Image, Well, FieldGroup, FormGroup, FormControl, Panel, Table, ListGroup, ListGroupItem} from 'react-bootstrap'

export class ProductContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 1,
      dirty: false,
      warning: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.onAddToCart = this.onAddToCart.bind(this)
  }

  handleChange(evt) {
    const value = parseInt(evt.target.value)
    this.setState({
      quantity: value,
      dirty: true
    })
  }

  onAddToCart(evt) {
    evt.preventDefault()
    console.log('quantity>>>', this.state.quantity)
    // add product to cart
    this.setState({
      quantity: 0,
      dirty: false
    })
  }

  render() {
    const product = this.props.product
    const dirty = this.state.dirty
    const quantity = this.state.quantity
    let warning = ''

    if ((!quantity || typeof quantity !== 'number') && dirty) warning = 'You must enter a name'
    else if (product && quantity > product.quantity) warning = 'Quantity must not be greater than available quantity'

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
                    <FormControl type="text"
                                 onChange={this.handleChange}
                                 placeholder="Enter Quantity" />
                  </FormGroup>
                </form>
                <Button bsStyle="success"
                        onClick={this.onAddToCart}
                        disabled={!!warning || !this.state.quantity}>Add To Cart</Button>
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
                    product.reviews && product.reviews.map(review => {
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
}

const mapStateToProps = (state) => {
  return {
    product: state.product.product,
    user: state.auth
  }
}

export default connect(
  mapStateToProps,
  {},
)(ProductContainer)
