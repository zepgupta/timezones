import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../actions'

const Header = (props) => {
  let nav
  if(props.active) {
    if(props.role === "ADMIN"){
      nav = (
      <div className="level">
        <div className="level-left">
          <Link to="/users" style={{color:"white",paddingLeft:'20px',paddingBottom:'10px'}}>Users</Link>
          <Link to="/timezones" style={{color:"white",paddingLeft:'20px',paddingBottom:'10px'}}>Timezones</Link>
        </div>
      </div>)
    } else if (props.role === "USER") {
      nav= (
      <div className="level">
        <div className="level-left">
          <Link to="/users" style={{color:"white",paddingLeft:'20px',paddingBottom:'10px'}}>Profile</Link>
          <Link to="/timezones" style={{color:"white",paddingLeft:'20px',paddingBottom:'10px'}}>Timezones</Link>
        </div>
      </div>)
    }
  }

  return ( <section className="hero" style={{backgroundColor: 'Black'}}>
    <div className="hero-body">
      <div className="container">
        <h1 className="title is-pulled-left" style={{color:'white'}}>
          Toptal Timezone Test
        </h1>
        { props.active ? 
          <button onClick={props.logout} className="button is-pulled-right is-black">Log out</button>
        : '' }
      </div>
    </div>
    { nav }
  </section> )
}
const mapStateToProps = (state) => {
  return {
    active: state.session.active,
    role: state.session.profile.role,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Header)