import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import { connect } from 'react-redux';
import * as actions from '../../actions';
import TableTitle from './Table/TableTitle'
import TableContent from './Table/TableContent'
import FilterBar from './FilterBar/FilterBar'
import './DashBoard.css'

class DashBoard extends Component {
  state = {
    cursor: 0,
    reverse: false,
    filters:[],
    titleFilter: ""
  }

  sortTableHandler = (pos) => {
    const reverse = pos === this.state.cursor && !this.state.reverse
    this.props.sortData(this.props.problems, pos, reverse)
    this.setState({cursor: pos, reverse: reverse})
  }

  finishHandler = async (id, finished) => {
    await this.props.putFinished(id, finished)
  }

  filterHandler = (attr, value)=> {
    let filters = this.state.filters
    let added = false
    filters = filters.map((filter)=>{
      if (filter[0] === attr) {
        added = true
        let found = false
        filter[1] = filter[1].filter(val=> {
          if (val===value) found = true
          return val!==value
        })
        if (!found) filter[1].push(value)
      }
      return filter
    })
    if (!added) filters.push([attr,[value]])
    this.setState({filters:filters})
  }


  searchHandler = (value) => {
  }


  render(){
    return (
      <div className="container background">
        <FilterBar filtered={this.filterHandler}
                 search = {this.searchHandler}/>
        <Table striped condensed hover>
          <TableTitle clicked={this.sortTableHandler}/>
          <TableContent problems = {this.props.problems} 
                        finished = {this.finishHandler}
                        filters = {this.state.filters}
                        sendStatics = {this.statHandler}/>
        </Table>
      </div>
    )
  }
}

function mapStateToProps({problems}){
  return {problems}
}

export default connect(mapStateToProps, actions)(DashBoard)