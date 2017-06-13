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
      <NavDropdown title="Categories" id="basic-nav-dropdown">
        {
          category && category.map((categ, idx) =>
            <LinkContainer key={idx} to={`/products/categories/${categ.id}`}>
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

      {
        !(auth && auth.isAdmin) ? null
        : <NavDropdown title="Admin" id="basic-nav-dropdown">

            <LinkContainer to="/admin/users">
              <MenuItem>Users</MenuItem>
            </LinkContainer>

          </NavDropdown>
      }

      <NavItem href="#">Cart</NavItem>

          <LinkContainer to="/signup">
          <NavItem>Sign Up</NavItem>
          </LinkContainer>
    </Nav>

    <Navbar.Form>
        {
          auth ? <WhoAmI/> :
          <Login/>
      }
    </Navbar.Form>

  </Navbar>
)

/* -----------------    CONTAINER     ------------------ */

const mapState = ({auth, login, category}) => ({auth, login, category})

const mapDispatch = {}

export default connect(mapState, mapDispatch)(Navigation)
