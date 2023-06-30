import React,{useEffect, useContext } from 'react'
import {Route, useNavigate , Routes} from 'react-router-dom'
import AuthContext from '../context/AuthContext'


const PrivateRoute = ({children, ...rest}) => {
    
    let {user} = useContext(AuthContext)
    const navigate= useNavigate()

    useEffect(() => {
      if (!user) {
        navigate('/login');
      }
    }, [user, navigate]);

    return (
    <Routes>
        {/* <Route {...rest}>{!authenticated ? navigate('/login') : children}</Route> */}
        {user ? <Route {...rest}>{children}</Route>:null}
    </Routes>
  )
}

export default PrivateRoute
