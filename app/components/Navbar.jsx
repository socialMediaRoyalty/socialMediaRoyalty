import React from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'

export const Navigation = ({ login }) => (

  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">Home</a>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <NavDropdown eventKey={1} title="Categories" id="basic-nav-dropdown">
        <MenuItem eventKey={1.1}>Action</MenuItem>
        <MenuItem eventKey={1.2}>Another action</MenuItem>
        <MenuItem eventKey={1.3}>Something else here</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey={1.4}>Separated link</MenuItem>
      </NavDropdown>
      <NavItem eventKey={2} href="#">Sign in</NavItem>
      <NavItem eventKey={3} href="#">Cart</NavItem>
    </Nav>
  </Navbar>
)

import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect(
  state => ({}),
  {login},
)(Navigation)
