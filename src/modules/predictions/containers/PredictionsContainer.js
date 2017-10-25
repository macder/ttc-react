import React from 'react';
import { connect } from 'react-redux';
import { branch, compose, lifecycle, mapProps, renderComponent, withPropsOnChange } from 'recompose';
import { Predictions, PredictionsEmpty } from '../components';
import {
  getPredictionForList, getSelectedRoute,
  getSelectedStop, isPredictionFetching,
  isPredictionEmpty
} from '../selectors';
import { clearPrediction, requestPrediction } from '../../../data/entities/actions';
import { withSpinnerWhileLoading, hideIfNoData } from '../../core/enhancers';

const mapStateToProps = (state, ownProps) => ({
  data: getPredictionForList(state),
  fetching: isPredictionFetching(state),
  route: getSelectedRoute(state),
  stop: getSelectedStop(state),
  empty: isPredictionEmpty(state),
})

const mapDispatchToProps = dispatch => ({
  action: {
    requestPrediction: (route, stop) => dispatch(requestPrediction(route, stop)),
    clearPrediction: () => dispatch(clearPrediction()),
  },
});

const PredictionsContainer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  lifecycle({
    componentWillReceiveProps(nextProps) {
      const { action, route, stop, data, fetching, empty } = nextProps;
      (route && stop && !data && !fetching && !empty) &&
        action.requestPrediction(route, stop);

      (stop !== this.props.stop && (data || empty)) &&
        action.clearPrediction();
    },
  }),
  branch(
    ({ empty }) => empty,
    renderComponent(PredictionsEmpty)
  ),
  withSpinnerWhileLoading,
  hideIfNoData,
  withPropsOnChange(
    ['data'],
    ({ data }) => (data) && ({
      data: data.toArray().map(item => item.toObject())
    })
  ),
)(Predictions);

export default (PredictionsContainer);
