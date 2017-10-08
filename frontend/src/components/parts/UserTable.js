import React from 'react'
import { connect } from 'react-redux'

import UserRow from './UserRow'

const roles = ['USERMANAGER', 'ADMIN']

const UserTable = props => {
  let component
    component = (
      <div className="card">
        <div className="card-content">
          <table className="table is-fullwidth is-scrollable" style={{overflowY:"scroll"}}>
            <thead>
              <tr>
                <th><abbr title="ID">ID</abbr></th>
                <th><abbr title="First Name">First</abbr></th>
                <th><abbr title="Last Name">Last</abbr></th>
                <th><abbr title="Role">Role</abbr></th>
                <th><abbr title="Email">Email</abbr></th>
              </tr>
            </thead>
            <tbody height="200px" >
              {props.users.map((u,i) => <UserRow key={i} user={u} selected={u.id === props.selected}/>)}
            </tbody>
          </table>
        </div>
      </div>
    )
    return component
}

const mapStateToProps = state => {
  return {
    selected: state.users.selected
  }
}

export default connect(mapStateToProps)(UserTable)