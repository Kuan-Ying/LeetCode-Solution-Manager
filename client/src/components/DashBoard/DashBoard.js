import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import { connect } from 'react-redux';
import * as actions from '../../actions';
import TableTitle from './Table/TableTitle'
import TableContent from './Table/TableContent'
import FilterBar from './FilterBar/FilterBar'
import problemSort from './problemSort'
import './DashBoard.css'

class DashBoard extends Component {
  state = {
    cursor: null,
    reverse: false,
    filters: new Map(),
    titleFilter: ""
  }

  sortTableHandler = (pos) => {
    const reverse = pos === this.state.cursor && !this.state.reverse
    this.setState({cursor: pos, reverse: reverse})
  }

  finishHandler = async (id, finished) => {
    await this.props.putFinished(id, finished)
  }

  filterHandler = (attr, value)=> {
    const filters = this.state.filters
    switch (attr) {
      case "difficulty":
        if (filters.has("difficulty")) {
          if (filters.get(attr).includes(value)) {
            filters.set(attr, filters.get(attr).filter(item => item !== value))
            if (filters.get(attr).length === 0) {
              filters.delete(attr)
            }
          } else {
            filters.get(attr).push(value)
          }
        } else {
          filters.set(attr,[value])
        }
        break
      case "finished":
        if (filters.has('finished')) {
          filters.delete('finished')
        } else {
          filters.set('finished', true)
        }
        break
      case "isPremium":
        if (filters.has("isPremium")) {
          filters.delete("isPremium")
        } else {
          filters.set("isPremium", false)
        }
        break
      case "tags":
        if (value === "") {
          if (filters.has("title")) filters.delete("title")
          if (filters.has("id")) filters.delete("id")
          filters.delete("tags")
        } else if (!isNaN(value)) {
          filters.set("id", value)
        } else {
          if (filters.has("id")) filters.delete("id")
          filters.set("title", value.split(' ').filter(v => v !== ""))
          filters.set("tags",value.split(' ').filter(v => v !== ""))
        }
    }
    this.setState({filters: filters})
  }

  renderContent = () => {
    const filters = this.state.filters
    const problems = this.props.problems
                        .filter(problem => tagFilter(problem, filters))
    if (this.state.cursor) problemSort(problems, this.state.cursor, this.state.reverse)
    return <TableContent problems = {problems} 
                        finished = {this.finishHandler}
                        sendStatics = {this.statHandler}/>
  }

  render(){
    return (
      <div className="container background">
        <FilterBar filtered={this.filterHandler}
                 search = {this.searchHandler}/>
        <Table striped condensed hover>
          <TableTitle clicked={this.sortTableHandler}/>
          {this.renderContent()}
        </Table>
      </div>
    )
  }
}

function mapStateToProps({problems}){
  return {problems}
}

const tagFilter = (problem, filters) => {
  if (filters.size === 0) return true
  let match = [...filters.entries()].reduce(
      (total, [key, value], index) =>  {
        if (!Array.isArray(value)) return total && value == problem[key]
        if (!Array.isArray(problem[key])) {
          return total && ([...value].some(
            v => problem[key].toLowerCase().includes(v.toLowerCase())
          ))  
        }
        return total
      }, true)
  return match
}

export default connect(mapStateToProps, actions)(DashBoard)