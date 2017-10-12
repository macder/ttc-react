import React from 'react';
import PropTypes from 'prop-types';

const hasEmptyPredictions = (Component) => (props) => (
  <Component>
    <p>There are no current predictions for your selection.</p>
  </Component>
);


hasEmptyPredictions.propTypes = {
};

export default (hasEmptyPredictions);
