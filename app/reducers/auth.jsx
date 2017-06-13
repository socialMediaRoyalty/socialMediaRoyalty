import axios from 'axios'
import { browserHistory } from 'react-router';

const AUTHENTICATED = 'AUTHENTICATED'

/* --------------    ACTION CREATORS    ----------------- */

export const authenticated = user => ({
  type: AUTHENTICATED, 
  user
})

/* ------------------    REDUCER    --------------------- */

export default function reducer(state = null, action) {
  switch (action.type) {
    case AUTHENTICATED:
      return action.user
    } 
  return state
}

/* ------------------    DISPATCHERS    --------------------- */

export const login = (username, password) =>
  dispatch =>
    axios.post('/api/auth/login/local',
      {username, password})
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))

export const signup = (email, password) => 
    axios.post('/api/users',
    {email, password})
      .then(() => login(email, password))
      .catch(() => dispatch(whoami()))

export const logout = () =>
  dispatch =>
    axios.post('/api/auth/logout')
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))

export const whoami = () =>
  dispatch =>
    axios.get('/api/auth/whoami')
      .then(response => {
        const user = response.data
        dispatch(authenticated(user))
      })
      .catch(failed => dispatch(authenticated(null)))
