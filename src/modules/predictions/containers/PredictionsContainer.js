import Immutable from 'immutable';
import React from 'react';
import { connect } from 'react-redux';
import { branch, compose, mapProps, renderComponent, renderNothing, withPropsOnChange } from 'recompose';
import { withDataOnUpdate, withSpinnerWhileLoading, hideIfNoData } from '../../core/enhancers';
import { BaseComponent, hasMultiRoutePredictions, hasSingeRoutePredictions, PredictionsEmpty } from '../components';
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

const withEmptyPredictions = branch(
  ({ data }) => !data.size,
  renderComponent(PredictionsEmpty)
);

const withSinglePrediction = branch(
  ({ data }) => Immutable.Record.isRecord(data.get('prediction')),
  renderComponent(
    compose(
      mapProps(({data}) => ({
        items: [{
          id: data.get('prediction').tripTag,
          text: data.get('prediction').minutes + ' Minutes'
        }]
      })),
      hasSingeRoutePredictions
    )(BaseComponent)
  )
);

const withSingeRouteMultiPredictions = branch(
  ({ data }) => Immutable.OrderedSet.isOrderedSet(data.get('prediction')),
  renderComponent(
    compose(
      mapProps(({data}) => ({
        items: data.get('prediction').map(item =>({
          id: item.tripTag,
          text: item.minutes + ' Minutes'
        })).toJS()
      })),
      hasSingeRoutePredictions
    )(BaseComponent)
  )
);

const withMultiRouteMultiPredictions = branch(
  ({ data }) => {
    if (Immutable.List.isList(data)) {
      for (let entry of data.entries()) {
        if (!Immutable.OrderedSet.isOrderedSet(entry[1].get('prediction')))
          return false;
      }
      return true
    }
  },
  renderComponent(
    compose(
      mapProps(({data}) => ({
        direction: data.map((entry, index) => ({
          id: index,
          title: entry.get('title'),
          items: entry.get('prediction').map(item =>({
            id: item.tripTag,
            text: item.minutes + ' Minutes'
          })).toJS()
        })).toJS()
      })),
      hasMultiRoutePredictions
    )(BaseComponent)
  )
);

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
);

export default enhance(BaseComponent);
