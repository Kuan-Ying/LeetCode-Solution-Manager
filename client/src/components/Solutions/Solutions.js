import React, { Component } from 'react'
import { Tab, Row, Col } from 'react-bootstrap'
import TabNavs from './Tab/TabNavs'
import TabContent from './Tab/TabContent'
import Spinner from '../UI/Spinner/Spinner'
import './Solutions.css'

import { connect } from 'react-redux'
import * as actions from '../../actions'

class Solutions extends Component {
  state = {
    loaded: false
  }
  async componentDidMount() {
    await this.props.fetchSolutions(this.props.match.params.id)
    this.setState({loaded:true})
  }

  render() {
    return (
      (this.state.loaded)?
      <Tab.Container defaultActiveKey="first"  
                  id="content">
                <Row className="clearfix">
                  <Col sm={12}>
                    <TabNavs solutions={this.props.solutions} />
                  </Col>
                  <Col sm={12}>
                    <TabContent solutions={this.props.solutions} 
                                problemId={this.props.match.params.id}  />
                  </Col>
                </Row>
      </Tab.Container>: <Spinner />
    )
  }
}

function mapStateToProps({solutions}){
  return { solutions }
}

export default connect(mapStateToProps, actions)(Solutions)