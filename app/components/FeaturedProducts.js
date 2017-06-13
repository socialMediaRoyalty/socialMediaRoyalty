import React from 'react'

export const FeaturedProducts = ({ login }) => (
    <div className="col-lg-9 col-md-9">
      <h1>This is Feature Products component</h1>
      <h1>This is Feature Products component</h1>
      <h1>This is Feature Products component</h1>
      <h1>This is Feature Products component</h1>
      <h1>This is Feature Products component</h1>
      <h1>This is Feature Products component</h1>
      <h1>This is Feature Products component</h1>
      <h1>This is Feature Products component</h1>
      <h1>This is Feature Products component</h1>
      <h1>This is Feature Products component</h1>
    </div>
)

import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect(
  state => ({}),
  {login},
)(FeaturedProducts)
