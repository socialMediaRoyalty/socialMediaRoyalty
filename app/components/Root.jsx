import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const Root = ({ children }) => (
  <div id="main" className="container-fluid">
    <h1>"Navbar Component"</h1>
    { children }
    <h1>"Footer Component"</h1>
  </div>
)

export default Root
