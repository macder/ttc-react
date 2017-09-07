import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

export default function LoadingSpinner(props) {
  const style = {
    marginTop: 24
  }
  return (
    <div className="c-loading-spinner">
      <CircularProgress
        size={24}
        thickness={3}
        style={style}
      />
    </div>
  );
}