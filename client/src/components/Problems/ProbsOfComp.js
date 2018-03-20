import React, { Component } from 'react';
import DashBoard from '../DashBoard/DashBoard';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class ProbsOfComp extends Component {
  async componentDidMount() {
    await this.props.fetchDataWithCompany(this.props.match.params.id)
  }

  async componentWillReceiveProps(nextProps){
    // If user is from '/problemset/Google' to '/problemset/Google',
    // then we need to render the component and fetch the data again.
    await this.props.fetchDataWithCompany(nextProps.match.params.id)
  }

  render(){
    return <DashBoard />
  }
}


export default connect(null, actions)(ProbsOfComp)