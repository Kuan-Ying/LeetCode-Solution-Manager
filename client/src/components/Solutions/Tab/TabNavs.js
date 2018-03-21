import React from 'react'
import { Nav, NavItem, Glyphicon } from 'react-bootstrap'

const TabNavs = props => 
  <Nav bsStyle="tabs">
    {
      (props.solutions) ?
        props.solutions.map(
          (solution, i) =>
            <NavItem key={i} eventKey={i === 0 ? "first" : (i + 1)}>
              {solution.title}
            </NavItem>
        ) : null
    }
    <NavItem eventKey="Last"><Glyphicon glyph="plus" /></NavItem>
  </Nav>

export default TabNavs