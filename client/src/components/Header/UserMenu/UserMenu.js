import React from 'react'
import { NavDropdown, MenuItem } from 'react-bootstrap'

const UserMenu = props => 
      <NavDropdown eventKey={3} title={props.auth.username} id="basic-nav-dropdown">
        <MenuItem eventKey={3.1} href="/api/logout">
          Sign Out
        </MenuItem>
      </NavDropdown>

export default UserMenu