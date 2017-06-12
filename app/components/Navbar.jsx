import React from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import {connect} from 'react-redux'

import {login} from 'APP/app/reducers/auth'
export const Navigation = ({ auth, login }) => (

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
      { !auth ? <NavItem eventKey={2} href="#">Sign in</NavItem>
        : <NavItem eventKey={3} href="#">Account</NavItem>
      }
      <NavItem eventKey={4} href="#">Cart</NavItem>
    </Nav>
  </Navbar>
)



/* -----------------    CONTAINER     ------------------ */

const mapState = ({auth, login}) => ({auth, login})

const mapDispatch = {}

export default connect(mapState, mapDispatch)(Navigation)
