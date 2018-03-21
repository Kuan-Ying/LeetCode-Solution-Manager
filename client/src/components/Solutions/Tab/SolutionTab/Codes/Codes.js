import React from 'react'
import { Tab, PanelGroup, Panel } from 'react-bootstrap'
import { Nav, NavItem, Row, Col, Glyphicon } from 'react-bootstrap'
import Code from './Code'
import NewCode from './NewCode'

const Codes = props => {
  let navItems = null
  let codes = null
  if (props.codes!==null) {
    navItems = props.codes.map((code, i) =>  
          <NavItem  key={i} eventKey={i === 0? "first":(i + 1)}>
            {code.type}
          </NavItem>
    )
    codes = props.codes.map((code, i)=>
        <Tab.Pane key={i} eventKey={i === 0? "first":(i + 1)}>
          <Code content={code.content} type={code.type} 
                solutionId={props.solutionId} codeId={code._id}/>
        </Tab.Pane>
    )
  }
  
  return (
    <PanelGroup accordion id="codes" defaultActiveKey={props.eventKey}>
      <Panel eventKey={props.eventKey}>
        <Panel.Heading>
          <Panel.Title toggle>
            Solution
          </Panel.Title>
        </Panel.Heading>
        <Panel.Body collapsible>
          <Tab.Container defaultActiveKey={props.codes?"first":"Last"}  
                id="code_content">
              <Row className="clearfix">
                <Col sm={12}>
                  <Nav bsStyle="tabs">
                    {navItems}
                    <NavItem eventKey="Last"><Glyphicon glyph="plus"/></NavItem>
                  </Nav>
                </Col>
                <Col sm={12}>
                  <Tab.Content>
                    {codes}
                    <Tab.Pane eventKey="Last">
                      <NewCode solutionId={props.solutionId}/>
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
          </Tab.Container>
        </Panel.Body>
      </Panel>
    </PanelGroup>
  )
}

export default Codes