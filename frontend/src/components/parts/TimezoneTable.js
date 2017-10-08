import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import TimezoneRow from './TimezoneRow'
import { selectTimezone } from '../../actions'

class TimezoneTable extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      timer: null,
      counter: 0
    }
    this.tick = this.tick.bind(this)
  }

  componentDidMount() {
    let timer = setInterval(this.tick, 1000)
    this.setState({timer})
  }
  componentWillUnmount(){
    clearInterval(this.state.timer)
  }
  tick(){
    this.setState({
      counter: this.state.counter + 1000
    })
  }

  render(){
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
              {this.props.timezones.map((t,i) => <TimezoneRow key={i} 
                timezone={t} selected={t.id === this.props.selected} 
                counter={this.state.counter}/>)}
            </tbody>
          </table>
        </div>
      </div>
    )
    return component
  }
  
}

const mapStateToProps = (state)=> {
  return {
    role: state.session.profile.role,
    selected: state.timezones.selected,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    selectTimezone: (id) => dispatch(selectTimezone(id))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TimezoneTable)