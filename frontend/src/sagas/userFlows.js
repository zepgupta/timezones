import { take, put, takeEvery, call, select } from 'redux-saga/effects'
import * as ajax from 'superagent'
import store from 'store'

import {
  GET_USERS,
  USERS_RECEIVED,
  USER_CREATED,
  USER_MODIFIED,
  USER_DELETED,
  USER_MODIFIED_USER,
  SERVER_ERROR,
  LOGOUT
} from '../actions'

const host = 'http://localhost:3000'

export function* getUserFlow(action){
  try {
    let resp = yield ajax.get(host+'/users').set('x-access-token', store.get('token'))
    yield put({type: USERS_RECEIVED, users: resp.body})
  } catch(err) {
    yield put({type: SERVER_ERROR})
  }
}

export function* createUserFlow(action){
  try {
    let resp = yield ajax.post(host+'/users/').send({...action.user}).set('x-access-token', store.get('token'))
    yield put({type: USER_CREATED, user: resp.body})
  } catch(err) {
    yield put({type: SERVER_ERROR})
  }
}

export function* editUserFlow(action){
  try {
    let resp = yield ajax.put(host+'/users/'+action.details.id, {...action.details.updates}).set('x-access-token', store.get('token'))
    let state = yield select()
    if(resp.body === {} || resp.body.error) {
      yield put({type:SERVER_ERROR, msg: {error: resp.body.error || resp.body}})
    } else {
      if(state.session.profile.role === "USER"){
        yield put({type: USER_MODIFIED_USER, profile: resp.body})
      }else {   
        yield put({type: USER_MODIFIED, user: resp.body})
      }
    }
  } catch(err) {
    yield put({type: SERVER_ERROR, msg: {err}})
  }
}

export function* deleteUserFlow(action){
  if(action.userId){
    try {
      let resp = yield ajax.delete(host+'/users/'+action.userId).set('x-access-token', store.get('token'))
      let state = yield select()
      if(action.userId === state.session.profile.id) {
        yield put({type: LOGOUT})
      } else {
        yield put({type: USER_DELETED})
      }
    } catch(err) {
      console.log(err)
      yield put({type: SERVER_ERROR})
    }
  }
}