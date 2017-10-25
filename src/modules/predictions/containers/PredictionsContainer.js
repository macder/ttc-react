import React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle, mapProps, withPropsOnChange } from 'recompose';
import { Predictions } from '../components';
import {
  getPredictionForList, getSelectedRoute,
  getSelectedStop, isPredictionFetching
} from '../selectors';
import { clearPrediction, requestPrediction } from '../../../data/entities/actions';
import { withSpinnerWhileLoading, hideIfNoData } from '../../core/enhancers';

const mapStateToProps = (state, ownProps) => ({
  data: getPredictionForList(state),
  fetching: isPredictionFetching(state),
  route: getSelectedRoute(state),
  stop: getSelectedStop(state),
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
      const { action, route, stop, data, fetching } = nextProps;
      (route && stop && !data && !fetching) &&
        action.requestPrediction(route, stop);

      (stop !== this.props.stop && data) &&
        action.clearPrediction();
    },
  }),
  withSpinnerWhileLoading,
  hideIfNoData,
  withPropsOnChange(
    ['data'],
    ({ data }) => (data) && ({
      data: data.toArray().map(item => item.toObject())
    })
  ),
  mapProps(
    ({ data }) => ({ data })
  ),
)(Predictions);

export default (PredictionsContainer);
