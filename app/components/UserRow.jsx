import React from 'react'
import { Table, Button } from 'react-bootstrap'

const UserRow =
  ({user, id, name, email, isAdmin, removeUser, updateUser}) => {
    const handleDelete = (event) => {
      removeUser(id)
      event.preventDefault()
    }

    const handleUpgrade = (event) => {
      const updatedInfo = { isAdmin: true }
      updateUser(id, updatedInfo)
      event.preventDefault()
    }

    return (
      <tr key={id}>
        <td>{id}</td>
        <td>{name}</td>
        <td>{email}</td>
        <td>
          {isAdmin ? 'Admin'
            : <Button
              onClick={handleUpgrade}
              >Upgrade</Button> }
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
