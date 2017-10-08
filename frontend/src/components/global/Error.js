import React from 'react'
import { connect } from 'react-redux'

import { clearError } from '../../actions'

const Error = (props)=> {
  if(props.error){
    return (
      <div className="notification is-warning" style={{zIndex:50, margin: "auto",position: "absolute",top: 0, left: 0, bottom: 0, right: 0, width:"300px", height:"200px"}}>
        <button className="delete" onClick={props.clearError}></button>
        {props.error}
      </div>
    )
  } else {
    return null
  }
}

const mapStateToProps = (state)=>{
  return {
    error: state.session.status.error
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    clearError: ()=> dispatch(clearError())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Error)