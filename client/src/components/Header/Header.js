import React, { Component } from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { connect } from 'react-redux'
import LoginMenu from './LoginMenu/LoginMenu'
import UserMenu from './UserMenu/UserMenu'

class Header extends Component {
  renderContent() {
    switch(this.props.auth) {
      case false:
        return <LoginMenu />
      case null:
        return <LoginMenu />
      default:
        return <UserMenu auth={this.props.auth}/>
    }
  }
  
  render() {
    return (
      <div>
      <Navbar inverse collapseOnSelect> 
        <Navbar.Header>
          <LinkContainer to="/">
            <Navbar.Brand>LeetNotes</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to="/problemset">
              <NavItem>Problems</NavItem>
            </LinkContainer>
          </Nav>
          <Nav>
            <LinkContainer to="/problemset/Google">
              <NavItem>Google</NavItem>
            </LinkContainer>
          </Nav>
          <Nav>
            <LinkContainer to="/problemset/Facebook">
              <NavItem>Facebook</NavItem>
            </LinkContainer>
          </Nav>
          <Nav pullRight>{this.renderContent()}</Nav>
        </Navbar.Collapse>
      </Navbar>
      </div>
    )
  }
}

function mapStateToProps({auth}) {
  return { auth }
}

export default connect(mapStateToProps)(Header);