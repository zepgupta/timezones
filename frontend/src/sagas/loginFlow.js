import { delay } from 'redux-saga'
import { take, put, takeEvery, call } from 'redux-saga/effects'
import store from 'store'
import * as ajax from 'superagent'
import history from '../history'
import jwt from 'jsonwebtoken'

import { AUTH_SUCCESS, SERVER_ERROR, AUTH_ERROR, GET_USERS } from '../actions'
import { getUserFlow } from './userFlows'

const host = 'http://localhost:3000'

export default function* loginFlow(action) {
  let url = !action.authInfo.firstName ? '/login' : '/login/new'
  try {
    let resp = yield ajax.post(host+url, action.authInfo)
    if(resp.body && resp.body.error) {
      yield put({type: AUTH_ERROR, msg: {error: resp.body.error}})
    } else {
      store.set('token', resp.body.token)
      store.set('profile', resp.body.profile)

      yield put({type: AUTH_SUCCESS, profile: resp.body.profile})
      history.push('/users')
    }

  } catch(err) {
    console.log(err)
    yield put({type: SERVER_ERROR, error: "There was an error connecting to the server. Please try again later."})
  }
}