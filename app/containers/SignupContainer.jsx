import {connect} from 'react-redux'
import React, {Component} from 'react'
import {signup} from '../reducers/auth'
import { browserHistory } from 'react-router';
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
    console.log('this.props', this.props)
  }

  onSignupSubmit(event) {
    event.preventDefault()
    const email = this.state.email
    const password = this.state.password
    this.props.signup(email, password)
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
      <Col xs={6} xsOffset={3}>
      <Form horizontal onSubmit={this.onSignupSubmit}>
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
        <FormGroup controlId="formHorizontalPassword">
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
      </Col> 
    )
  }
}
  
const mapState = null

const mapDispatch = {signup}

export default connect(mapState, mapDispatch)(Signup)
