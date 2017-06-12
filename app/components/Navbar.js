import React from 'react'
import {Link} from 'react-router'

export const Navbar = ({ login }) => (
  <div className="col-lg-12">
    <button className="btn btn-success">Hello</button>
    <h1>This is navbar component</h1>
    <ul>
      <li><Link to="/categories">CATEGORIES </Link></li>
      <li><Link to="/products">PRODUCTS </Link></li>
    </ul>
  </div>
)

import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect(
  state => ({}),
  {login},
)(Navbar)
