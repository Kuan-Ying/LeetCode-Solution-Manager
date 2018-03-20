import React from 'react'
import * as PROBLEM from '../../../../actions/problemSort'
const TableTitle = (props) => {
  return (
    <thead>
      <tr>
        <th className="text-center" scope="col"> </th>
        <th scope="col" 
          onClick={()=>props.clicked(PROBLEM.ID)}>#</th>
        <th scope="col" 
          onClick={()=>props.clicked(PROBLEM.TITLE)}>Title</th>
        <th className="text-center" scope="col">Solution</th>
        <th scope="col" 
          onClick={()=>props.clicked(PROBLEM.AC_RATE)}>Acceptance</th>
        <th scope="col" 
          onClick={()=>props.clicked(PROBLEM.DIFFICULTY)}>Difficulty</th>
        <th scope="col" 
          onClick={()=>props.clicked(PROBLEM.LIKES)}><i className="fa fa-thumbs-up text-success"></i></th>
        <th scope="col" 
          onClick={()=>props.clicked(PROBLEM.DISLIKES)}><i className="fa fa-thumbs-down text-danger"></i></th>
      </tr>
    </thead>
  )
}

export default TableTitle