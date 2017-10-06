import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { branch, compose, lifecycle, renderComponent, renderNothing } from 'recompose';
import Predictions from '../components/Predictions';
import LoadingSpinner from '../../core/components/LoadingSpinner';
import { getPrediction, getRoute, getStop, isFetching, isVisible } from '../selectors';
import { clearPredictions, loadPredictionsRequest } from '../actions';

const shouldFetchData = props =>
  (props.route && props.stop && !props.data && !props.fetching) ? true : false

const shouldClearData = props =>
  ((!props.route || !props.stop) && props.data) ? true : false

const withPredictionData = lifecycle({
  componentWillReceiveProps(nextProps) {
    if (nextProps.requestData) {
      nextProps.requestData();
    }
    if (nextProps.clearData) {
      nextProps.clearData();
    }
  }
});

const isLoading = ({ fetching }) => fetching;

const withSpinnerWhileLoading = branch(
  isLoading,
  renderComponent(LoadingSpinner)
);

const hasNoData = ({ data }) => (!data) ? true : false;


const hideIfNoData = branch(
  hasNoData,
  renderNothing
)

const enhance = compose(
  connect(
    (state) => ({
      data: getPrediction(state),
      route: getRoute(state),
      stop: getStop(state),
      fetching: isFetching(state),
    }),
    (dispatch) => ({
      requestFetch: (route, stop) => {dispatch(loadPredictionsRequest(route, stop))},
      clearPredictions: () => {dispatch(clearPredictions())}
    }),
    (stateProps, dispatchProps, ownProps) => ({
      requestData: (shouldFetchData(stateProps))
        ? () => dispatchProps.requestFetch(stateProps.route, stateProps.stop)
        : false,
      clearData: (shouldClearData(stateProps))
        ? () => dispatchProps.clearPredictions()
        : false,
      data: stateProps.data,
      fetching: stateProps.fetching,
    })
  ),
  withPredictionData,
  withSpinnerWhileLoading,
  hideIfNoData
);

export default enhance(Predictions);
