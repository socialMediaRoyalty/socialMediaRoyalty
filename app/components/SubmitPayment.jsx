import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createNewOrder } from 'APP/app/reducers/orders'
import { Form, Button } from 'react-bootstrap'

export class SubmitPayment extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillReceiveProps(newProps, oldProps) {
    this.setState({
      orders: newProps.orders
    })
  }

  handleSubmit(event) { 
    event.preventDefault()
    console.log('submitted')
    this.props.createNewOrder()
  }


  render() {
    return (
			<Form>
				<Button onClick={this.handleSubmit}>
        Submit Payment
				</Button> 
			</Form>

    )
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({}) => ({})

const mapDispatch = { createNewOrder }

export default connect(mapState, mapDispatch)(SubmitPayment)
