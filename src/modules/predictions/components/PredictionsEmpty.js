import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';

const PredictionsEmpty = props => {
  return (
    <div className="c-predictions">
      <p>No predictions available</p>
    </div>
  );
}

PredictionsEmpty.propTypes = {
};

export default (PredictionsEmpty);
