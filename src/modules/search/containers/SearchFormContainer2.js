import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { BaseComponent } from '../components';

const TestComponent = props => (
  <div className="c-test">
    <p>Test</p>
  </div>
);

const enhance = compose(
  TestComponent
  /*connect(
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
  withMultiRouteMixedPredictions,*/
);

export default enhance(BaseComponent);