import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Button } from 'react-bootstrap'
//import ContentEditable from 'react-contenteditable'
import { Link, browserHistory } from 'react-router'

import { fetchUser, updateUser, removeUser } from '../reducers/user'

/* -----------------    NESTED COMPONENT     ------------------ */

const ProfileRow =
  ({disableEdit, currentUser, handleChange, field, title}) => {
    const editStyle = {
      color: 'gray',
      border: '1px dashed lightblue'
    }

    const readStyle = {
      color: 'black'
    }

    return (
      <tr>
        <td><b>{title}</b></td>
        <td>
          <ContentEditable
            style={disableEdit ? readStyle : editStyle} {/* don't hard code styles in component add dynamic classes and put these styles in your css that you add to your index.html (the src) */}
            disabled={disableEdit}
            html={currentUser[field]}
            onChange={handleChange(field)}
          />
        </td>
      </tr>
    )
  }

/* -----------------  INFO FOR PROFILE ROW     ------------------ */

const profileData = [
  {field: 'name', title: 'Name'},
  {field: 'email', title: 'Email'},
  {field: 'address', title: 'Address'},
  {field: 'facebookLink', title: 'Facebook'},
  {field: 'instagramHandle', title: 'Instagram'},
  {field: 'twitterHandle', title: 'Twitter'},
  {field: 'snapChatHandle', title: 'SnapChat'}
]

/* -----------------    COMPONENT     ------------------ */

class Profile extends Component { // this on seems like a container to me -- KHLP
  constructor(props) {
    super(props)
    this.state = {
      currentUser: this.props.auth,
      disableEdit: true
    }
    this.handleEdit = this.handleEdit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillReceiveProps(newProps, oldProps) {
    this.setState({
      currentUser: newProps.auth,
      disableEdit: true
    })
  }

  handleEdit(event) {
    this.setState({
      disableEdit: false
    })
    event.preventDefault() // this is for submit because the browser does a refresh when you use a form submit. Not needed here -- KHLP
  }

  handleDelete(event) { // in backend make sure only admin or self, for front have logic where only admin (or potentially self) can see the button for this -- KHLP
    this.props.removeUser(this.auth.id)
    event.preventDefault() // delete me -- kHLP
  }

  handleChange(field) {
    return (event) => {
      console.log(event.target.value) // remove me -- KHLP
      const newState = Object.assign({}, this.state)
      newState.currentUser[field] = event.target.value
      this.setState(newState)
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.updateUser(this.state.currentUser.id, this.state.currentUser)
    this.setState({
      disableEdit: true
    })
  }

  render() { // this to be split into component and container -- KHLP
    const currentUser = this.state.currentUser
    if (!currentUser || !currentUser.id) return <div /> // this could also be in the 1 return statement as a ternary or something -- KHLP

    return (
    { (!currentUser || !currentUser.id) ? <div> No valid user </div> :
      <Profile {...this.state} onClick={this.handleEdit} />
    }
      <div className="container">
        <h2>Profile</h2>

        {
          this.state.disableEdit ?
            <Button
              bsStyle="info"
              bsSize="small"
              onClick={this.handleEdit}>
              Edit Profile
            </Button>
          : <Button
            bsStyle="success"
            bsSize="small"
            onClick={this.handleSubmit}>
            Save Changes
          </Button>
        }

        <Table hover>
          <tbody>
            {
              profileData.map(entry =>
                <ProfileRow
                  disableEdit={this.state.disableEdit}
                  currentUser={this.state.currentUser}
                  handleChange={this.handleChange}
                  field={entry.field}
                  title={entry.title}
                />
              )
            }
          </tbody>
        </Table>
      </div>
    )
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({auth}) => ({auth})

const mapDispatch = { fetchUser, updateUser, removeUser }

export default connect(mapState, mapDispatch)(Profile)
