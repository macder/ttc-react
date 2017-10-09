import React from 'react';
import PropTypes from 'prop-types';

const hasEmptyPredictions = (Component) => (props) => (
  <Component>
    <p>No predictions available</p>
  </Component>
);


hasEmptyPredictions.propTypes = {
};

export default (hasEmptyPredictions);
