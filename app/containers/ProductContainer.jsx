import React from 'react'
import {connect} from 'react-redux'
import {browserHistory, Link} from 'react-router'
import store from '../store'
import {findCartForUser, addProductToCart} from '../reducers/carts'
import {Button, Image, Well, FieldGroup, FormGroup, FormControl, Panel, Table, ListGroup, ListGroupItem} from 'react-bootstrap'

export class ProductContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: null,
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
    const productInfo = {
      productId: this.props.product.id,
      quantity: this.state.quantity
    }
    // find the correct cart for signed in user
    const userId = this.props.user.id
    store.dispatch(findCartForUser(userId))

    // add product to the cart
    if (this.props.carts.length > 0) {
      const cart = this.props.carts[0]
      store.dispatch(addProductToCart(cart.id, productInfo))
    }
    this.setState({
      quantity: null,
      dirty: false
    })
  }

  render() {
    const product = this.props.product
    const dirty = this.state.dirty
    const quantity = this.state.quantity
    let warning = ''

    if ((!quantity || typeof quantity !== 'number') && dirty) warning = 'You must enter a name'
    else if (product && (quantity > product.quantity || quantity < 1)) warning = 'Quantity must not be greater than available quantity'

    return (
      product && <div key={product.id}>
        <Table striped bordered={false} condensed hover>
          <tbody>
          <tr>
            <td>
              <Image className="prodImg" src={product.imageUrl} />
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
    carts: state.carts,
    user: state.auth
  }
}

export default connect(
  mapStateToProps,
  {},
)(ProductContainer)
