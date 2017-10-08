import jwt from 'jsonwebtoken'
import store from 'store'
import { put } from 'redux-saga/effects'

import { REFRESH } from '../actions'

export default function* refreshSaga() {
  if(store.get('token')) {
    let exp = jwt.decode(store.get('token')).exp * 1000
    if(exp - Date.now() > 0){
      yield put({type: REFRESH, profile: store.get('profile')})  
    } else {
      store.clearAll()
    }
  }
}