import React from 'react';
import { Loader } from 'semantic-ui-react';
import 'semantic-ui-css/components/loader.min.css';

const LoadingSpinner = () => (
  <div className="c-loading-spinner">
    <Loader active inline />
  </div>
);

export default LoadingSpinner;
