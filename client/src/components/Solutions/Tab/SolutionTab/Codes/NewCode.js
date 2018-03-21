import React, {Component} from 'react'
import { FormControl, FormGroup, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as actions from '../../../../../actions'

class NewCode extends Component {
  state = {
    content: "",
    type: "C++"
  }

  codeHandler = value => {
    this.setState({content: value})
  }

  typeHandler = value => {
    this.setState({type: value})
  }

  saveData = async () => {
    await this.props.postCode(this.props.solutionId, {content:this.state.content,type: this.state.type})
    window.location.reload()
  }

  render(){
    return (
      <div>
        <Button style={{marginTop:"5px", marginBottom:"5px"}}
            onClick={this.saveData}
            bsStyle="primary">Submit</Button>
        <FormGroup controlId="formControlsSelect">
          <FormControl componentClass="select" 
                      placeholder="select" 
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
              value={this.state.content}
              onChange={e => this.codeHandler(e.target.value)}
              rows={30} />
          </pre>
        </FormGroup>
      </div>
    )
  }
}

export default connect(null, actions)(NewCode)