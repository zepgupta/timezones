import React from 'react'

const UserTable = props => {
  return(
    <tr>
      <th>{props.user.id}</th>
      <td>{props.user.firstName}</td>
      <td>{props.user.lastName}</td>
      <td>{props.user.role}</td>
      <td>{props.user.email}</td>
    </tr>
  )
}
export default UserTable