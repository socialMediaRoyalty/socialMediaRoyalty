import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import FeaturedProducts from '../components/FeaturedProducts'

import CategoriesContainer from './CategoriesContainer'

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
          <CategoriesContainer />
        </div>
      </div>
    )
  }
}
