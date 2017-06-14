import React from 'react'
import {connect} from 'react-redux'
import {browserHistory, Link} from 'react-router'
import store from '../store'
import {Button, Image, Well, FieldGroup, Table, Thumbnail} from 'react-bootstrap'

export class ProductContainer extends React.Component {
  constructor(props) {
    super(props)

    this.submitOrder = this.submitOrder.bind(this)
  }

  submitOrder(evt) {
    evt.preventDefault()
    console.log('this is submit order handler')
  }

  render() {
    const products = this.props.cart.products
    return (
      this.props.cart && <div>
        <Well><h1>Item(s) in Your Cart</h1></Well>

        <Table striped bordered condensed hover>
          <tbody>
          {
            products && products.map(product => {
              return (
                <tr key={product.id}>
                  <td><Thumbnail href="#" alt="100x100" src={product.imageUrl} /></td>
                  <td><h3>{product.name}</h3></td>
                  <td><h3>Qty:</h3>
                      <h3> {product.cart_detail.quantity} </h3></td>
                  <td><h3>{product.price * product.cart_detail.quantity}</h3></td>
                </tr>
              )
            })
          }
          <tr>
            <td colSpan="3"><h1>Total</h1></td>
            <td>${getTotal(products)}</td>
          </tr>
          <tr>
            <td colSpan="2"> </td>
            <td colSpan="2">
              <Button bsStyle="success">Submit Order</Button>
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
    cart: state.carts,
    user: state.auth
  }
}

export default connect(
  mapStateToProps,
  {},
)(ProductContainer)

// helper function to calculate total
const getTotal = (products = []) => {
  let total = 0
  products.forEach(product => {
    total += product.price * product.cart_detail.quantity
  })
  return total
}
