import React, { Component } from 'react'
import { Tab, Nav, NavItem, Row, Col, Glyphicon } from 'react-bootstrap'

import SolutionTab from './SolutionTab/SolutionTab'
import NewSolution from './SolutionTab/NewSolution'
import './Solutions.css'

import { connect } from 'react-redux'
import * as actions from '../../actions'

class Solutions extends Component {
  async componentDidMount() {
    await this.props.fetchSolutions(this.props.match.params.id)
  }

  render() {
    const tabContents = (this.props.solutions)? 
      this.props.solutions.map(
          (solution, i) =>
            <Tab.Pane key={i} eventKey={i === 0? "first":(i + 1)}>
              <SolutionTab 
                problemId={this.props.match.params.id}
                solutionId={solution._id}
                title={solution.title}
                description={solution.description}
                codes={solution.codes}/>
            </Tab.Pane>
      ): null
    
    const tabNavs = (this.props.solutions)? 
      this.props.solutions.map(
        (solution, i) =>  
          <NavItem key={i} eventKey={i === 0 ? "first" : (i + 1)}>
            {solution.title}
          </NavItem>
      ):null

    return (
      <Tab.Container defaultActiveKey="first"  
                  id="content">
                <Row className="clearfix">
                  <Col sm={12}>
                    <Nav bsStyle="tabs">
                      {tabNavs}
                      <NavItem eventKey="Last"><Glyphicon glyph="plus"/></NavItem>
                    </Nav>
                  </Col>
                  <Col sm={12}>
                    <Tab.Content>
                      {tabContents}
                      <Tab.Pane eventKey="Last">
                        <NewSolution problemId={this.props.match.params.id}/>
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
      </Tab.Container>
    )
  }
}

function mapStateToProps({solutions}){
  return {solutions}
}

export default connect(mapStateToProps, actions)(Solutions)