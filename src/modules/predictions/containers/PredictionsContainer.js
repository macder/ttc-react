import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import LoadingSpinner from '../../core/components/LoadingSpinner';

import { getPredictions, getRouteStopId } from '../selectors'

import { loadPredictionsRequest } from '../actions.js'

class PredictionsContainer extends React.Component {
  constructor(props) {
    super(props);
    // console.dir(props);
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  componentWillUpdate(nextProps, nextState){
    console.log('predictions will update');
    if(!this.props.routeStopId && nextProps.routeStopId) {
      console.log('has route/stop ids');
      this.props.action.requestPredictions();
    }
  }

  render() {
    if(this.props.list){
      return (
        <div className={'c-predictions'}>
          <ul>
            <li>{this.props.list[0].minutes}</li>
          </ul>
        </div>
      );
    }
    return (
      <LoadingSpinner />
    );
  }
}

const mapStateToProps = (state) => {
  // console.dir(state);
  return {
    routeStopId: getRouteStopId(state),
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
