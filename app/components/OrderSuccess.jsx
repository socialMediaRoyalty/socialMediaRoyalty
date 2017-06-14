import React from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'

const SuccessPage = (props) => {
  return (
    <div>
      <h2>Order Submitted Successfully!</h2>
      {props.orders.products && props.orders.products.map(product =>
        <Grid>
        <Row>
        <Col lg={6} key={product.id}> <h4> Product: {product.name}</h4></Col>
         <Col lg={6} key={product.quantity}><h4>Quantity: {product.quantity}</h4></Col>
         <Col lg={6} key={product.price}><h4>Price: ${product.price}</h4></Col>
         <Col lg={6} key={product.description}><h4>Total: ${product.price * product.quantity}</h4></Col>
         </Row>
         </Grid>
      )}
      </div>
	)
}

const mapState = ({orders}) => ({orders})

// const mapDispatch = { createNewOrder }

export default connect(mapState)(SuccessPage)
