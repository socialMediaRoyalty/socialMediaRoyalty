import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { connect } from 'react-redux'
import Login from './Login'
import WhoAmI from './WhoAmI'

export const Home = connect(
  ({ auth }) => ({ user: auth })
)(
  ({ user, children }) =>
    <div>
      <nav>
        {user ? <WhoAmI/> : <Login/>}
      </nav>
      {children}
    </div>
)
