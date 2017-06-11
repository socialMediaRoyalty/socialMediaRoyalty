import React from 'react'
import { Table, Button } from 'react-bootstrap'

const UserRow =
  ({id, name, email, isAdmin, removeUser, updateUser}) => {

    const handleDelete = (event) => {
      removeUser(id)
      event.preventDefault()
    }

    return (
      <tr key={id}>
        <td>{id}</td>
        <td>{name}</td>
        <td>{email}</td>
        <td>
          {isAdmin ? 'Admin'
            : 'False' }
        </td>
        <td>
          <Button
            bsStyle="danger"
            onClick={handleDelete}
            >X</Button>
        </td>
      </tr>
    )
  }

export default UserRow
