import React from 'react'
import { DropdownButton, MenuItem, Glyphicon } from 'react-bootstrap'
import { EASY, MEDIUM, HARD } from './fields'
const DiffDropdown = (props)=> {
  return (
    <DropdownButton  title="Difficulty" id="bg-nested-dropdown">
      <MenuItem eventKey={3.1} onSelect={() => props.clicked(EASY)}>
        <Glyphicon glyph="ok" style={diffStyle(props.isActive[EASY])} />
        Easy
            </MenuItem>
      <MenuItem divider />
      <MenuItem eventKey={3.2} onSelect={() => props.clicked(MEDIUM)}>
        <Glyphicon glyph="ok" style={diffStyle(props.isActive[MEDIUM])} />
        Medium
            </MenuItem>
      <MenuItem divider />
      <MenuItem eventKey={3.3} onSelect={() => props.clicked(HARD)}>
        <Glyphicon glyph="ok" style={diffStyle(props.isActive[HARD])} />
        Hard
      </MenuItem>
    </DropdownButton>
  )
}

const diffStyle = (isActive) => (isActive)?{"color":"#5baf38","marginRight": "10px"}: 
            {visibility: "hidden", "marginRight": "10px"}

export default DiffDropdown