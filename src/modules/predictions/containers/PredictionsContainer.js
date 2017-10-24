import React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle, withPropsOnChange } from 'recompose';
import { Predictions } from '../components';
import { getPredictionForList, getSelectedRoute, getSelectedStop, isPredictionFetching } from '../selectors';
import { requestPrediction } from '../../../data/entities/actions';
import { withSpinnerWhileLoading, hideIfNoData } from '../../core/enhancers';

const shouldFetchData = props =>
  (props.route && props.stop && !props.data && !props.fetching && !props.error);

const mapStateToProps = (state, ownProps) => ({
  data: getPredictionForList(state),
  fetching: isPredictionFetching(state),
  route: getSelectedRoute(state),
  stop: getSelectedStop(state),
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
      const { action, route, stop, data, fetching } = nextProps;
      (route && stop && !data && !fetching) &&
        action.requestPrediction(route, stop);
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
)(Predictions);

export default (PredictionsContainer);
