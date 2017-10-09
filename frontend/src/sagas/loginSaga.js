import { put, call } from 'redux-saga/effects'
import store from 'store'
import * as ajax from 'superagent'

import { AUTH_SUCCESS, SERVER_ERROR, AUTH_ERROR} from '../actions'

import {server} from '../default.config'

export default function* loginSaga(action) {
  let url = !action.authInfo.firstName ? '/login' : '/login/new'
  try {
    let resp = yield ajax.post(server+url, action.authInfo)
    if(resp.body && resp.body.error) {
      yield put({type: AUTH_ERROR, msg: {error: resp.body.error}})
    } else {
      store.set('token', resp.body.token)
      store.set('profile', resp.body.profile)

      yield put({type: AUTH_SUCCESS, profile: resp.body.profile})
    }

  } catch(err) {
    yield put({type: SERVER_ERROR, error: "There was an error connecting to the server. Please try again later."})
  }
}