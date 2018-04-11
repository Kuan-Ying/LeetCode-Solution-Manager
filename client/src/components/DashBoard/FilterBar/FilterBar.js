import React, {Component} from 'react';
import {Nav, Navbar, Form, FormControl, FormGroup, ToggleButtonGroup, ToggleButton} from 'react-bootstrap';
import DiffDropdown from './DiffDropdown/DiffDropdown'
import { DIFFICULTY_VALUE } from './DiffDropdown/fields'
import './FilterBar.css'

class FilterBar extends Component{
  state = {
    isActive:[false,false,false],
    content: ""
  }

  diffDropdownHandler = (difficulty) => {
    let isActive = this.state.isActive
    isActive[difficulty] = !isActive[difficulty]
    this.setState({isActive:isActive})
    this.props.filtered("difficulty", DIFFICULTY_VALUE[difficulty])
  }

  changeHandler = value => {
    this.setState({content: value})
    this.props.filtered("tags", value)
  }

  render(){
    return (
      <Navbar fluid>
        <Navbar.Header>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Form pullLeft>
            <FormGroup>
              <FormControl type="text" placeholder="Search Problem ID, title, or tag" 
                value={this.state.content}
                onChange={e => this.changeHandler(e.target.value)} />
            </FormGroup>
          </Navbar.Form>
          <Nav pullRight>
            <NavWrap>
              <ToggleButtonGroup type="checkbox"> 
                <ToggleButton value={1} onChange={()=>{this.props.filtered("finished", true)}}>Finished</ToggleButton>
                <ToggleButton value={2} onChange={()=>{this.props.filtered("isPremium", false)}}>Free Only</ToggleButton>
              </ToggleButtonGroup>
              <DiffDropdown clicked={this.diffDropdownHandler} isActive={this.state.isActive}/>
            </NavWrap>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

// Cannot wrap custom item with react-boostrap Nav directly,
// see https://github.com/react-bootstrap/react-bootstrap/issues/2895.
const NavWrap = props => {
  const {
    active,
    activeKey,
    activeHref,
    onSelect,

    children,
    ...otherProps
  } = props;
  return (<li role="presentation" {...otherProps}>
    {children}
  </li>);
}

export default FilterBar

