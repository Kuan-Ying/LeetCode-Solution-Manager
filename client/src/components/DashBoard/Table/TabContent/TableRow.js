import React, {Component} from 'react';
import {Label, Button, Glyphicon} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../../actions';

class TableRow extends Component {
  state = {...this.props.problem}

  clickHandler = async () => {
    await this.props.putFinished(this.state._id)
    this.setState({finished:!this.state.finished})
  }

  render() {
    const diffStyle = (this.state.difficulty === "Easy")? 
                        "success":
                        (this.state.difficulty === "Medium")?
                        "warning":"danger"
    const finishStyle = {color: this.state.finished ? '#5baf38': '#efefef'}
    const finishButton = (this.props.auth)? <Glyphicon glyph="ok" style={finishStyle}
                            onClick = {this.clickHandler}/>: null
    const solutionLink = (this.props.auth)?<Link to={'/solutions/' + this.state.id}>
                            <Glyphicon glyph="floppy-disk" />
                          </Link>: null
    let locked = (this.state.isPremium)?<i className="fa fa-lock"></i>:null
    
    return (
      <tr>
        <td className="text-center">
          {finishButton}
        </td>
        <td>{this.state.id}</td>
        <td><a href={this.state.url}>{this.state.title}  {locked}</a></td>
        <td className="text-center">
          {solutionLink}
        </td>
        <td>{this.state.acRate+"%"}</td>
        <td>
            <Label bsStyle={diffStyle}>{this.state.difficulty}</Label>
        </td>
        <td>{(this.state.likes > -1)?this.state.likes: null}</td>
        <td>{(this.state.dislikes > -1)? this.state.dislikes: null}</td>
      </tr>
    )
  }
} 

function mapStateToProps({auth}) {
  return { auth }
}

export default connect(mapStateToProps, actions)(TableRow)