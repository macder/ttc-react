import React from 'react'
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { Predictions } from '../components';
import { requestPredictions } from '../../../data/entities/actions';

const mapStateToProps = (state, ownProps) => ({

});

const mapDispatchToProps = dispatch => ({
  action: {
    requestPredictions: () => dispatch(requestPredictions()),
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
      action.requestPredictions();
    },
  }),
)(Predictions);

export default (PredictionsContainer);
