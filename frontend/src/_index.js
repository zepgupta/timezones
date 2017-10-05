import React from 'react'
import { render } from 'react-dom'
import { applyMiddleware, combineReducers, createStore, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
// import { browserHistory } from 'react-router'
// import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import bulma from 'bulma'

import reducer from './reducer/_index'
import sagas from './sagas/_index'
import Application from './components/_index'

const sagaMiddleware = createSagaMiddleware()
const store = createStore( reducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(sagas)

render(<Application store={store} />, document.getElementById('app'))