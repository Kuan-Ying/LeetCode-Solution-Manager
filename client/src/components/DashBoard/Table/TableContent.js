import React from 'react'
import TableRow from './TableRow'

const Content = (props) => {
  let content = null

  if (props.problems) {
    content= props.problems.map((problem) => {
      if (props.filters && props.filters.length !== 0){
        let matched = true
        for (let filter of props.filters) {
          let matchOne = (filter[1].length===0)
          for (let val of filter[1]) {
            if (problem[filter[0]] === val){
              matchOne = true
            }
          }
          matched = matchOne && matched
        }
        if (!matched) return 
      }

      return <TableRow key = {problem._id} 
        problem = {problem} 
        finished = {props.finished}/>
    })
  }
  return <tbody>{content}</tbody>
}

export default Content;
