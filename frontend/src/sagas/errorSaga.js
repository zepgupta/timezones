import { delay } from 'redux-saga'
import { put } from 'redux-saga/effects'
import{ CLEAR_ERROR } from '../actions'

export default function* errorSaga() {
  yield delay(5000)
  yield put({type: CLEAR_ERROR})
}