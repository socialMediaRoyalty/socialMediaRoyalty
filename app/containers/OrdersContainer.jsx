import React, { Component } from 'react'
import { connect } from 'react-redux'
import {fetchAllUsers} from 'APP/app/reducers/orders'
import store from 'APP/app/store'
import { Table } from 'react-bootstrap'

export class Orders extends Component {
  constructor(props) {
    super(props)
    this.state= store.getState()
  }

  render() {
    return (

      <div>
            {console.log('why?', this.props.orders)}
      <Table>
      <thead>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
          <th>Purchased On</th>
        </tr>
        </thead>
        <tbody>
        {this.props.orders && this.props.orders.map(order => {
          return <tr>
            <td key={order.id}>{order.product.name}</td>
            <td key={order.id}>{order.purchasedPrice}</td>
            <td key={order.id}>{order.product.quantity}</td>
            <td key={order.id}>{order.purchasedPrice * order.product.quantity}</td>
            <td key={order.id}>{order.created_at.toString()}</td>
          </tr>
        })}
        </tbody>
      </Table>
      </div>
    )
  }
}

const mapState = ({orders}) => ({orders})

const mapDispatch ={ fetchAllUsers }

export default connect(mapState, mapDispatch)(Orders)
