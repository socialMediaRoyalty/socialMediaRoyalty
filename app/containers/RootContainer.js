import React, { Component } from 'react'
import {connect} from 'react-redux'
import store from '../store'

import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

import getAllProducts from '../reducers/product'

export default class RootContainer extends Component {
  componentDidMount() {
    // this.nextJoke()
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <Navbar />
        </div>
        <div className="row">
          <Sidebar />
          {
            this.props.children
          }
        </div>
      </div>
    )
  }
}

// export default connect(
//   ({ product }) => ({ products: product }), // state => ({}),
//   {getAllProducts},
// )(RootContainer)
