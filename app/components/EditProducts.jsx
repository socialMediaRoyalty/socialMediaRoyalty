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

	handleSubmit(event) {
		event.preventDefault()
		console.log(this.state)
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
