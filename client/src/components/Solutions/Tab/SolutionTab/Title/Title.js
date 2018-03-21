import React, { Component } from 'react'
import { Button, FormGroup, FormControl, Panel, Glyphicon } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as actions from '../../../../../actions'

class Title extends Component {
  state = {
    edit: false,
    content: this.props.title
  }

  editHandler = () => {
    this.setState({edit: true})
  }

  changeHandler = (value) => {
    this.setState({content: value})
  }

  saveOrCancel = async (shouldSave) => {
    if (!shouldSave) return this.setState({edit:false, content:this.props.title})
    await this.props.putTitle(this.props.solutionId, this.state.content)
    window.location.reload()
  }

  deleteHandler = async () => {
    await this.props.deleteSolution(this.props.solutionId)
    window.location.reload()
  }

  render() {
    let content = <Panel.Heading className="panel-heading clearfix"
                        style={{marginTop:"15px", marginBottom:"15px"}}>
                        <Button className="pull-right"style={{marginTop:"15px"}}
                          bsStyle="danger"
                          onClick={this.deleteHandler}>
                            <Glyphicon glyph="trash" />
                        </Button>
                        <h2 onDoubleClick={this.editHandler}>{this.state.content}</h2>
                  </Panel.Heading>
                  
    if (this.state.edit) {
      content = (
        <div>
          <Button style={{marginRight:"5px", marginTop:"5px"}}
            onClick={()=>this.saveOrCancel(false)}>Cancel</Button>
          
          <Button style={{marginRight:"5px", marginTop:"5px"}}
            onClick={()=>this.saveOrCancel(true)} 
                  bsStyle="primary">Save</Button>
          
          <FormGroup controlId="formBasicText" >
            <FormControl style={{marginTop:"5px"}}
              type="text"
              value={this.state.content}
              onChange={e => this.changeHandler(e.target.value)} />
          </FormGroup>
        </div>
      )
    }

    return content
  }
}

export default connect(null, actions)(Title)