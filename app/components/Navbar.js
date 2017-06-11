import React from 'react'

export const Navbar = ({ login }) => (
  <div className="col-lg-12">
    <button className="btn btn-success">Hello</button>
    <h1>This is navbar component</h1>
  </div>
)

import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect(
  state => ({}),
  {login},
)(Navbar)
