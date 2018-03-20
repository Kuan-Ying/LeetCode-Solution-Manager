import React, { Component } from 'react';
import DashBoard from '../DashBoard/DashBoard';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Problems extends Component {
  async componentDidMount() {
    await this.props.fetchData()
  }

  render(){
    return <DashBoard />
  }
}


export default connect(null, actions)(Problems)