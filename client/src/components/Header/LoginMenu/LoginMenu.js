import React from 'react'
import { NavDropdown, MenuItem } from 'react-bootstrap'

import './GoogleLogin.css'
const LoginMenu = ()=> 
      <NavDropdown eventKey={3} title="Sign In" id="login-dropdown">
        <MenuItem eventKey={3.1} className="login-menu" href="/auth/google">
          <div className="signIn"/>
        </MenuItem>
      </NavDropdown>

export default LoginMenu