import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
// import Divider from 'material-ui/Divider';
import Predictions from '../components/Predictions2';
// import { getPrediction, getRoute, getStop, isFetching, isVisible } from '../selectors';
import * as selector from '../selectors';
import { loadPredictionsRequest, clearPredictions } from '../actions';


function mapStateToProps(state) {
  return {
    // toDoApp: state.toDoApp // gives our component access to state through props.toDoApp
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }; // here we're mapping actions to props
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Predictions);

// PredictionsContainer