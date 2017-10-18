import React from 'react'
import { connect } from 'react-redux'

const roles = ['', 'USER', 'USERMANAGER']

import { getUsers, createUser, editUser, deleteUser,
  enterEditMode, exitEditMode, enterCreateMode, exitCreateMode, clientError } from '../../actions'

class UserCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cFName: '',
      cLName: '',
      cRole: '',
      cEmail: '',
      cPassword: '',
      eRole: '',
      eEmail: '',
      eNewPw: '',
    }
    this.map = {
      cFName: "firstName",
      cLName: "lastName",
      cRole: "role",
      cEmail: "email",
      cPassword: "password",
      eRole: "role",
      eEmail: "email",
      eNewPw: "password",
    }
    this.keys = Object.keys(this.state)
  }

  handleChange(field, e) {
    let change = {[field]: e.target.value}
    this.setState(change)
  }
  create() {
    let keys = Object.keys(this.state)
    let dirty = keys.filter((k)=> this.state[k] && k[0] === 'c')
    if(dirty.length === 5){
      this.props.createUser({
        firstName: this.state.cFName,
        lastName: this.state.cLName,
        role: this.state.cRole,
        email: this.state.cEmail,
        password: this.state.cPassword
      })
      keys.forEach(k => this.state[k] = '')
    } else {
      this.props.clientError({error: 'Please fill in all fields before submitting.'})
    }
  }
  edit() {
    let keys = Object.keys(this.state)
    let dirty = keys.filter((k)=> this.state[k] && k[0] === 'e')
    if(dirty.length) {
      let updates = {}
      dirty.forEach(d => {
        updates[this.map[d]]=this.state[d]
      })
      this.props.editUser({
        id: this.props.profile.role === "USER" ? this.props.profile.id : this.props.selected || this.props.profile.id,
        updates
      })
      keys.forEach(k => this.state[k] = '')
    } else {
      this.props.clientError({error: 'Please update a value before saving.'})
    }
  }

  render(){
    let info
    switch(this.props.profile.role){
      case 'USER':
        if(!this.props.editMode) {
          info = (<div className="card">
            <button className="delete is-medium is-pulled-right" 
                  style={{marginRight:"5px",marginTop:"5px"}}
                  onClick={this.props.deleteUser(this.props.profile.id)}></button>
            <div className="card-content">
              <h1 className="title">{this.props.profile.firstName} {this.props.profile.lastName}</h1>
              <div className="container">   
                <div className="field">
                  <label className="label">Role:</label>
                  <h2 className="subtitle">&nbsp;{this.props.profile.role}</h2>
                </div>
                <div className="field">
                  <label className="label">Email:</label>
                  <h2 className="subtitle">&nbsp;{this.props.profile.email}</h2>
                </div>
              </div>
            </div>
            <footer className="card-footer">
              <div className="card-footer-item"></div>
              <button className="card-footer-item button is-large" 
                style={{display:"flex", flexDirection:"column"}} 
                onClick={this.props.enterEditMode}>Edit</button>
            </footer>
          </div>)
        } else {
          info = (<div className="card">
            <div className="card-content">
              <h1 className="title">{this.props.profile.firstName} {this.props.profile.lastName}</h1>
              <div className="container">
                <div className="field">
                  <label className="label">Role:</label>
                  <h2 className="subtitle">&nbsp;{this.props.profile.role}</h2>
                </div>
                <div className="field">
                  <label className="label">Email:</label>
                  <input type="email" className="input" 
                        value={this.state.eEmail}
                        onChange={this.handleChange.bind(this, 'eEmail')}/>
                </div>
                <div className="field">
                  <label className="label">New Password:</label>
                  <input type="password" className="input"
                        value={this.state.eNewPw}
                        onChange={this.handleChange.bind(this, 'eNewPw')}/>
                </div>
              </div>
            </div>
            <footer className="card-footer">
              <button className="card-footer-item button is-large is-light" 
                style={{display:"flex", flexDirection:"column"}}
                onClick={this.props.exitEditMode}>Cancel</button>
              <button className="card-footer-item button is-large is-success" 
              style={{display:"flex", flexDirection:"column"}}
              onClick={this.edit.bind(this)}>Save</button>
            </footer>
          </div>)
        }
        break;
      case "USERMANAGER":
      case 'ADMIN':
        let user = this.props.selected 
          ? this.props.users.filter(u => parseInt(u.id) === parseInt(this.props.selected))[0]
          : this.props.profile
        if(!this.props.editMode && !this.props.createMode) {
          info = (<div className="card">
            <button className="delete is-medium is-pulled-right" 
                  style={{marginRight:"5px",marginTop:"5px"}}
                  onClick={this.props.deleteUser(user.id)}></button>
            <div className="card-content">
              <h1 className="title">{user.firstName} {user.lastName}</h1>
              <div className="field">
                <label className="label">Role:</label>
                <h2 className="subtitle">&nbsp;{user.role}</h2>
              </div>
              <div className="field">
                <label className="label">Email:</label>
                <h2 className="subtitle">&nbsp;{user.email}</h2>
              </div>
            </div>
            <footer className="card-footer">
              <button className="card-footer-item button is-large is-light" 
                  style={{display:"flex", flexDirection:"column"}} 
                  onClick={this.props.enterEditMode}>Edit</button>
              <button className="card-footer-item button is-large" 
                  style={{display:"flex", flexDirection:"column"}}
                  onClick={this.props.enterCreateMode}>New</button>
            </footer>
          </div>)
  
        } else if (this.props.editMode) {
          info = (<div className="card">
            <div className="card-content">
              <h1 className="title">{user.firstName} {user.lastName}</h1>
              <div className="container">   
                <div className="field">
                  <label className="label">Role:</label>
                  {user.role === 'ADMIN' ? <h2 className="subtitle">&nbsp;{user.role}</h2> :
                  <div className="control">
                    <div className="select">
                      <select value={this.state.eRole} onChange={this.handleChange.bind(this,'eRole')}>
                        {
                          roles.map((r,i) => (<option key={i}>{r}</option>))
                        }
                      </select>
                    </div>
                  </div> 
                  }
                </div>
                <div className="field">
                  <label className="label">Email:</label>
                  <input type="email" className="input"
                        value={this.state.eEmail}
                        onChange={this.handleChange.bind(this, 'eEmail')}/>
                </div>
                <div className="field">
                  <label className="label">New Password:</label>
                  <input type="password" className="input"
                        value={this.state.eNewPw}
                        onChange={this.handleChange.bind(this, 'eNewPw')}/>
                </div>
              </div>
            </div>
            <footer className="card-footer">
              <button className="card-footer-item button is-large is-light" 
                  style={{display:"flex", flexDirection:"column"}}
                  onClick={this.props.exitEditMode}>Cancel</button>
              <button className="card-footer-item button is-large is-success" 
                  style={{display:"flex", flexDirection:"column"}}
                  onClick={this.edit.bind(this)}>Save</button>
            </footer>
          </div>)
        } else if (this.props.createMode) {
          info = (<div className="card">
            <div className="card-content">
              <div className="container">   
                <div className="field">
                  <label className="label">First Name:</label>
                  <input type="text" 
                        className="input" 
                        value={this.state.cFName}
                        onChange={this.handleChange.bind(this, 'cFName')}/>
                </div>
                <div className="field">
                  <label className="label">Last Name:</label>
                  <input type="text" 
                        className="input" 
                        value={this.state.cLName}
                        onChange={this.handleChange.bind(this, 'cLName')}/>
                </div>
                <div className="field">
                  <label className="label">Role:</label>
                  <div className="control">
                    <div className="select">
                      <select value={this.state.cRole} onChange={this.handleChange.bind(this,'cRole')}>
                        {
                          roles.map((r,i) => (<option key={i}>{r}</option>))
                        }
                      </select>
                    </div>
                  </div>
                </div>
                <div className="field">
                  <label className="label">Email:</label>
                  <input type="email" className="input"
                        value={this.state.cEmail}
                        onChange={this.handleChange.bind(this, 'cEmail')}/>
                </div>
                <div className="field">
                  <label className="label">Password:</label>
                  <input type="password" className="input"
                        value={this.state.cPassword}
                        onChange={this.handleChange.bind(this, 'cPassword')}/>
                </div>
              </div>
            </div>
            <footer className="card-footer">
              <button className="card-footer-item button is-large is-light" 
                  style={{display:"flex", flexDirection:"column"}}
                  onClick={this.props.exitCreateMode}>Cancel</button>
              <button className="card-footer-item button is-large is-success" 
                  style={{display:"flex", flexDirection:"column"}}
                  onClick={this.create.bind(this)}>Save</button>
            </footer>
          </div>)
        }
        break;
      default:
        info = ( <div>fail</div> )
    }
  
    return info
  }
  
}

const mapStateToProps = state => {
  if(state.session.active && state.session.profile.role !== "USER") {
    return {
      profile: state.session.profile,
      editMode: state.session.status.editMode,
      createMode: state.session.status.createMode,
      selected: state.users.selected,
      users: state.users.list,
    }
  } else {
    return {
      profile: state.session.profile,
      editMode: state.session.status.editMode
    }
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getUsers : () => dispatch(getUsers()),
    createUser : (user) => dispatch(createUser(user)),
    editUser : (details) => dispatch(editUser(details)),
    deleteUser : (id) => () => dispatch(deleteUser(id)),
    enterEditMode : () => dispatch(enterEditMode()),
    exitEditMode : () => dispatch(exitEditMode()),
    enterCreateMode : () => dispatch(enterCreateMode()),
    exitCreateMode : () => dispatch(exitCreateMode()),
    clientError : (message) => dispatch(clientError(message))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserCard)