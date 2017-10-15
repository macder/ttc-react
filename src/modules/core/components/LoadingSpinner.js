import React from 'react';
import { Loader } from 'semantic-ui-react';

const LoadingSpinner = () => (
  <div className="c-loading-spinner">
    <Loader active inline />
  </div>
);

export default LoadingSpinner;
