import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

import Login from './pages/login/_index'
import Users from './pages/users/_index'

const AuthRoutes = (props) => {
  if(props.role){
    let authorizedRoutes;
    switch(props.role) {
      case 'ADMIN':
        authorizedRoutes = (<div>
          <Route exact path="/users/:id" component={Users}  />
          <Route exact path="/timezones" render={()=> <div>timezones</div> }  />
          <Route exact path="/timezones/:userId/:tzId" render={()=> <div>timezone #1</div> }  />
        </div>)
        break
      case 'USERMANAGER':
        authorizedRoutes = (<div>
          <Route path="/users" render={()=> <div>users</div> }  />
          <Route path="/users/:id" render={()=> <div>user #1</div> }  />
        </div>)
        break
      case 'USER':
        authorizedRoutes = (<div>
          <Route path="/users/:id" component={Users}  />
          <Route path="/timezones/:userId" render={()=> <div>timezones</div> }  />
          <Route path="/timezones/:userId/:tzId" render={()=> <div>timezone #1</div> }  />
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