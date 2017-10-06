import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

import Login from './pages/login/_index'
import Users from './pages/users/_index'
import Timezones from './pages/timezones/_index'

const AuthRoutes = (props) => {
  if(props.role){
    let authorizedRoutes;
    switch(props.role) {
      case 'ADMIN':
        authorizedRoutes = (<div>
          <Route exact path="/users/:id" component={Users}  />
          <Route exact path="/timezones" component={Timezones}  />
          <Route exact path="/timezones/:userId/:tzId" component={Timezones}  />
        </div>)
        break
      case 'USERMANAGER':
        authorizedRoutes = (<div>
          <Route path="/users/:id" component={Users} />
        </div>)
        break
      case 'USER':
        authorizedRoutes = (<div>
          <Route path="/users/:id" component={Users}  />
          <Route path="/timezones/:userId" component={Timezones} />
          <Route path="/timezones/:userId/:tzId" component={Timezones} />
        </div>)
        break
      default: 
        authorizedRoutes = (<Route exact path="/" component={Login} />)
        break
    }
    
    return authorizedRoutes
  } else {
    return (
      <div>
        <Route exact path="/" component={Login} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {role : state.user.role}
}

export default connect(mapStateToProps)(AuthRoutes)