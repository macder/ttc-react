import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Predictions from '../components/Predictions2';
// import { getPrediction, getRoute, getStop, isFetching, isVisible } from '../selectors';
import * as selector from '../selectors';
import { loadPredictionsRequest, clearPredictions } from '../actions';



const mapStateToProps = state => ({
  test: 'hello'
});

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Predictions);

// PredictionsContainer