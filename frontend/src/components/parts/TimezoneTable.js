import React from 'react'
import { connect } from 'react-redux'

import TimezoneRow from './TimezoneRow'
import { selectTimezone } from '../../actions'

const TimezoneTable = props => {

  let component = (
      <div className="card">
        <div className="card-content">
          <table className="table is-fullwidth is-scrollable" style={{overflowY:"scroll"}}>
            <thead>
              <tr>
                <th><abbr title="User ID">User ID</abbr></th>
                <th><abbr title="Name">Name</abbr></th>
                <th><abbr title="City">City</abbr></th>
                <th><abbr title="Local Time">Local Time</abbr></th>
                <th><abbr title="UTC Offset">UTC Offset</abbr></th>
              </tr>
            </thead>
            <tbody height="200px" >
              {props.timezones.map((t,i) => <TimezoneRow key={i} timezone={t} selected={t.id === props.selected}/>)}
            </tbody>
          </table>
        </div>
      </div>
    )
  return component
}

const mapStateToProps = (state)=> {
  return {
    role: state.session.profile.role,
    timezones: state.timezones.list,
    selected: state.timezones.selected,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    selectTimezone: (id) => dispatch(selectTimezone(id))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TimezoneTable)