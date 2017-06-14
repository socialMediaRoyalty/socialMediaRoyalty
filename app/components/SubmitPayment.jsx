import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { createNewOrder } from 'APP/app/reducers/orders'
import { Grid, Col, Row, Radio, Form, Button, FormControl, FormGroup, ControlLabel } from 'react-bootstrap'
import store from '../store'

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
    this.props.createNewOrder()
    console.log('state', this.props)
    browserHistory.push(`/submitted`)
  }
  render() {
    return (
<div>
        <h3>Payment Option</h3>
        <img src="https://www.paypalobjects.com/webstatic/en_US/i/btn/png/gold-rect-paypalcheckout-60px.png" alt="PayPal Checkout"/>
        <Grid>
        <Row>
        <h3>Shipping Information</h3>
        </Row>
        <Form inline>
        <FormGroup controlId="formInlineName">
          <ControlLabel>Address</ControlLabel>
           {' '}
          <FormControl type="text"/>
        </FormGroup>
         {' '}
        <FormGroup controlId="formInlineName">
          <ControlLabel>Apartment / Suite / Unit / Bldg #</ControlLabel>
           {' '}
          <FormControl type="text"/>
        </FormGroup>
        </Form>
        <Form inline>
        <FormGroup controlId="formInlineName">
          <ControlLabel>Zip Code</ControlLabel>
           {' '}
          <FormControl type="text"/>
        </FormGroup>
         {' '}
        <FormGroup controlId="formInlineName">
          <ControlLabel>City</ControlLabel>
           {' '}
          <FormControl type="text"/>
        </FormGroup>
         {' '}
        <FormGroup controlId="formInlineName">
          <ControlLabel>State</ControlLabel>
           {' '}
          <FormControl type="text"/>
        </FormGroup>
        </Form>
				<Button onClick={this.handleSubmit}>
        Submit Order
				</Button>
        </Grid>
</div>

    )
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({orders}) => ({orders})

const mapDispatch = { createNewOrder }

export default connect(mapState, mapDispatch)(SubmitPayment)
