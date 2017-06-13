import axios from 'axios'
import { browserHistory } from 'react-router'

/* ------------------    ACTIONS    --------------------- */

const NEW_USER = 'NEW_USER'

/* --------------    ACTION CREATORS    ----------------- */

const newUser = (user) => ({
    type: NEW_USER,
    user
})

/* ------------------    REDUCER    --------------------- */

export default function reducer(state = null, action) {
    switch (action.type) {
        case NEW_USER:
            return action.user
        default:
            return state
    }
}

/* ------------------    DISPATCHERS    --------------------- */

export const createNewUser = (credentials) => dispatch => {
    return axios.post('api/users/', credentials)
        .then(resToData)
        .then(user => {
            dispatch(newUser(user))
        })
        .catch(console.error)
}