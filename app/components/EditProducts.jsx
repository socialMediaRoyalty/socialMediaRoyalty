import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, FormGroup, FormControl, ControlLabel, Grid, Col, Row, Button} from 'react-bootstrap'

export default class EditProducts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      quantity: '',
      price: '',
      image: ''
    }
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleDesChange = this.handleDesChange.bind(this)
    this.handleQuantityChange = this.handleQuantityChange.bind(this)
    this.handlePriceChange = this.handlePriceChange.bind(this)
    this.handleImageChange = this.handleImageChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleNameChange(event) {
    this.setState({
      name: event.target.value
    })
  }

  handleDesChange(event) {
    this.setState({
      description: event.target.value
    })
  }

  handleQuantityChange(event) {
    this.setState({
      quantity: event.target.value
    })
  }

  handlePriceChange(event) {
    this.setState({
      price: event.target.value
    })
  }

  handleImageChange(event) {
    this.setState({
      image: event.target.value
    })
  }

  handleSubmit(event) {
    console.log(this.state)
    event.preventDefault()
		// const name = this.state.name
		// const description = this.state.description
		// const quantity = this.state.quantity
		// const price = this.state.price
		// const image = this.state.image
    this.props.addProduct(this.state)
  }

  render() {
    return (
			<div>
			<Form onSubmit={this.handleSubmit}>
			<FormGroup controlId="formInlineName">
        <ControlLabel>Product Name</ControlLabel>
           {' '}
      <FormControl type="text" onChange={this.handleNameChange}/>
      </FormGroup>
			<FormGroup controlId="formInlineName">
        <ControlLabel>Product Description</ControlLabel>
           {' '}
      <FormControl type="text" onChange={this.handleDesChange}/>
			</FormGroup>
			<FormGroup controlId="formInlineName">
        <ControlLabel>Quantity</ControlLabel>
           {' '}
      <FormControl type="text" onChange={this.handleQuantityChange}/>
      </FormGroup>
			<FormGroup controlId="formInlineName">
        <ControlLabel>Price</ControlLabel>
           {' '}
      <FormControl type="text" onChange={this.handlePriceChange}/>
      </FormGroup>
			<FormGroup controlId="formInlineName">
        <ControlLabel>Image URL</ControlLabel>
           {' '}
      <FormControl type="text" onChange={this.handleImageChange}/>
      </FormGroup>
			<Button bsStyle="default">Submit</Button>
			</Form>
			</div>
    )
  }
}
