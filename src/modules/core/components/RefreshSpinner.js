import React from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';

export default function RefreshSpinner(props) {

const style = {
  container: {
    position: 'relative',
  },
  refresh: {
    display: 'inline-block',
    position: 'relative',
    background: '#f5f5f5',
    boxShadow: 'none'
  },
};

  return (
    <div className="c-refresh-spinner">
      <RefreshIndicator
        size={32}
        left={10}
        top={0}
        status="loading"
      />
    </div>
  );
}
