import React from 'react'
import { connect } from 'react-redux'

import Card from '../../parts/TimezoneCard'
import Table from '../../parts/TimezoneTable'

const Users = (props)=> {
  console.log(props)
  let component = (
    <section>
      <div className="container">
        <Card user={props.user} timezone={props.timezone} editMode={props.editMode}/>
      </div>
      <div className="container">
        <Table user={props.user} timezones={props.timezones} editMode={props.editMode}/>
      </div>
    </section>
  )

  return component
}

const mapStateToProps = state => {
  if(state.user.role === 'USER' || 'ADMIN') {
    
    let props = {
      user: state.user,
      editMode: state.app.users.editMode,
      timezone: state.app.timezones,
      timezones: state.timezones
    }
    console.log(props)
    return props
  }
}

export default connect(mapStateToProps)(Users)