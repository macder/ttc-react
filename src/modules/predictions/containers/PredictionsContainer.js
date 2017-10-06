import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
// import Predictions from '../components/Predictions2';
import LoadingSpinner from '../../core/components/LoadingSpinner';
import { getPrediction, getRoute, getStop, isFetching, isVisible } from '../selectors';
import { clearPredictions, loadPredictionsRequest } from '../actions';

const shouldFetchData = props =>
  (props.route && props.stop && !props.payload && !props.fetching) ? true : false

const withPredictionData = lifecycle({
  componentWillReceiveProps(nextProps) {
    if (nextProps.requestData) {
      nextProps.requestData();
    }
  }
});

const enhance = compose(
  connect(
    (state) => ({
      payload: getPrediction(state),
      route: getRoute(state),
      stop: getStop(state),
      fetching: isFetching(state),
    }),
    (dispatch) => ({
      requestFetch: (route, stop) => {dispatch(loadPredictionsRequest(route, stop))}
    }),
    (stateProps, dispatchProps, ownProps) => ({
      requestData: (shouldFetchData(stateProps))
        ? () => dispatchProps.requestFetch(stateProps.route, stateProps.stop)
        : null,
      payload: stateProps.payload,
      fetching: stateProps.fetching
    })
  ),
  withPredictionData,
);

const Predictions = props => (
  <div className="c-predictions">
    <p>predictcions test</p>
  </div>
);

export default enhance(Predictions);

