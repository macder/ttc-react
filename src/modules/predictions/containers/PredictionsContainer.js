import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import LoadingSpinner from '../../core/components/LoadingSpinner';

import { getPredictions, getRouteStopId, isVisible, hasPredictions } from '../selectors'

import { loadPredictionsRequest, clearPredictions } from '../actions.js'

class PredictionsContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillUpdate(nextProps, nextState){
    // dispatch action to request predictions data
    console.log('-----------NEXT PROPS--------------');
    console.dir(nextProps);
    console.log('-----------END NEXT PROPS--------------');
    if(!this.props.params && nextProps.params) {
      // console.dir(nextProps)
      this.props.action.requestPredictions(nextProps.params.routeId, nextProps.params.stopId);
    }
    // dispatch action to clear/reset predictions data/state
    else if(this.props.params && !nextProps.params) {
      this.props.action.clear();
    }
  }

  render() {
    if(this.props.visible){
      if(this.props.hasPredictions){
        return (
          <div className={'c-predictions'}>
            {this.props.list.map(function(direction, index){

              const title = <p key={ index }>{direction.title} title</p>

              // console.dir(direction.prediction);
              const list = direction.prediction.map(function(prediction, index){
                //console.dir(prediction);
                return <li key={ index }>{prediction.minutes} mins</li>;
              });


              return [title, list];
              })}

          </div>
        );
      }
      else if(this.props.hasPredictions === false){
        return (
          <div>No predictions availble</div>
        );
      }
      return (
        <LoadingSpinner />
      );
    }
    return null;
  }
}

const mapStateToProps = (state) => {
  // console.dir(state);
  return {
    params: getRouteStopId(state),
    list: getPredictions(state),
    visible: isVisible(state),
    hasPredictions: hasPredictions(state),
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
