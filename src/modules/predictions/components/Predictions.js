import React from 'react';
import LoadingSpinner from '../../core/components/LoadingSpinner';
import List from './List';

const NextArrivals = props => (
  <div>
    {props.data.map((list, index) =>
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
