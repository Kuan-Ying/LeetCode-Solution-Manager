import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './actions';
import Header from './components/Header/Header';
import Landing from './components/Landing';
import Problems from './components/Problems/Problems';
import ProbsOfComp from './components/Problems/ProbsOfComp'
import Solutions from './components/Solutions/Solutions'

class App extends Component {
  componentDidMount(){
    this.props.fetchUser()
  }
  
  render(){
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path="/problemset" component={Problems} />
          <Route exact path="/problemset/:id" component={ProbsOfComp} />
          <Route exact path="/solutions/:id" component={Solutions} />
        </div>
      </BrowserRouter>
    )
  }
}

export default connect(null, actions)(App);