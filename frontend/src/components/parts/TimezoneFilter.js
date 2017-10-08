import React from 'react'
import { connect } from 'react-redux'

import TimezoneTable from './TimezoneTable'

class TimezoneFilter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: '',
      filtered: this.props.timezones
    }
  }
  handleChange(e){
    this.setState({filter: e.target.value})
  }
  handleEnter(e, updatedTimezones){
    if(e.key === 'Enter'){
      let timezones = updatedTimezones ? updatedTimezones : this.props.timezones
      let filtered = timezones.filter(t => {
        return t.name.toLowerCase()
          .indexOf(this.state.filter.toLowerCase()) + 1
      })
      this.setState({filtered})
    }
  }
  
  componentWillReceiveProps(nextProps){
    this.handleEnter({key: "Enter"}, nextProps.timezones)
  }

  render() {
    return (
      <div>
        <div style={{marginTop:'20px', marginBottom:'5px'}}>
          <label className="label" >Filter by name:</label>
          <input type="filter" className="input" style={{width:'300px'}}
            value={this.state.filter}
            onChange={this.handleChange.bind(this)}
            onKeyDown={this.handleEnter.bind(this)}/>
        </div>
        <TimezoneTable timezones={this.state.filtered}/>
      </div>
    ) 
  }
}

const mapStateToProps = (state) => {
  return {
    timezones: state.timezones.list
  }
}

export default connect(mapStateToProps)(TimezoneFilter)