import React, { Component } from 'react';
import DashBoard from '../DashBoard/DashBoard';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Spinner from '../UI/Spinner/Spinner';

class ProbsOfComp extends Component {
  state = {
    loaded: false
  }

  async componentDidMount() {
    await this.props.fetchDataWithCompany(this.props.match.params.id)
    this.setState({loaded:true})
  }

  async componentWillReceiveProps(nextProps){
    // If user is from '/problemset/Google' to '/problemset/Google',
    // then we need to render the component and fetch the data again.
    this.setState({loaded:false})
    await this.props.fetchDataWithCompany(nextProps.match.params.id)
    this.setState({loaded:true})
  }

  render(){
    return (this.state.loaded)? <DashBoard />:<Spinner />
  }
}


export default connect(null, actions)(ProbsOfComp)