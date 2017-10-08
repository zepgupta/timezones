import React from 'react'
import { connect } from 'react-redux'

const Busy = (props)=> {
  if(props.busy){
    return (
      <div className="is-loading is-overlay" style={{zIndex: "10",position:"fixed", top:"0", left:"0", right:"0", bottom: "0", backgroundColor:"black", opacity:".5"}}>
      </div>
    )
  } else {
    return null
  }
}

const mapStateToProps = (state)=>{
  return {
    busy: state.session.status.busy
  }
}

export default connect(mapStateToProps)(Busy)