import React from 'react'
import { connect } from 'react-redux'

import Card from '../../parts/UserCard'
import Table from '../../parts/UserTable'

const Users = (props)=> {
  let component = (
    <section>
      <div className="container">
        <Card user={props.user} editMode={props.editMode}/>
      </div>
      <div className="container">
        <Table user={props.user} users={props.users}/>
      </div>
    </section>
  )

  return component
}

const mapStateToProps = state => {
  if(state.user.role === 'USER') {
    return {
      user: state.user,
      editMode: state.app.users.editMode
    }
  } else if (state.user.role === 'ADMIN' || state.user.role === "USERMANAGER") {
    return {
      editMode: state.app.users.editMode,
      user: state.user,
      users: state.users
    }
  }
}

export default connect(mapStateToProps)(Users)