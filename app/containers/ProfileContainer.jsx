import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Button } from 'react-bootstrap'

import { fetchUser, updateUser, removeUser } from '../reducers/user'

/* -----------------    COMPONENT     ------------------ */

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleDelete = this.handleDelete.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleName = this.handleName.bind(this)
    this.handleCampus = this.handleCampus.bind(this)
    this.handleEmail = this.handleEmail.bind(this)
  }

  componentWillReceiveProps(newProps, oldProps) {
    this.setState(newProps.auth)
  }

  handleDelete(event) {
    this.props.removeUser(this.auth.id)
    event.preventDefault()
  }

  handleInput(field, event) {
    const value = event.target.value
    this.setState({
      [field]: value
    })
  }

  handleName(event) {
    this.handleInput('name', event)
  }

  handleEmail(event) {
    this.handleInput('email', event)
  }

  handleCampus(event) {
    this.handleInput('HomeCampusId', event)
  }

  handleSubmit(event) {
    this.props.sendUpdatedStudent(this.state)
    event.preventDefault()
  }

  render() {
    let currentUser = this.props.auth
    if (!currentUser || !currentUser.id) return <div />

    return (
      <div className="container">
        <h2 className="cool-font">Profile</h2>

        <Table bordered condensed hover>
          <tbody>
            <tr>
              <td>Name</td>
              <td>currentUser.name</td>
            </tr>
          </tbody>
        </Table>

        <button
          className="btn btn-primary"
          onClick={this.handleSubmit}
        >
          Update Profile
        </button>
        <button
          className="btn btn-danger"
          onClick={this.handleDelete}
        >
          Delete Account
        </button>
      </div>
    )
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({auth}) => ({auth})

const mapDispatch = { fetchUser, updateUser, removeUser }

export default connect(mapState, mapDispatch)(Profile)


        // <table className="table">
        //   <tbody>
        //     <tr>
        //       <td>Id</td>
        //       <td>
        //         {student.id}
        //       </td>
        //     </tr>
        //     <tr>
        //       <td>Name</td>
        //       <td>
        //         <ContentEditable
        //           html={student.name}
        //           onChange={this.handleName}
        //         />
        //       </td>
        //     </tr>
        //     <tr>
        //       <td>Email</td>
        //       <td>
        //         <ContentEditable
        //           html={student.email}
        //           onChange={this.handleEmail}
        //         />
        //       </td>
        //     </tr>
        //     <tr>
        //       <td>Home Campus</td>
        //       <td>
        //         <Link to={`/campus/${campus ? campus.id : ''}`}>
        //           {`${campus ? campus.name : ''}`}
        //         </Link>
        //       </td>
        //     </tr>
        //   </tbody>
        // </table>
