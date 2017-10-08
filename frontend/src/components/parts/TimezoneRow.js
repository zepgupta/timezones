import React from 'react'
import {connect} from 'react-redux'
import moment from 'moment'

import { selectTimezone } from '../../actions'

const TimezoneRow = props => {
  let time = moment.utc().utcOffset(Math.round(props.timezone.utcOffset)).format('hh:mm:ss a')
  return (
    <tr style={{backgroundColor: props.selected ? "#72d0eb" : ""}} onClick={props.selectTimezone(props.timezone.id)}>
      <th>{props.timezone.userId}</th>
      <td>{props.timezone.name}</td>
      <td>{props.timezone.city}</td>
      <td>{time}</td>
      <td>{props.timezone.utcOffset}</td>
    </tr>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectTimezone: (id) => () => dispatch(selectTimezone(id))
  }
}
export default connect(null, mapDispatchToProps)(TimezoneRow)