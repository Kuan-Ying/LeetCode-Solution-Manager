import React, { Component } from 'react';
import DashBoard from '../DashBoard/DashBoard';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Spinner from '../UI/Spinner/Spinner';

class Problems extends Component {
  state = {
    loaded: false
  }
  async componentDidMount() {
    await this.props.fetchData()
    this.setState({loaded:true})
  }

  render(){
    return (this.state.loaded)?<DashBoard />: <Spinner />
  }
}


export default connect(null, actions)(Problems)