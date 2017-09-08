import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import LoadingSpinner from '../../core/components/LoadingSpinner';
import Predictions from '../components/Predictions';
import { getPredictions, getPredictionsInMinutes, getRouteStopId, isVisible, hasPredictions } from '../selectors'
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
    return (
      <Predictions
        isVisible = {this.props.visible}
        isFetching = {this.props.fetching}
        hasPredictions = {this.props.hasPredictions}
        predictionMins = {this.props.predictionMinutes}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    params: getRouteStopId(state),
    predictions: getPredictions(state),
    predictionMinutes: getPredictionsInMinutes(state),
    visible: isVisible(state),
    hasPredictions: hasPredictions(state),
    fetching: state.predictionState.fetching,
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
