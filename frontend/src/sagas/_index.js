import { take, put } from 'redux-saga/effects'

export default function* rootSaga() {
  
}

function* loginFlow() {
  while(true) {
    yield take('LOGIN')

    yield take('LOGOUT')
  }
}