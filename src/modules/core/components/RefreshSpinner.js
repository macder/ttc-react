import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
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
    <MuiThemeProvider>
      <RefreshIndicator
        size={32}
        left={10}
        top={0}
        status="loading"
        style={style.refresh}
      />
    </MuiThemeProvider>
  );
}
