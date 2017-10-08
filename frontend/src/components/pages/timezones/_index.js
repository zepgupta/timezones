import React from 'react'
import { connect } from 'react-redux'

import Card from '../../parts/TimezoneCard'
import Table from '../../parts/TimezoneTable'

import {getTimezones} from '../../../actions'

class Timezones extends React.Component {
  constructor(props){
    super(props)
    if(props.role === 'USER') {
      props.getTimezones(props.id)
    } else {
      props.getTimezones()
    }
  }

  render() {
    let component = (
      <section>
        <div className="container">
          <Card/>
        </div>
        <div className="container">
          { this.props.timezones.length ? 
            <Table/> : '' }
        </div>
      </section>
    )
  
    return component
  }
}

const mapStateToProps = state => {
  return {
    timezones: state.timezones.list,
    id: state.session.profile.id,
    role: state.session.profile.role,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getTimezones: () => dispatch(getTimezones())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Timezones)