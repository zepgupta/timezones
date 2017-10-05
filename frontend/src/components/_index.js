import React from 'react'
import { Provider } from 'react-redux'
import { HashRouter, Route, Link } from 'react-router-dom'

import Header from './global/Header'
import Footer from './global/Footer'

import AuthRoutes from './AuthRoutes'

const Application = (props) => {
  return (
    <Provider store={props.store}>
      <HashRouter >
        <div>
          <Header />
          <Route path="/*" component={AuthRoutes} />
          <Footer />
        </div>
      </HashRouter> 
    </Provider>
  )
}

export default Application