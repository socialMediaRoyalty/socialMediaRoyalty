import React from 'react'

const Checkout = () => {
  return (
    <form action="/your-server-side-code" method="POST">
      <script
        src="https://checkout.stripe.com/checkout.js" class="stripe-button"
        data-key="pk_test_9FdwUswCvHNhoPOuaC5EumIW"
        data-amount="999"
        data-name="Stripe.com"
        data-description="Widget"
        data-image="https://stripe.com/img/documentation/checkout/marketplace.png"
        data-locale="auto"
        data-zip-code="true">
      </script>
    </form>
  )
}

export default Checkout
