import React from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, FormGroup, FormControl, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { login } from 'APP/app/reducers/auth'
import { LinkContainer } from 'react-router-bootstrap'
import Login from './Login'
import WhoAmI from './WhoAmI'

export const Navigation = ({ auth, login, category }) => (

  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/">Home</Link>
      </Navbar.Brand>
    </Navbar.Header>

    <Nav>

      <NavDropdown eventKey={1} title="Categories" id="basic-nav-dropdown">
        {
          category && category.map(categ =>
            <LinkContainer to={`/products/categories/${categ.id}`}>
              <MenuItem
                key={categ.id}>
                {categ.name}
              </MenuItem>
            </LinkContainer>
            )
        }
        <MenuItem divider />
        <LinkContainer to="/products">
          <MenuItem>All Products</MenuItem>
        </LinkContainer>
      </NavDropdown>

      {
        !auth ? null
        :<LinkContainer to="/profile">
          <NavItem>My Account</NavItem>
        </LinkContainer>
      }


      { !(auth && auth.isAdmin) ? null
        : <NavDropdown eventKey={4} title="Admin" id="basic-nav-dropdown">

            <LinkContainer to="/admin/users">
              <MenuItem eventKey={4.1}>Users</MenuItem>
            </LinkContainer>

            <MenuItem eventKey={4.2}>Orders</MenuItem>
            <MenuItem eventKey={4.3}>Products</MenuItem>
          </NavDropdown>
      }

      <NavItem eventKey={2} href="#">Cart</NavItem>

      <Navbar.Form pullRight>
        <FormGroup>
          {auth ? <WhoAmI/> : <Login/>}
        </FormGroup>
      </Navbar.Form>

    </Nav>

  </Navbar>
)

/* -----------------    CONTAINER     ------------------ */

const mapState = ({auth, login, category}) => ({auth, login, category})

const mapDispatch = {}

export default connect(mapState, mapDispatch)(Navigation)
