import React from 'react';
import { Loader } from 'semantic-ui-react';
import './LoadingSpinner.scss';

const LoadingSpinner = () => (
  <div className="c-loading-spinner">
    <Loader active inline />
  </div>
);

export default LoadingSpinner;
