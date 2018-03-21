import React, {Component} from 'react'
import { FormControl, FormGroup, Button, Glyphicon } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as actions from '../../../../../actions'
import './Code.css'

class Code extends Component {
  state = {
    edit: this.props.edit,
    content: this.props.content,
    type: this.props.type
  }

  componentDidMount() {
    this.runCodePrettify()
  }

  runCodePrettify() {
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;

    script.src = 'https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
  }

  editHandler = () => {
    this.setState({edit: true})
  }

 
  codeHandler = value => {
    this.setState({content: value})
  }

  typeHandler = value => {
    this.setState({type: value})
  }

  saveOrCancel = async (shouldSave) => {
    if (!shouldSave) {
      this.setState({edit:false, content:this.props.content, type: this.props.type})
      return this.runCodePrettify()
    }
    await this.props.putCode(this.props.solutionId, this.props.codeId, {content:this.state.content,type: this.state.type})
    this.setState({edit:false})
    this.runCodePrettify()
  }

  deleteHandler = async ()=> {
    await this.props.deleteCode(this.props.solutionId, this.props.codeId)
    window.location.reload()
  }

  render(){
    if (this.state.edit) {
      return (
        <div>
          <Button style={{marginRight:"5px", marginTop:"5px"}}
            onClick={()=>this.saveOrCancel(false)}>Cancel</Button>
          <Button style={{marginRight:"5px", marginTop:"5px"}}
            onClick={()=>this.saveOrCancel(true)} 
                  bsStyle="primary">Save</Button>
          <Button className="pull-right" style={{marginRight:"5px", marginTop:"5px"}}
            onClick={this.deleteHandler} 
                  bsStyle="danger"><Glyphicon glyph="trash" />
          </Button>
                  
          <FormGroup controlId="formControlsSelect">
            <FormControl componentClass="select" 
                        defaultValue={this.state.type}
                        style={{width:"auto", marginTop:"5px"}}
                        onChange={e => this.typeHandler(e.target.value)}>
              <option value="C++">C++</option>
              <option value="Java">Java</option>
              <option value="Python">Python</option>
              <option value="C">C</option>
              <option value="JavaScript">JavaScript</option>
            </FormControl>
          </FormGroup>
          <FormGroup controlId = "formControlsTextarea" 
            style={{width:"auto", marginTop:"5px"}}>
            <pre className="prettyprint linenums">
              <FormControl
                componentClass="textarea" 
                value={this.state.content} 
                onChange={ e => this.codeHandler(e.target.value)}
                rows={30}/>
            </pre>
          </FormGroup>
        </div> 
      ) 
    } else {
      return (
        <pre className="prettyprint linenums" onDoubleClick={this.editHandler}>
          <span dangerouslySetInnerHTML={{ __html: this.state.content}} />
        </pre>
      )
    }
  }
}

export default connect(null, actions)(Code)