import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = ({ error }) => (
  <div className="c-error-message">
    <p>{error.message}</p>
  </div>
);

export default (ErrorMessage);
