import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const Header = () => {
  let {user, logoutUser} = useContext(AuthContext)
  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4 ">
        <div className='container-fluid'> 
          <Link to="/" className="navbar-brand" href="#">Home</Link>
          <div className='float-left'>
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              {user && <li className="nav-item">Hello {user.username}</li>}
              {user ? <li className="nav-item"><Link onClick={logoutUser} className="nav-link" >Logout</Link></li> : <li className="nav-item"><Link to="/login" className="nav-link" >Login</Link></li>}
              {/* <li className="nav-item">
                <Link to="/login" className="nav-link" >Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link" >Register</Link>
              </li> */}
            </ul>
          </div>
      </div>
      </nav>
    </div>
  )
}

export default Header
