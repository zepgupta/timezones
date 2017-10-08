import { delay } from 'redux-saga'
import { take, put, takeEvery, takeLatest, call, select } from 'redux-saga/effects'
import store from 'store'
import * as ajax from 'superagent'
import history from '../history'
import jwt from 'jsonwebtoken'

import {
  SUBMIT_LOGIN,
  SUBMIT_CREATE_ACCOUNT,
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
  CREATE_USER,
  EDIT_USER,
  DELETE_USER,

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
  TRY_REFRESH
} from '../actions'

import loginFlow from './loginFlow'
import {getUserFlow, createUserFlow, editUserFlow, deleteUserFlow} from './userFlows'
import {getTimezoneFlow, createTimezoneFlow, editTimezoneFlow, deleteTimezoneFlow} from './TimezoneFlows'

const host = 'http://localhost:3000'

export default function* rootSaga() {
  //apply a middle ware that will check if the current token is valid, if it exists. if not logout
  yield takeEvery('*',(action)=> console.log(action))

  yield takeEvery(SUBMIT_LOGIN, loginFlow)
  yield takeEvery(SUBMIT_CREATE_ACCOUNT, loginFlow)
  
  yield takeLatest(GET_USERS, getUserFlow)
  yield takeLatest(CREATE_USER, createUserFlow)
  yield takeLatest(EDIT_USER, editUserFlow)
  yield takeLatest(DELETE_USER, deleteUserFlow)
  
  yield takeLatest(GET_TIMEZONES, getTimezoneFlow)
  yield takeLatest(CREATE_TIMEZONE, createTimezoneFlow)
  yield takeLatest(EDIT_TIMEZONE, editTimezoneFlow)
  yield takeLatest(DELETE_TIMEZONE, deleteTimezoneFlow)

  yield takeLatest(AUTH_ERROR, errorFlow)
  yield takeLatest(SERVER_ERROR, errorFlow)
  yield takeLatest(CLIENT_ERROR, errorFlow)
  yield takeEvery(TRY_REFRESH, refresh)
  yield takeEvery(LOGOUT, ()=> {
    store.clearAll()
    history.push('/')
  })
}

function* refresh(action) {
  if(store.get('token')) {
    let exp = jwt.decode(store.get('token')).exp * 1000
    if(exp - Date.now() > 0){
      yield put({type: REFRESH, profile: store.get('profile')})  
    } else {
      store.clearAll()
    }
  }
}

function* errorFlow(action) {
  yield delay(5000)
  yield put({type: CLEAR_ERROR})
}