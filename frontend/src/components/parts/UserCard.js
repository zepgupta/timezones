import React from 'react'
import { connect } from 'react-redux'

const roles = ['USER', 'USERMANAGER', 'ADMIN']

const userCard = props => {

  let info;
  switch(props.user.role){
    case 'USER':
      if(!props.editMode) {
        info = (<div className="card">
          <div className="card-content">
            <h1 className="title">{props.user.firstName} {props.user.lastName}</h1>
            <div className="container">   
              <div className="field">
                <label className="label">Role:</label>
                <h2 className="subtitle">&nbsp;{props.user.role}</h2>
              </div>
              <div className="field">
                <label className="label">Email:</label>
                <h2 className="subtitle">&nbsp;{props.user.email}</h2>
              </div>
            </div>
          </div>
          <footer className="card-footer">
            <div className="card-footer-item"></div>
            <button className="card-footer-item button is-large" style={{display:"flex", flexDirection:"column"}}>Edit</button>
          </footer>
        </div>)
      } else {
        info = (<div className="card">
          <div className="card-content">
            <h1 className="title">{props.user.firstName} {props.user.lastName}</h1>
            <div className="container">
              <div className="field">
                <label className="label">Role:</label>
                <h2 className="subtitle">&nbsp;{props.user.role}</h2>
              </div>
              <div className="field">
                <label className="label">Email:</label>
                <input type="email" className="input"/>
              </div>
              <div className="field">
                <label className="label">Old Password:</label>
                <input type="password" className="input"/>
              </div>
              <div className="field">
                <label className="label">New Password:</label>
                <input type="password" className="input"/>
              </div>
            </div>
          </div>
          <footer className="card-footer">
            <button className="card-footer-item button is-large is-light" style={{display:"flex", flexDirection:"column"}}>Cancel</button>
            <button className="card-footer-item button is-large is-success" style={{display:"flex", flexDirection:"column"}}>Save</button>
          </footer>
        </div>)
      }
      break;
    case "USERMANAGER":
    case 'ADMIN':
      if(!props.editMode) {
        info = (<div className="card">
          <div className="card-content">
            <h1 className="title">{props.user.firstName} {props.user.lastName}</h1>
            <div className="field">
              <label className="label">Role:</label>
              <h2 className="subtitle">&nbsp;{props.user.role}</h2>
            </div>
            <div className="field">
              <label className="label">Email:</label>
              <h2 className="subtitle">&nbsp;{props.user.email}</h2>
            </div>
          </div>
          <footer className="card-footer">
            <div className="card-footer-item"></div>
            <button className="card-footer-item button is-large" style={{display:"flex", flexDirection:"column"}}>Edit</button>
          </footer>
        </div>)
      } else {
        info = (<div className="card">
          <div className="card-content">
            <h1 className="title">{props.user.firstName} {props.user.lastName}</h1>
            <div className="container">   
              <div className="field">
                <label className="label">Role:</label>
                <div className="control">
                  <div className="select">
                    <select>
                      {
                        roles.map((r,i) => (<option key={i}>{r}</option>))
                      }
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="label">Email:</label>
                <input type="email" className="input"/>
              </div>
              <div className="field">
                <label className="label">New Password:</label>
                <input type="password" className="input"/>
              </div>
            </div>
          </div>
          <footer className="card-footer">
            <button className="card-footer-item button is-large is-light" style={{display:"flex", flexDirection:"column"}}>Cancel</button>
            <button className="card-footer-item button is-large is-success" style={{display:"flex", flexDirection:"column"}}>Save</button>
          </footer>
        </div>)
      }
      break;
    default:
      info = ( <div>fail</div> )
  }

  return info
}

const mapDispatchToProps = dispatch => {

}

export default connect()(userCard)