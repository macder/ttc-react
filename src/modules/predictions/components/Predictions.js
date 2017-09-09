import React from 'react';
import PropTypes from 'prop-types';
import LoadingSpinner from '../../core/components/LoadingSpinner';
import List from '../../core/components/List';

const NextArrivals = props => (
  <div>
    {props.data.map(list =>
      (<List
        title={'title test'}
        items={list}
      />),
    )}
  </div>
);

export default function Predictions(props) {
  if (props.isVisible && props.isFetching) {
    return (
      <LoadingSpinner />
    );
  }

  if (props.isVisible && props.hasPredictions) {
    return (
      <NextArrivals
        data={props.predictionMins}
      />
    );
  }

  if (props.isVisible && !props.hasPredictions) {
    return (
      <div>No predictions availble</div>
    );
  }
  return null;
}

Predictions.propTypes = {
  hasPredictions: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isVisible: PropTypes.bool.isRequired,
  predictionMins: PropTypes.array,
};
