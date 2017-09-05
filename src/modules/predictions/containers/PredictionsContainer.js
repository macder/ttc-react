import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import LoadingSpinner from '../../core/components/LoadingSpinner';

import { getPredictions, getRouteStopId, isVisible } from '../selectors'

import { loadPredictionsRequest, clearPredictions } from '../actions.js'

class PredictionsContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillUpdate(nextProps, nextState){
    // dispatch action to request predictions data
    if(!this.props.params && nextProps.params) {
      this.props.action.requestPredictions(nextProps.params.routeId, nextProps.params.stopId);
    }
    // dispatch action to clear/reset predictions data/state
    else if(this.props.params && !nextProps.params) {
      this.props.action.clear();
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
  return {
    params: getRouteStopId(state),
    list: getPredictions(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    action: {
      requestPredictions: bindActionCreators(loadPredictionsRequest, dispatch),
      clear: bindActionCreators(clearPredictions, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PredictionsContainer);
