import React from 'react'
import { connect } from 'react-redux'

import Card from '../../parts/UserCard'
import FilteredTable from '../../parts/UserFilter'

import {getUsers} from '../../../actions'

class Users extends React.Component {
  constructor(props) {
    super(props)
    if(props.role !== 'USER') {
      props.getUsers()
    }
  }

  render(){
    let component = (
      <section>
        <div className="container">
          <Card />
        </div>
    { this.props.role !== 'USER' && this.props.users.length 
      ? <div className="container">
          <FilteredTable />
        </div>
      : '' } 
      </section>
    )

    return component
  }
}

const mapStateToProps = state => {
  return {
    role: state.session.profile.role,
    users: state.users.list
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getUsers: () => dispatch(getUsers())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Users)