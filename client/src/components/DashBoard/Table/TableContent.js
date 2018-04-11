import React from 'react'
import TableRow from './TableRow'

const Content = (props) => {
  let content = null

  if (props.problems) {
    content= props.problems.map((problem) => {
      return <TableRow key = {problem._id} 
        problem = {problem} 
        finished = {props.finished}/>
    })
  }
  return <tbody>{content}</tbody>
}

export default Content;
