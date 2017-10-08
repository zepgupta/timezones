import React from 'react'
import {connect} from 'react-redux'

import { selectUser } from '../../actions'

const UserTable = props => {
  return(
    <tr style={{backgroundColor: props.selected ? "#72d0eb" : ""}} onClick={props.selectUser(props.user.id)}>
      <th>{props.user.id}</th>
      <td>{props.user.firstName}</td>
      <td>{props.user.lastName}</td>
      <td>{props.user.role}</td>
      <td>{props.user.email}</td>
    </tr>
  )
}
const mapDispatchToProps = (dispatch) => {
  return {
    selectUser: (id) => () => dispatch(selectUser(id))
  }
}
export default connect(null, mapDispatchToProps)(UserTable)