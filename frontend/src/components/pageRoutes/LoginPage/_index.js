import React from 'react'

const LoginPage = ()=> {
  return ( 
    <div className="container">
      <form>
        <div className="field">
          <label htmlFor="" className="label">email</label>
          <input type="text" className="input"/>
        </div>
        <div className="field">
          <label htmlFor="" className="label">password</label>
          <input type="password" className="input"/>
        </div>
      </form>
    </div>
  )
}

export default LoginPage