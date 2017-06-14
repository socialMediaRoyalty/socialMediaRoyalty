import {connect} from 'react-redux'
import React, {Component} from 'react'
import {signup} from '../reducers/auth'
import {Form, ControlLabel, FormGroup, Col, FormControl, Button} from 'react-bootstrap'

export class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
    this.onSignupSubmit = this.onSignupSubmit.bind(this)
    this.onEmailChange = this.onEmailChange.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
  }

  onSignupSubmit(event) {
    event.preventDefault()
    const email = this.state.email
    const password = this.state.password
    signup(email, password)
  }

  onEmailChange(event) {
    this.setState({
      email: event.target.value
    })
  }

  onPasswordChange(event) {
    this.setState({
      password: event.target.value
    })
  }

  render() {
    return (
      <Form horizontal onSubmit={this.onSignupSubmit}>
        <ControlLabel>Sign Up</ControlLabel>
        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={2}>
            Email
          </Col>
          <Col sm={10}>
            <FormControl
              type="text"
              value={this.state.email}
              placeholder="Enter Email"
              onChange={this.onEmailChange}
            />
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={2}>
            Password
          </Col>
          <Col sm={10}>
            <FormControl
              type="text"
              value={this.state.password}
              placeholder="Enter Password"
              onChange={this.onPasswordChange}
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button type="submit">
              Sign Up
            </Button>
          </Col>
        </FormGroup>
      </Form>
    )
  }
}

const mapState = {}

const mapDispatch = {signup}

export default connect(mapState, mapDispatch)(Signup)
