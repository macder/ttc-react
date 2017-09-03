import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

export default function LoadingSpinner(props) {
  return (
    <CircularProgress
      size={24}
      thickness={3}
    />
  );
}