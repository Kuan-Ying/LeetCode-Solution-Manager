import React, {Component} from 'react';
import {ButtonGroup, ToggleButtonGroup, ToggleButton} from 'react-bootstrap';
import DiffDropdown from './DiffDropdown/DiffDropdown'
import { DIFFICULTY_VALUE } from './DiffDropdown/fields'

class FilterBar extends Component{
  state = {
    isActive:[false,false,false]
  }

  diffDropdownHandler = (difficulty) => {
    let isActive = this.state.isActive
    isActive[difficulty] = !isActive[difficulty]
    this.setState({isActive:isActive})
    this.props.filtered("difficulty", DIFFICULTY_VALUE[difficulty])
  }

  render(){
    return (
      <ButtonGroup>
          <DiffDropdown clicked={this.diffDropdownHandler} isActive={this.state.isActive}/>
          <ToggleButtonGroup type="checkbox"> 
            <ToggleButton value={1} onChange={()=>{this.props.filtered("finished", true)}}>Finished</ToggleButton>
            <ToggleButton value={2} onChange={()=>{this.props.filtered("isPremium", false)}}>Free Only</ToggleButton>
          </ToggleButtonGroup>
      </ButtonGroup>
    )
  }
}

export default FilterBar

