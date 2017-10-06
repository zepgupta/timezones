import React from 'react'

const TimezoneTable = props => {
  return(
    <tr>
      <th>{props.timezone.id}</th>
      <td>{props.timezone.name}</td>
      <td>{props.timezone.city}</td>
      <td>{props.timezone.localTime}</td>
      <td>{props.timezone.utcOffset}</td>
    </tr>
  )
}
export default TimezoneTable