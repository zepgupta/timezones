import update from 'immutability-helper'

import {
  SUBMIT_LOGIN,
  SUBMIT_CREATE_ACCOUNT,
  AUTH_SUCCESS,
  LOGOUT,

  GET_TIMEZONES,
  TIMEZONES_RECEIVED,
  CREATE_TIMEZONE,
  TIMEZONE_CREATED,
  EDIT_TIMEZONE,
  TIMEZONE_MODIFIED,
  DELETE_TIMEZONE,
  TIMEZONE_DELETED,
  SELECT_TIMEZONE,

  GET_USERS,
  USERS_RECEIVED,
  CREATE_USER,
  USER_CREATED,
  EDIT_USER,
  USER_MODIFIED,
  DELETE_USER,
  USER_DELETED,
  USER_MODIFIED_USER,

  SELECT_USER,

  ENTER_EDIT_MODE,
  EXIT_EDIT_MODE,
  ENTER_CREATE_MODE,
  EXIT_CREATE_MODE,

  AUTH_ERROR,
  SERVER_ERROR,
  CLIENT_ERROR,
  CLEAR_ERROR,

  REFRESH,

} from './actions'

const initialState =  { 
  session: {
    active: false,
    status: {
      editMode: false,
      createMode: false,
      busy: false,
      error: '',
    },
    profile: {
      id: null,
      firstName: '',
      lastName: '',
      role: '',
      email: '',
    }
  },
  users: {
    selected: null,
    list: []
  },
  timezones: {
    selected: null,
    list: []
  }
}
export default function sessionReducer(state = initialState, action) {
  let newState, updatedTimezones, updatedUsers
  switch(action.type) {

    case SUBMIT_LOGIN:
    case SUBMIT_CREATE_ACCOUNT:
      newState = update(state, {session:{status:{busy: {$set:true}}}})
      break
    case AUTH_SUCCESS:
      newState = update(state, {
        session: {
          active: {$set: true},
          status: {busy: {$set:false}},
          profile: {$set: action.profile}
        }
      })
      break

    case GET_TIMEZONES:
    case CREATE_TIMEZONE:
    case EDIT_TIMEZONE:
    case DELETE_TIMEZONE:     
    case GET_USERS:
    case CREATE_USER:
    case EDIT_USER:
    case DELETE_USER:
      newState = update(state, {session:{status:{busy: {$set:true}}}})
      break
    case USERS_RECEIVED:
      newState = update(state, {
        session:{status:{busy: {$set:false}}},
        users: {list: {$set: action.users}}
      })
      break
    case USER_CREATED:
      updatedUsers = [...state.users.list]
      updatedUsers.push(action.user)
      newState = update(state, {
        session:{status:{
          busy: {$set:false},
          createMode: {$set: false},
          editMode: {$set: false}}},
          users: {list: {$set: updatedUsers}}
        })
      break
    case USER_MODIFIED:
      updatedUsers = [...state.users.list].filter(u => u.id !== action.user.id)
      updatedUsers.push(action.user)
      newState = update(state, {
        session:{status:{
          busy: {$set:false},
          createMode: {$set: false},
          editMode: {$set: false}}},
          users: {list: {$set: updatedUsers}}
      })
      break
    case USER_DELETED:
      updatedUsers = state.users.list.filter(t => t.id !== state.users.selected)
      newState = update(state, {
        session:{status:{busy: {$set: false}}},
        users: {
          list: {$set: updatedUsers},
          selected: {$set: updatedUsers.length ? updatedUsers[0].id : null }}
      })
      break
    case USER_MODIFIED_USER:
      newState = update(state, {
        session:{
          profile:{$set: action.profile},
          status:{
            busy: {$set:false},
            createMode: {$set: false},
            editMode: {$set: false}}}
      })
      break
    case TIMEZONES_RECEIVED:
      newState = update(state, {
        session:{status:{busy: {$set: false}}},
        timezones: {
          list: {$set: action.timezones},
          selected: {$set: action.timezones.length ? action.timezones[0].id : null }}})
      break
    case TIMEZONE_MODIFIED:
      updatedTimezones = [...state.timezones.list].filter(t => t.id !== state.timezones.selected)
      updatedTimezones.push(action.timezone)
      newState = update(state, {
        session:{status:{
          busy: {$set: false},
          editMode: {$set: false}},
          createMode: {$set: false}},
        timezones: {
          list: {$set: updatedTimezones},
          selected: {$set: updatedTimezones.length ? updatedTimezones[0].id : null }}
        })
      break
    case TIMEZONE_CREATED:
      updatedTimezones = [...state.timezones.list, action.timezone]
      newState = update(state, {
      session:{
        status:{
          busy: {$set: false},
          createMode: {$set: false}}},
        timezones: {
          list: {$set: updatedTimezones},
          selected: {$set: updatedTimezones[0].id }}})
      break
    case TIMEZONE_DELETED:
      updatedTimezones = state.timezones.list.filter(t => t.id !== state.timezones.selected)
      newState = update(state, {
        session:{status:{busy: {$set: false}}},
        timezones: {
          list: {$set: updatedTimezones},
          selected: {$set: updatedTimezones.length ? updatedTimezones[0].id : null }}
      })
      break
    
    case SELECT_TIMEZONE:
      newState = update(state, {timezones:{selected: {$set: action.id}}})
      break
    case SELECT_USER:
      newState = update(state, {users:{selected: {$set: action.id}}})
      break
      
    case ENTER_EDIT_MODE:
      newState = update(state, {session:{status: {
        editMode: {$set: true},
        createMode: {$set: false}}}})
      break
    case EXIT_EDIT_MODE:
    newState = update(state, {session:{status: {editMode: {$set: false}}}})
      break
    case ENTER_CREATE_MODE:
    newState = update(state, {session:{status: {
      createMode: {$set: true},
      editMode: {$set: false}}}})
      break
    case EXIT_CREATE_MODE:
    newState = update(state, {session:{status: {createMode: {$set: false}}}})
      break
      
    case SERVER_ERROR:
    case CLIENT_ERROR:
    case AUTH_ERROR:
    newState = update(state, {
      session:{status: {
        busy: {$set: false},
        error: {$set: action.msg.error}}}})
      break
    case CLEAR_ERROR:
    newState = update(state, {session:{status: {error: {$set: ''}}}})
      break

    case REFRESH:
      newState = newState = update(state, {
        session: 
          {profile: {$set: action.profile},
          active: {$set: true}}})
      break

    case LOGOUT:
    default:
      newState = initialState
  }
  return newState
}