import React from 'react'
import { render } from 'react-dom'
import { applyMiddleware, combineReducers, createStore, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import bulma from 'bulma'

import reducer from './reducer'
import sagas from './sagas/_index'
import Application from './components/_index'

const sagaMiddleware = createSagaMiddleware()

let store = createStore( reducer, //compose(
    applyMiddleware(sagaMiddleware),
  /*window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())*/)
sagaMiddleware.run(sagas)

render(<Application store={store} />, document.getElementById('app'))