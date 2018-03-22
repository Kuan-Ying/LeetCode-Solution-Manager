import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Button, FormGroup, FormControl, Panel } from 'react-bootstrap'
import './Description.css'
import { connect } from 'react-redux'
import * as actions from '../../../../../actions'
import Linkify from 'react-linkify'

class Description extends Component {
  state = {
    edit: this.props.edit,
    content: this.props.description
  }

  editHandler = () => {
    this.setState({edit: true})
  }

  changeHandler = (value) => {
    this.setState({content: value})
  }

  saveOrCancel = async (shouldSave) => {
    if (!shouldSave) return this.setState({edit:false, content:this.props.description})
    await this.props.putDescription(this.props.solutionId, this.state.content)
    this.setState({edit:false})
  }

  componentDidMount () {
    const MathJax = window.MathJax
    MathJax.Hub.Queue(["Typeset",MathJax.Hub, ReactDOM.findDOMNode(this)]);
  }

  componentDidUpdate () {
    const MathJax = window.MathJax
    MathJax.Hub.Queue(["Typeset",MathJax.Hub, ReactDOM.findDOMNode(this)]);
  }

  render() {
    let content = <p id="description" 
              onDoubleClick={this.editHandler}>{this.state.content}</p>

    if (this.state.edit) {
      content = (
        <div>
          <Button style={{marginRight:"5px", marginTop:"5px"}}
            onClick={()=>this.saveOrCancel(false)}>Cancel</Button>
          
          <Button style={{marginRight:"5px", marginTop:"5px"}}
            onClick={()=>this.saveOrCancel(true)} 
                  bsStyle="primary">Save</Button>
          
          <FormGroup controlId="formControlsTextarea" >
            <FormControl style={{marginTop:"5px"}}
              componentClass="textarea"
              value={this.state.content}
              onChange={e => this.changeHandler(e.target.value)}
              rows={20} />
          </FormGroup>
        </div>
      )
    }

    return (
      <Panel eventKey={this.props.eventKey}>
        <Panel.Heading>
          <Panel.Title toggle>Description</Panel.Title>
        </Panel.Heading>
        <Panel.Body collapsible>
          <Linkify>{content}</Linkify>
        </Panel.Body>
      </Panel>
    )
  }
}

export default connect(null, actions)(Description)
