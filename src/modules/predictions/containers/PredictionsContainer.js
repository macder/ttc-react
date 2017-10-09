import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withDataOnUpdate, withSpinnerWhileLoading, hideIfNoData } from '../../core/enhancers';
import { BaseComponent } from '../components';
import withEmptyPredictions from './withEmptyPredictions';
import withSinglePrediction from './withSinglePrediction';
import withSingeRouteMultiPredictions from './withSingeRouteMultiPredictions';
import withMultiRouteMultiPredictions from './withMultiRouteMultiPredictions';
import withMultiRouteMixedPredictions from './withMultiRouteMixedPredictions';
import { getPrediction, getRoute, getStop, isFetching } from '../selectors';
import { clearPredictions, loadPredictionsRequest } from '../actions';

const shouldFetchData = props =>
  (props.route && props.stop && !props.data && !props.fetching)

const shouldClearData = props =>
  ((!props.route || !props.stop) && props.data)

const mapStateToProps = state => ({
  data: getPrediction(state),
  route: getRoute(state),
  stop: getStop(state),
  fetching: isFetching(state),
});

const mapDispatchToProps = dispatch => ({
  requestFetch: (route, stop) => dispatch(loadPredictionsRequest(route, stop)),
  clearPredictions: () => dispatch(clearPredictions())
});

const mergeProps = (stateProps, dispatchProps) => ({
  requestData: (shouldFetchData(stateProps)) && (
    () => dispatchProps.requestFetch(stateProps.route, stateProps.stop)
  ),
  clearData: (shouldClearData(stateProps)) && (
    () => dispatchProps.clearPredictions()
  ),
  data: stateProps.data,
  fetching: stateProps.fetching,
});

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
  ),
  withDataOnUpdate,
  withSpinnerWhileLoading,
  hideIfNoData,
  withEmptyPredictions,
  withSinglePrediction,
  withSingeRouteMultiPredictions,
  withMultiRouteMultiPredictions,
  withMultiRouteMixedPredictions,
);

export default enhance(BaseComponent);
