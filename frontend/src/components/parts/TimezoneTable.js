import React from 'react'
import { connect } from 'react-redux'

import TimezoneRow from './TimezoneRow'

const TimezoneTable = props => {
  let component
  if(props.user.role === 'USER' || props.user.role === 'ADMIN') {
    component = (
      <div className="card">
        <div className="card-content">
          <table className="table is-fullwidth is-scrollable" style={{overflowY:"scroll"}}>
            <thead>
              <tr>
                <th><abbr title="ID">ID</abbr></th>
                <th><abbr title="Name">Name</abbr></th>
                <th><abbr title="City">City</abbr></th>
                <th><abbr title="Local Time">Local Time</abbr></th>
                <th><abbr title="UTC Offset">UTC Offset</abbr></th>
              </tr>
            </thead>
            <tbody height="200px" >
              {props.timezones.map((t,i) => <TimezoneRow key={i} timezone={t} />)}
            </tbody>
          </table>
        </div>
      </div>
    )
    return component
  }
}

export default TimezoneTable