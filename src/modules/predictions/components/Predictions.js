import React from 'react';
import PropTypes from 'prop-types';
import LoadingSpinner from '../../core/components/LoadingSpinner';
import List from '../../core/components/List';

function withPredictionsNull(Component) {
  // console.dir('propss');
  return function (props) {
    // console.dir(props);
    return !props.predictions
      ? null
      : <Component { ...props } />
  }
}


const Arrivals = props => (
  // console.dir(props);
  <div className="c-next-arrivals">
    {props.predictions.map(list => (
      <div className="ininininin">
      <p>title</p>
      <List
        title={'title test'}
        items={list}
      />
      </div>
    ),)}
  </div>
);

const PredictionsWithNull = withPredictionsNull(Arrivals);


const Test = props => (
  <p>w0w0w0w</p>
);

export default function Predictions(props) {
  // console.dir(props);
  return (
    <div className="c-predictions">
      <PredictionsWithNull predictions={props.predictionMins} />
    </div>
  );

}

Predictions.propTypes = {
  hasPredictions: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isVisible: PropTypes.bool.isRequired,
  predictionMins: PropTypes.array,
};
