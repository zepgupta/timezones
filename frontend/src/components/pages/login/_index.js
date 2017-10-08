import React from 'react'
import { connect } from 'react-redux'

import { submitLogin, submitCreateAccount } from '../../../actions'

class LoginPage extends React.Component {

  constructor(){
    super()
    this.state = {
      lEmail: '',
      lPw: '',
      cFName: '',
      cLName: '',
      cEmail: '',
      cPw: '',
    }
  }

  handleChange(field, e) {
    let change = {[field]: e.target.value}
    this.setState(change)
  }
  handleLogin() {
    this.props.submitLogin({email: this.state.lEmail, password: this.state.lPw})
  }
  handleCreateAccount() {
    this.props.submitCreateAccount({
      firstName: this.state.cFName,
      lastName: this.state.cLName,
      email: this.state.cEmail,
      password: this.state.cPw
    })
  }
  
  render() {
    return ( 
      <div className="container">
        <form className="level" style={{display:"flex",alignItems:"center",justifyContent:"space-around"}}>
          <div className="level-left" style={{display:'flex', flexDirection:'column' , marginBottom:'30px', marginTop:'15px'}}>
            <h2 className="subtitle">Log in here</h2>
            <div className="field">
              <label className="label" >Email</label>
              <input type="text" className="input" value={this.state.lEmail} onChange={this.handleChange.bind(this, 'lEmail')}/>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <input type="password" className="input" value={this.state.lPw} onChange={this.handleChange.bind(this, 'lPw')}/>
            </div>
            <button className="button is-active" onClick={this.handleLogin.bind(this)}>Log in</button>
          </div>
          <div className="level-right" style={{display:'flex', flexDirection:'column', marginBottom:'30px', marginTop:'15px'}}>
            <h2 className="subtitle">Create a new account</h2>
            <div className="field">
              <label className="label">First name</label>
              <input type="text" className="input" value={this.state.cFName} onChange={this.handleChange.bind(this, 'cFName')}/>
            </div>
            <div className="field">
              <label className="label">Last name</label>
              <input type="text" className="input" value={this.state.cLName} onChange={this.handleChange.bind(this, 'cLName')}/>
            </div>
            <div className="field">
              <label className="label">Email</label>
              <input type="text" className="input" value={this.state.cEmail} onChange={this.handleChange.bind(this, 'cEmail')}/>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <input type="password" className="input" value={this.state.cPw} onChange={this.handleChange.bind(this, 'cPw')}/>
            </div>
            <button className="button is-active" onClick={this.handleCreateAccount.bind(this)}>Create</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitLogin: (creds) => dispatch(submitLogin(creds)),
    submitCreateAccount: (creds) => dispatch(submitCreateAccount(creds))
  }
}

export default connect(null, mapDispatchToProps)(LoginPage)