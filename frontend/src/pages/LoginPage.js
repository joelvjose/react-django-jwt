import React,{useContext, useState} from 'react'
import AuthContext from '../context/AuthContext'

const LoginPage = () => {

    let {loginUser} = useContext(AuthContext)

  return (
    <div>
       <body className="text-center">
        <form className="form-signin" onSubmit={loginUser}>
          <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
          <input name='username' type="text"  className="form-control" placeholder="Username" required />
          <input name='password' type="password"  className="form-control" placeholder="Password" required />
          <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        </form>
      </body>
    </div>
  )
}

export default LoginPage
