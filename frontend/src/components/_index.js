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
        <div style={{display:"flex",minHeight:"100vh",flexDirection:"column"}}>
          <Error />
          <Busy />
          <Header />
          <div style={{flex:1}}>
            <Route path="/*" component={AuthRoutes} />
          </div>
          <Footer />
        </div>
      </Router> 
    </Provider>
  )
}

export default Application