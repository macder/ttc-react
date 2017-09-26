import React from 'react';
import PropTypes from 'prop-types';
// import LoadingSpinner from '../../core/components/LoadingSpinner';

/*function withPredictionsNull(Component) {
  return function (props) {
    return !props.predictions
      ? null
      : <Component { ...props } />
  }
}*/

export default function Predictions(props) {
  // console.dir(props);
  return (
    <div className="c-predictions">
      <p>predictions</p>
    </div>
  );

}

Predictions.propTypes = {
  /*hasPredictions: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isVisible: PropTypes.bool.isRequired,
  predictionMins: PropTypes.array,*/
};
