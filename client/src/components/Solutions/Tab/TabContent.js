import React from 'react'
import { Tab } from 'react-bootstrap'
import SolutionTab from './SolutionTab/SolutionTab'
import NewSolution from './SolutionTab/NewSolution'

const TabContents = props => 
  <Tab.Content>
    {
      (props.solutions)? 
        props.solutions.map(
          (solution, i) =>
            <Tab.Pane key={i} eventKey={i === 0 ? "first" : (i + 1)}>
              <SolutionTab
                problemId={props.problemId}
                solutionId={solution._id}
                title={solution.title}
                description={solution.description}
                codes={solution.codes} />
            </Tab.Pane>
        ) : null
    }
    <Tab.Pane eventKey="Last">
      <NewSolution problemId={props.problemId} />
    </Tab.Pane>
  </Tab.Content>

export default TabContents
