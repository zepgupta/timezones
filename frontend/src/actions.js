export const SERVER_ERROR = 'SERVER_ERROR'
export const CLIENT_ERROR = 'CLIENT_ERROR'
export const CLEAR_ERROR = 'CLEAR_ERROR'

export const SUBMIT_LOGIN = 'SUBMIT_LOGIN'
export const SUBMIT_CREATE_ACCOUNT = 'SUBMIT_CREATE_ACCOUNT'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_ERROR = 'AUTH_ERROR'
export const LOGOUT = 'LOGOUT'

export const GET_TIMEZONES = 'GET_TIMEZONES'
export const TIMEZONES_RECEIVED = 'TIMEZONES_RECEIVED'
export const CREATE_TIMEZONE = 'CREATE_TIMEZONE'
export const TIMEZONE_CREATED = 'TIMEZONE_CREATED'
export const EDIT_TIMEZONE = 'EDIT_TIMEZONE'
export const TIMEZONE_MODIFIED = 'TIMEZONE_MODIFIED'
export const DELETE_TIMEZONE = 'DELETE_TIMEZONE'
export const TIMEZONE_DELETED = 'TIMEZONE_DELETED'
export const SELECT_TIMEZONE = 'SELECT_TIMEZONE'

export const GET_USERS = 'GET_USERS'
export const USERS_RECEIVED = 'USERS_RECEIVED'
export const CREATE_USER = 'CREATE_USER'
export const USER_CREATED = 'USER_CREATED'
export const EDIT_USER = 'EDIT_USER'
export const USER_MODIFIED = 'USER_MODIFIED'
export const DELETE_USER = 'DELETE_USER'
export const USER_DELETED = 'USER_DELETED'
export const USER_MODIFIED_USER = "USER_MODIFIED_USER"
export const SELECT_USER = 'SELECT_USER'

export const ENTER_EDIT_MODE = 'ENTER_EDIT_MODE'
export const EXIT_EDIT_MODE = 'EXIT_EDIT_MODE'

export const ENTER_CREATE_MODE = 'ENTER_CREATE_MODE'
export const EXIT_CREATE_MODE = 'EXIT_CREATE_MODE'

export const TRY_REFRESH = 'TRY_REFRESH'
export const REFRESH = 'REFRESH'

export function serverError(msg) {
  return {
    type: SERVER_ERROR,
    msg
  }
}

export function clientError(msg) {
  return {
    type: CLIENT_ERROR,
    msg
  }
}

export function clearError() {
  return {
    type: CLEAR_ERROR
  }
}

export function submitLogin(authInfo) {
  return {
    type: SUBMIT_LOGIN,
    authInfo
  }
}
export function submitCreateAccount(authInfo) {
  return {
    type: SUBMIT_CREATE_ACCOUNT,
    authInfo
  }
}

export function authSuccess(profile) {
  return {
    type: AUTH_SUCCESS,
    profile
  }
}

export function authError(msg) {
  return {
    type: AUTH_ERROR,
    msg
  }
}

export function logout(){
  return {
    type: LOGOUT
  }
}

export function getTimezones(id) {
  if(id){
    return {
      type: GET_TIMEZONES,
      id
    }
  } else {
    return {
      type: GET_TIMEZONES,
    }
  }
}

export function timezonesReceived(timezones) {
  return {
    type: TIMEZONES_RECEIVED,
    timezones
  }
}

export function createTimezone(details) {
  return {
    type: CREATE_TIMEZONE,
    details
  }
}
export function timezoneCreated(timezone) {
  return {
    type: TIMEZONE_CREATED,
    timezone
  }
}
export function editTimezone(details) {
  return {
    type: EDIT_TIMEZONE,
    details
  }
}
export function timezoneModified(details) {
  return {
    type: TIMEZONE_MODIFIED,
    details
  }
}
export function deleteTimezone(userId) {
  return {
    type: DELETE_TIMEZONE,
    userId
  }
}
export function timezoneDeleted() {
  return {
    type: timezoneDeleted,

  }
}
export function getUsers() {
  return {
    type: GET_USERS

  }
}
export function usersReceived() {
  return {
    type: USERS_RECEIVED,

  }
}
export function createUser(user) {
  return {
    type: CREATE_USER,
    user
  }
}
export function userCreated(user) {
  return {
    type: USER_CREATED,
    user
  }
}
export function editUser(details) {
  return {
    type: EDIT_USER,
    details
  }
}
export function userModified(user) {
  return {
    type: USER_MODIFIED,
    users
  }
}
export function userModifiedUser(profile) {
  return {
    type: USER_MODIFIED_USER,
    profile
  }
}
export function deleteUser(userId) {
  return {
    type: DELETE_USER,
    userId
  }
}
export function userDeleted() {
  return {
    type: USER_DELETED,

  }
}
export function enterEditMode() {
  return {
    type: ENTER_EDIT_MODE,

  }
}
export function exitEditMode() {
  return {
    type: EXIT_EDIT_MODE,

  }
}
export function selectUser(id) {
  return {
    type: SELECT_USER,
    id
  }
}
export function selectTimezone(id) {
  return {
    type: SELECT_TIMEZONE,
    id
  }
}
export function enterCreateMode() {
  return {
    type: ENTER_CREATE_MODE,

  }
}
export function exitCreateMode() {
  return {
    type: EXIT_CREATE_MODE,

  }
}
export function tryRefresh() {
  return {
    type: TRY_REFRESH,
  }
}
export function refresh(profile) {
  return {
    type: REFRESH,
    profile
  }
}