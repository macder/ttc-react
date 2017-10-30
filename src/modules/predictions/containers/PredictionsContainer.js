import React from 'react';
import { connect } from 'react-redux';
import { branch, compose, lifecycle, renderComponent, withPropsOnChange } from 'recompose';
import { Predictions, PredictionsEmpty } from '../components';
import { getPredictionForList, getPredictionError, isPredictionFetching, isPredictionEmpty } from '../selectors';
import { getSelectedDirection, getSelectedRoute, getSelectedStop } from '../../search';
import { requestPrediction } from '../../../data/entities/actions';
import { withSpinnerWhileLoading, withHttpRequestError, hideIfNoData } from '../../core/enhancers';

const mapStateToProps = (state, ownProps) => ({
  data: getPredictionForList(state),
  fetching: isPredictionFetching(state),
  route: getSelectedRoute(state),
  stop: getSelectedStop(state),
  direction: getSelectedDirection(state),
  empty: isPredictionEmpty(state),
  error: getPredictionError(state),
})

const mapDispatchToProps = dispatch => ({
  action: {
    requestPrediction: (route, stop) => dispatch(requestPrediction(route, stop)),
  },
});

const PredictionsContainer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  lifecycle({
    componentWillReceiveProps(nextProps) {
      const { action, direction, route, stop, data, fetching, empty, error } = nextProps;
      (route && direction && stop && !empty && !data && !fetching && !error) &&
        action.requestPrediction(route, stop);
    },
  }),
  withHttpRequestError,
  branch(
    ({ empty }) => empty,
    renderComponent(PredictionsEmpty)
  ),
  withSpinnerWhileLoading,
  hideIfNoData,
  withPropsOnChange(
    ['data'],
    ({ data }) => (data) && ({
      data: data.toJS()
    })
  ),
)(Predictions);

export default (PredictionsContainer);
