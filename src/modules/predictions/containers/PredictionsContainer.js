import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { getPredictions } from '../selectors'

import { loadPredictionsRequest } from '../actions.js'

class PredictionsContainer extends React.Component {
  constructor(props) {
    super(props);
    // console.dir(props);
  }

  componentDidMount() {
    this.props.action.requestPredictions();
  }

  componentWillReceiveProps(nextProps) {
    // console.dir(nextProps);
  }

  componentWillUpdate(nextProps, nextState){
    console.log('predictions will update');
  }



  render() {
    return (
      <div className={'c-predictions'}>
        <ul>
          <li>4 min</li>
          <li>10 min</li>
          <li>18 min</li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.dir(state);
  return {
    list: getPredictions(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    action: {
      requestPredictions: bindActionCreators(loadPredictionsRequest, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PredictionsContainer);
