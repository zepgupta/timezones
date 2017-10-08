import { takeEvery, takeLatest } from 'redux-saga/effects'
import store from 'store'

import {
  SUBMIT_LOGIN,
  SUBMIT_CREATE_ACCOUNT,
  LOGOUT,
  GET_TIMEZONES,
  CREATE_TIMEZONE,
  EDIT_TIMEZONE,
  DELETE_TIMEZONE,
  GET_USERS,
  CREATE_USER,
  EDIT_USER,
  DELETE_USER,
  AUTH_ERROR,
  SERVER_ERROR,
  CLIENT_ERROR,
  TRY_REFRESH
} from '../actions'

import loginSaga from './loginSaga'
import {getUserSaga, createUserSaga, editUserSaga, deleteUserSaga} from './userSagas'
import {getTimezoneSaga, createTimezoneSaga, editTimezoneSaga, deleteTimezoneSaga} from './timezoneSagas'
import refreshSaga from './refreshSaga'
import errorSaga from './errorSaga'

export default function* rootSaga() {
  yield takeEvery('*', (action)=> console.log(action.type))
  yield takeEvery(SUBMIT_LOGIN, loginSaga)
  yield takeEvery(SUBMIT_CREATE_ACCOUNT, loginSaga)
  yield takeLatest(GET_USERS, getUserSaga)
  yield takeLatest(CREATE_USER, createUserSaga)
  yield takeLatest(EDIT_USER, editUserSaga)
  yield takeLatest(DELETE_USER, deleteUserSaga)
  yield takeLatest(GET_TIMEZONES, getTimezoneSaga)
  yield takeLatest(CREATE_TIMEZONE, createTimezoneSaga)
  yield takeLatest(EDIT_TIMEZONE, editTimezoneSaga)
  yield takeLatest(DELETE_TIMEZONE, deleteTimezoneSaga)
  yield takeLatest(AUTH_ERROR, errorSaga)
  yield takeLatest(SERVER_ERROR, errorSaga)
  yield takeLatest(CLIENT_ERROR, errorSaga)
  yield takeEvery(TRY_REFRESH, refreshSaga)
  yield takeEvery(LOGOUT, ()=> {
    store.clearAll()
  })
}
