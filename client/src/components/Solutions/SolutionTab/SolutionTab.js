import React from 'react'
import { PanelGroup } from 'react-bootstrap'
import Codes from './Codes/Codes'
import Description from './Description/Description'
import Title from './Title/Title'

const SolutionTab = props => {
  return (
    <PanelGroup accordion id="Solution" defaultActiveKey="1">
      <Title solutionId={props.solutionId}
        title={props.title} />
      <Description eventKey="1" solutionId={props.solutionId}
        description={props.description} />
      <Codes eventKey="2" solutionId={props.solutionId}
        codes={props.codes} />
    </PanelGroup>
  ) 
}

export default SolutionTab