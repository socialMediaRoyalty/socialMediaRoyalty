import React, {Component} from 'react'
import {connect} from 'react-redux'
import { fetchAllUsers } from 'APP/app/reducers/user'

export const AllUsers = (props) => {
  return (
        <div>
				{console.log(props)}
        </div>
  )
}
