import React from 'react'
import { connect } from 'react-redux'

import { getTimezones,
  createTimezone,
  editTimezone,
  deleteTimezone,
  enterEditMode,
  exitEditMode,
  enterCreateMode,
  exitCreateMode, } from '../../actions'

class TimezoneCard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      newId: '',
      newName: '',
      newCity: '',
      editName: '',
    }
  }
  
  handleChange(field, e) {
    let change = {[field]: e.target.value}
    this.setState(change)
  }
  create() {
    this.props.createTimezone({name: this.state.newName, city: this.state.newCity, userId: this.state.newId || this.props.profile.id})
  }
  edit() {
    this.props.editTimezone({
      name: this.state.editName, 
      userId: this.props.timezones.filter(t => t.id === this.props.selected)[0].userId, 
      id: this.props.selected})
  }
  render(){
    let component;
    let timezone = {
      name: "",
      city: "",
      localTime: "",
      utcOffset: '',
      userId: null
    }
    if(this.props.timezones.length){
      timezone = this.props.timezones.filter(t => parseInt(t.id) === parseInt(this.props.selected))[0]
    }
    if(!this.props.editMode && !this.props.createMode) {
      component = (<div className="card">
        <div className="card-content">
      {this.props.timezones.length ?
          <button className="delete is-medium is-pulled-right" 
              style={{marginRight:"5px",marginTop:"5px"}}
              onClick={this.props.deleteTimezone(timezone.userId)}></button> : ''}
          <h1 className="title">{timezone.name}</h1>
          <div className="container">   
            <div className="field">
              <label className="label">City:</label>
              <h2 className="subtitle">&nbsp;{timezone.city}</h2>
            </div>
            <div className="field">
              <label className="label">Local Time:</label>
              <h2 className="subtitle">&nbsp;{timezone.localTime}</h2>
            </div>
            <div className="field">
              <label className="label">UTC Offset:</label>
              <h2 className="subtitle">&nbsp;{timezone.utcOffset}</h2>
            </div>
          </div>
        </div>
        <footer className="card-footer">
        {this.props.timezones.length ?
          <button className="card-footer-item button is-large is-light" 
                style={{display:"flex", flexDirection:"column"}}
                onClick={this.props.enterEditMode}>Edit</button> : <div className="card-footer-item"></div> }
          <button className="card-footer-item button is-large" 
                style={{display:"flex", flexDirection:"column"}}
                onClick={this.props.enterCreateMode}>New</button>
        </footer>
      </div>)
    } else if(this.props.editMode) {
      component = (<div className="card">
        <div className="card-content">
          <label className="label">Name:</label>
          <input type="text" className="input" value={this.state.editName} onChange={this.handleChange.bind(this, 'editName')}/>
          <div className="container">
            <div className="field">
              <label className="label">City:</label>
              <h2 className="subtitle">&nbsp;{timezone.city}</h2>
            </div>
            <div className="field">
              <label className="label">Local Time:</label>
              <h2 className="subtitle">&nbsp;{timezone.localTime}</h2>
            </div>
            <div className="field">
              <label className="label">UTC Offset:</label>
              <h2 className="subtitle">&nbsp;{timezone.utcOffset}</h2>
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
      component = (<div className="card">
        <div className="card-content">
      {this.props.profile.role === "ADMIN" ? 
          <div className="field">
            <label className="label">User ID:</label>
            <input type="text" className="input" value={this.state.newId} onChange={this.handleChange.bind(this, 'newId')}/>
          </div>: ''}
          <div className="field">
            <label className="label">Name:</label>
            <input type="text" className="input" value={this.state.newName} onChange={this.handleChange.bind(this, 'newName')}/>
          </div>
          <div className="field">
            <label className="label">City:</label>
            <input type="text" className="input" value={this.state.newCity} onChange={this.handleChange.bind(this, 'newCity')}/>
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

    return component
  }
}

const mapStateToProps = state => {
    return {
      editMode: state.session.status.editMode,
      createMode: state.session.status.createMode,
      timezones: state.timezones.list,
      selected: state.timezones.selected,
      profile: state.session.profile
    }
}
const mapDispatchToProps = dispatch => {
  return {
    getTimezones : () => dispatch(getTimezones()),
    createTimezone : (profile) => dispatch(createTimezone(profile)),
    editTimezone : (details) => dispatch(editTimezone(details)),
    deleteTimezone : (userId) => () => dispatch(deleteTimezone(userId)),
    enterEditMode : () => dispatch(enterEditMode()),
    exitEditMode : () => dispatch(exitEditMode()),
    enterCreateMode : () => dispatch(enterCreateMode()),
    exitCreateMode : () => dispatch(exitCreateMode()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TimezoneCard)