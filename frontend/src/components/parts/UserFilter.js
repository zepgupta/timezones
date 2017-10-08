import React from 'react'
import { connect } from 'react-redux'

import UserTable from './UserTable'

class UserFilter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: '',
      filtered: this.props.users
    }
  }
  handleChange(e){
    this.setState({filter: e.target.value})
  }
  handleEnter(e, updatedUsers){
    if(e.key === 'Enter'){
      let users = updatedUsers ? updatedUsers : this.props.users
      let filtered = users.filter(u => {
        return (u.firstName.toLowerCase().indexOf(this.state.filter.toLowerCase()) + 1) || 
          (u.lastName.indexOf(this.state.filter) + 1)
      })
      this.setState({filtered})
    }
  }
  
  componentWillReceiveProps(nextProps){
    this.handleEnter({key: "Enter"}, nextProps.users)
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
        <UserTable users={this.state.filtered}/>
      </div>
    ) 
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users.list
  }
}

export default connect(mapStateToProps)(UserFilter)