import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import store from 'store'
import jwt from 'jsonwebtoken'

import Login from './pages/login/_index'
import Users from './pages/users/_index'
import Timezones from './pages/timezones/_index'

import { tryRefresh } from '../actions'

const AuthRoutes = (props) => {
  //check for valid token before determining routes. move to saga
  if(!props.active && store.get('token')){
    props.tryRefresh()
  }

  //determine routes based on auth status
  let authorizedRoutes;
  switch(props.role) {
    case 'USER':
    case 'ADMIN':
      authorizedRoutes = (
      <Switch>
          <Route exact path="/users" component={Users}  />
          <Route exact path="/timezones" component={Timezones}  />
          <Redirect to="/users" />
      </Switch>)
      break
    case 'USERMANAGER':
      authorizedRoutes = (
        <Switch>
          <Route path="/users" component={Users} />
          <Redirect to="/users" />
        </Switch>)
      break
    default: 
      authorizedRoutes = (
        <Switch>
          <Route exact path="/" component={Login} />
          <Redirect to="/" />
        </Switch>)
      break
  }
  
  return authorizedRoutes
}

const mapStateToProps = state => {
  if(state.session.active){
    return {
      role : state.session.profile.role,
      active: state.session.active,
      id: state.session.profile.id
    }
  } else {
    return {
      active: state.session.active,
    }
  }
}
const mapDispatchToProps = dispatch => {
  return {
    tryRefresh: (profile) => dispatch(tryRefresh(profile))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AuthRoutes)