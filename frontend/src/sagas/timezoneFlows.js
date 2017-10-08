import { take, put, takeEvery, call, select } from 'redux-saga/effects'
import * as ajax from 'superagent'
import store from 'store'

import {
  GET_TIMEZONES,
  TIMEZONES_RECEIVED,
  TIMEZONE_CREATED,
  TIMEZONE_MODIFIED,
  TIMEZONE_DELETED,
  TIMEZONE_MODIFIED_TIMEZONE,
  SERVER_ERROR
} from '../actions'

const host = 'http://localhost:3000'

export function* getTimezoneFlow(action){
  try {
    let state = yield select()
    let url = state.session.profile.role === 'USER' ? '/timezones/'+state.session.profile.id : '/timezones'
    let resp = yield ajax.get(host+url).set('x-access-token', store.get('token'))
    yield put({type: TIMEZONES_RECEIVED, timezones: resp.body})
  } catch(err) {
    yield put({type: SERVER_ERROR, msg: {err}})
  }
}

export function* createTimezoneFlow(action){
  try {
    let resp = yield ajax.post(host+'/timezones/'+action.details.userId).send({
      name: action.details.name,
      city: action.details.city
    }).set('x-access-token', store.get('token'))
    yield put({type: TIMEZONE_CREATED, timezone: resp.body})
  } catch(err) {
    yield put({type: SERVER_ERROR})
  }
}

export function* editTimezoneFlow(action) {
  try {
    let state = yield select()
    let resp = yield ajax.put(host+'/timezones/'+action.details.userId+'/'+action.details.id)
      .send({name: action.details.name})
      .set('x-access-token', store.get('token'))
    yield put({type: TIMEZONE_MODIFIED, timezone: resp.body})
  } catch(err) {
    yield put({type: SERVER_ERROR})
  }
}

export function* deleteTimezoneFlow(action) {
  if(action.userId) {
    try {
      let state = yield select()
      let id = state.timezones.selected
      let resp = yield ajax.delete(host+'/timezones/'+action.userId+'/'+id).set('x-access-token', store.get('token'))
      yield put({type: TIMEZONE_DELETED, timezones: resp.body})
    } catch(err) {
      yield put({type: SERVER_ERROR})
    }
  }
}