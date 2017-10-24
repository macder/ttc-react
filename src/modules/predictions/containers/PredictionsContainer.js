import React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { Predictions } from '../components';
import { requestPrediction } from '../../../data/entities/actions';

const mapStateToProps = (state, ownProps) => ({

});

const mapDispatchToProps = dispatch => ({
  action: {
    requestPrediction: () => dispatch(requestPrediction()),
  },
});

const PredictionsContainer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    // mergeProps,
  ),
  lifecycle({
    componentDidMount() {
      const { action } = this.props;
      action.requestPrediction();
    },
  }),
)(Predictions);

export default (PredictionsContainer);
