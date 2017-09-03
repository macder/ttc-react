import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';

export default function LoadingSpinner(props) {
  return (
    <MuiThemeProvider>
      <CircularProgress
        size={24}
        thickness={3}
      />
    </MuiThemeProvider>
  );
}