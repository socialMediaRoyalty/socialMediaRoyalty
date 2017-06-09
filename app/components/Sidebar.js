import React from 'react'

export const Sidebar = ({ login }) => (
  <div className="container">
    <div className="col-lg-3 col-md-3">
      <h3>This is sidebar component</h3>
      <h3>This is sidebar component</h3>
      <h3>This is sidebar component</h3>
      <h3>This is sidebar component</h3>
      <h3>This is sidebar component</h3>
      <h3>This is sidebar component</h3>
      <h3>This is sidebar component</h3>
    </div>
  </div>
)

import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect(
  state => ({}),
  {login},
)(Sidebar)
