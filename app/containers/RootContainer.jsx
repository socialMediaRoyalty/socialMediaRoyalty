import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import FeaturedProducts from '../components/FeaturedProducts'
import Footer from '../components/Footer'
import CategoriesContainer from './CategoriesContainer'

export default class RootContainer extends Component {
  componentDidMount() {
    // this.nextJoke()
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <h1>Social Media Royalty</h1>
          <Navbar />
        </div>
        <div className="row">
          <Sidebar />
          <CategoriesContainer />
          { this.props.children }
          <Footer />
        </div>
      </div>
    )
  }
}
