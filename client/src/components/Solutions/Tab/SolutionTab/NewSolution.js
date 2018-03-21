import React, { Component } from 'react'
import { Panel, FormControl, FormGroup, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as actions from '../../../../actions'

class NewSolution extends Component {
  state = {
    title: "",
    description: "",
    code: "",
    type: "C++"
  }

  titleHandler = (value) => {
    this.setState({title:value})
  }

  descriptionHandler = (value) => {
    this.setState({description:value})
  }

  codeHandler = (value) => {
    this.setState({code:value})
  }

  typeHandler = (value) => {
    this.setState({type:value})
  }

  saveData = async () => {
    const newSolution ={
      title:this.state.title, 
      description:this.state.description,
      code: {
        type: this.state.type,
        content: this.state.code
      }
    }
    await this.props.postSolution(this.props.problemId, newSolution)
    window.location.reload()
  }

  render() {
    return (
      <Panel>
        <Button  
            style={{margin: "10px"}}
            onClick={this.saveData}
            bsStyle="primary">Submit</Button>
        
        <Panel.Heading>
          <Panel.Title>Title</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <FormGroup controlId="formBasicText" >
              <FormControl style={{marginTop:"5px"}}
                type="text"
                placeholder="Solution title"
                onChange={e => this.titleHandler(e.target.value)}/>
          </FormGroup>
        </Panel.Body>

        <Panel.Heading>
          <Panel.Title>Description</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <FormGroup controlId="formControlsTextarea" >
              <FormControl style={{marginTop:"5px"}}
                componentClass="textarea"
                placeholder="Intuitions, descriptions, algorithms, and etc."
                onChange={e => this.descriptionHandler(e.target.value)}
                rows={20} />
          </FormGroup>
        </Panel.Body>

        <Panel.Heading>
          <Panel.Title>Solution</Panel.Title>
        </Panel.Heading>
        
        <Panel.Body>
          <FormGroup controlId="formControlsSelect">
            <FormControl componentClass="select" placeholder="select"
                style={{width:"auto", marginTop:"5px"}}
                onChange={e => this.typeHandler(e.target.value)}>
              <option value="C++">C++</option>
              <option value="Java">Java</option>
              <option value="Python">Python</option>
              <option value="C">C</option>
              <option value="JavaScript">JavaScript</option>
            </FormControl>
          </FormGroup>
          <FormGroup controlId="formControlsTextarea" >
            <pre className="prettyprint">
              <FormControl 
                componentClass="textarea"
                onChange={e => this.codeHandler(e.target.value)}
                placeholder="Paste your code here."
                rows={30} />
            </pre>
          </FormGroup> 
        </Panel.Body>
      </Panel>
    ) 
  }
}

export default connect(null, actions)(NewSolution)