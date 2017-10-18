import { put, call, select } from 'redux-saga/effects'
import * as ajax from 'superagent'
import store from 'store'

import {
  TIMEZONES_RECEIVED,
  TIMEZONE_CREATED,
  TIMEZONE_MODIFIED,
  TIMEZONE_DELETED,
  SERVER_ERROR
} from '../actions'

import config from '../default.config'

export function* getTimezoneSaga(action){
  try {
    let state = yield select()
    let url = state.session.profile.role === 'USER' ? '/timezones/'+state.session.profile.id : '/timezones'
    let resp = yield ajax.get(config.server+url).set('x-access-token', store.get('token'))
    yield put({type: TIMEZONES_RECEIVED, timezones: resp.body})
  } catch(err) {
    yield put({type: SERVER_ERROR, msg: {err}})
  }
}

export function* createTimezoneSaga(action){
  try {
    let resp = yield ajax.post(config.server+'/timezones/'+action.details.userId).send({
      name: action.details.name,
      city: action.details.city
    }).set('x-access-token', store.get('token'))
    yield put({type: TIMEZONE_CREATED, timezone: resp.body})
  } catch(err) {
    yield put({type: SERVER_ERROR})
  }
}

export function* editTimezoneSaga(action) {
  try {
    let resp = yield ajax.put(config.server+'/timezones/'+action.details.userId+'/'+action.details.id)
      .send({name: action.details.name})
      .set('x-access-token', store.get('token'))
    yield put({type: TIMEZONE_MODIFIED, timezone: resp.body})
  } catch(err) {
    yield put({type: SERVER_ERROR})
  }
}

export function* deleteTimezoneSaga(action) {
  if(action.userId) {
    try {
      let state = yield select()
      let id = state.timezones.selected
      let resp = yield ajax.delete(config.server+'/timezones/'+action.userId+'/'+id).set('x-access-token', store.get('token'))
      yield put({type: TIMEZONE_DELETED, timezones: resp.body})
    } catch(err) {
      yield put({type: SERVER_ERROR})
    }
  }
}