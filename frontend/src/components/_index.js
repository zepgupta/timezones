import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route, Link } from 'react-router-dom'

import history from '../history'

import Busy from './global/Busy'
import Header from './global/Header'
import Footer from './global/Footer'
import Error from './global/Error'

import AuthRoutes from './AuthRoutes'

const Application = (props) => {
  return (
    <Provider store={props.store}>
      <Router history={history}>
        <div>
          <Error />
          <Busy />
          <Header />
          <Route path="/*" component={AuthRoutes} />
          <Footer />
        </div>
      </Router> 
    </Provider>
  )
}

export default Application