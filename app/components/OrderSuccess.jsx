import React from 'react'
import { connect } from 'react-redux'

const SuccessPage = (props) => {
  return (
    <div>
		<h2>Order Submitted</h2>
		{console.log(props)}
    </div>
	)
}

const mapState = ({orders}) => ({orders})

// const mapDispatch = { createNewOrder }

export default connect(mapState)(SuccessPage)
