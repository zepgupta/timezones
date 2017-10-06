import React from 'react'
import { connect } from 'react-redux'

const roles = ['USER', 'ADMIN']

const TimezoneCard = props => {
  let component;

  switch(props.user.role){
    case 'USER':
    case 'ADMIN':
      if(!props.editMode) {
        component = (<div className="card">
          <div className="card-content">
            <h1 className="title">{props.timezone.name}</h1>
            <div className="container">   
              <div className="field">
                <label className="label">City:</label>
                <h2 className="subtitle">&nbsp;{props.timezone.city}</h2>
              </div>
              <div className="field">
                <label className="label">Local Time:</label>
                <h2 className="subtitle">&nbsp;{props.timezone.localTime}</h2>
              </div>
              <div className="field">
                <label className="label">UTC Offset:</label>
                <h2 className="subtitle">&nbsp;{props.timezone.utcOffset}</h2>
              </div>
            </div>
          </div>
          <footer className="card-footer">
            <div className="card-footer-item"></div>
            <button className="card-footer-item button is-large" style={{display:"flex", flexDirection:"column"}}>Edit</button>
          </footer>
        </div>)
      } else {
        component = (<div className="card">
          <div className="card-content">
            <label className="label">Name:</label>
            <input type="text" className="input"/>
            <div className="container">
              <div className="field">
                <label className="label">City:</label>
                <h2 className="subtitle">&nbsp;{props.timezone.city}</h2>
              </div>
              <div className="field">
                <label className="label">Local Time:</label>
                <h2 className="subtitle">&nbsp;{props.timezone.localTime}</h2>
              </div>
              <div className="field">
                <label className="label">UTC Offset:</label>
                <h2 className="subtitle">&nbsp;{props.timezone.utcOffset}</h2>
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
      component = ( <div>fail</div> )
  }

  return component
}

const mapDispatchToProps = dispatch => {

}

export default connect()(TimezoneCard)