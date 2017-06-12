import React from 'react'
import {connect} from 'react-redux'
import { Table, Button } from 'react-bootstrap'

import UserRow from '../components/UserRow'
import { fetchUser, updateUser, removeUser } from '../reducers/user'

/* -----------------    COMPONENT     ------------------ */

const Users = ({users, fetchUser, updateUser, removeUser}) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <h1>Users</h1>

        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Privileges</th>
              <th>Delete User</th>
            </tr>
          </thead>
          <tbody>
            { !users[0] ? null
              : users.map(user => {
                return (
                  <UserRow
                    key={user.id}
                    id={user.id}
                    user={user}
                    name={user.name}
                    email={user.email}
                    isAdmin={user.isAdmin}
                    removeUser={removeUser}
                    updateUser={updateUser}
                  />
                )
              })
            }
          </tbody>
        </Table>

      </div>
    </div>
  )
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({users}) => ({users})

const mapDispatch = { fetchUser, updateUser, removeUser }

export default connect(mapState, mapDispatch)(Users)
