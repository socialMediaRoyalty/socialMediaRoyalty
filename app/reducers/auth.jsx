import axios from 'axios'
import { browserHistory } from 'react-router';

const AUTHENTICATED = 'AUTHENTICATED'
const LOGGED_IN = 'LOGGED_IN'

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
  dispatch => { console.log('inside login dispatch')
   return axios.post('/api/auth/login/local',
      {username, password})
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))
    }

export const signup = (email, password) => 
  dispatch => 
    axios.post('/api/users',
    {email, password})
          .then(() => {
            browserHistory.push('/')
            dispatch(whoami())
          })
      .catch(() => dispatch(whoami()))
      // .then(() => login(email, password))
      //.then(() => browserHistory.push('/'))
      // .catch(() => dispatch(whoami()))



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

