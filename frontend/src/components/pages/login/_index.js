import React from 'react'

const LoginPage = ()=> {
  return ( 
    <div className="container">
      <form className="level" style={{display:"flex",alignItems:"center",justifyContent:"space-around"}}>
        <div className="level-left" style={{display:'flex', flexDirection:'column' , marginBottom:'30px', marginTop:'15px'}}>
          <h2 className="subtitle">Log in here</h2>
          <div className="field">
            <label htmlFor="" className="label">email</label>
            <input type="text" className="input"/>
          </div>
          <div className="field">
            <label htmlFor="" className="label">password</label>
            <input type="password" className="input"/>
          </div>
        </div>
        <div className="level-right" style={{display:'flex', flexDirection:'column', marginBottom:'30px', marginTop:'15px'}}>
          <h2 className="subtitle">Create a new account</h2>
          <div className="field">
            <label htmlFor="" className="label">First name</label>
            <input type="text" className="input"/>
          </div>
          <div className="field">
            <label htmlFor="" className="label">Last name</label>
            <input type="text" className="input"/>
          </div>
          <div className="field">
            <label htmlFor="" className="label">email</label>
            <input type="text" className="input"/>
          </div>
          <div className="field">
            <label htmlFor="" className="label">password</label>
            <input type="password" className="input"/>
          </div>
        </div>
      </form>
    </div>
  )
}

export default LoginPage