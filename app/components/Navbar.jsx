import React from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router';
import { login } from 'APP/app/reducers/auth'

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
            <MenuItem eventKey={`1.${categ.id}`}>
              {categ.name}
            </MenuItem>)
        }
      </NavDropdown>

      { !auth ? <NavItem eventKey={2} href="#">Sign in</NavItem>
        : <NavItem eventKey={3} href="#">Account</NavItem>
      }

      { auth && auth.isAdmin ? <NavItem eventKey={4} href="#">Admin</NavItem>
        : null
      }

      <NavItem eventKey={5} href="#">Cart</NavItem>

    </Nav>

  </Navbar>
)



/* -----------------    CONTAINER     ------------------ */

const mapState = ({auth, login, category}) => ({auth, login, category})

const mapDispatch = {}

export default connect(mapState, mapDispatch)(Navigation)
