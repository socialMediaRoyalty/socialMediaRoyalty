import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from '../store'
import { Table, Button } from 'react-bootstrap'
import ContentEditable from 'react-contenteditable'
import { Link, browserHistory } from 'react-router'

import { fetchUser, updateUser, removeUser } from '../reducers/user'
import {getReviewsByProduct, getReviewsByUser} from '../reducers/reviews'

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
            style={disableEdit ? readStyle : editStyle}
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

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: this.props.auth,
      reviews: this.props.reviews,
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
    event.preventDefault()
  }

  handleDelete(event) {
    this.props.removeUser(this.auth.id)
    event.preventDefault()
  }

  handleChange(field) {
    return (event) => {
      console.log(event.target.value)
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

  render() {
    const currentUser = this.state.currentUser
    if (!currentUser || !currentUser.id) return <div />

    return (
      <div className="container">
        <h2>Profile</h2>

        {
          this.state.disableEdit
            ? <Button
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
        {/*{*/}
        {/*this.state.reviews && this.state.reviews.map(review => (*/}
        {/*<Panel header={`${review.date} rating: ${review.rating}`} bsStyle="info" key={review.id}>*/}
        {/*{review.comment}*/}
        {/*</Panel>*/}
        {/*))*/}
        {/*}*/}
      </div>
    )
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({auth, reviews}) => ({auth, reviews})

const mapDispatch = { fetchUser, updateUser, removeUser }

export default connect(mapState, mapDispatch)(Profile)
