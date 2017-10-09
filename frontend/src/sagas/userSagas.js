import { put, call, select } from 'redux-saga/effects'
import * as ajax from 'superagent'
import store from 'store'

import {
  USERS_RECEIVED,
  USER_CREATED,
  USER_MODIFIED,
  USER_DELETED,
  USER_MODIFIED_USER,
  SERVER_ERROR,
  LOGOUT
} from '../actions'

import {server} from '../default.config'

export function* getUserSaga(){
  try {
    let resp = yield ajax.get(server+'/users').set('x-access-token', store.get('token'))
    yield put({type: USERS_RECEIVED, users: resp.body})
  } catch(err) {
    yield put({type: SERVER_ERROR})
  }
}

export function* createUserSaga(action){
  try {
    let resp = yield ajax.post(server+'/users/').send({...action.user}).set('x-access-token', store.get('token'))
    yield put({type: USER_CREATED, user: resp.body})
  } catch(err) {
    yield put({type: SERVER_ERROR})
  }
}

export function* editUserSaga(action){
  try {
    let resp = yield ajax.put(server+'/users/'+action.details.id, {...action.details.updates}).set('x-access-token', store.get('token'))
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

export function* deleteUserSaga(action){
  if(action.userId){
    try {
      yield ajax.delete(server+'/users/'+action.userId).set('x-access-token', store.get('token'))
      let state = yield select()
      if(action.userId === state.session.profile.id) {
        yield put({type: LOGOUT})
      } else {
        yield put({type: USER_DELETED})
      }
    } catch(err) {
      yield put({type: SERVER_ERROR})
    }
  }
}