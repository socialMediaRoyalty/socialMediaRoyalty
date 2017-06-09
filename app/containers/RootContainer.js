import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import FeaturedProducts from '../components/FeaturedProducts'

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
          <FeaturedProducts />
        </div>
      </div>
    )
  }
}
