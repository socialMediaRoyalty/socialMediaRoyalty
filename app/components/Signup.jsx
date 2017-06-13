import React from 'react'

export const Signup = ({ login }) => ( // export default -- KHLP
  <form onSubmit={evt => {
    evt.preventDefault()
    signup(evt.target.username.value, evt.target.password.value)
  } }>
    <input name="username" />
    <input name="password" type="password" />
    <input type="submit" value="Login" />
  </form>
)


