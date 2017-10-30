import React from 'react';
import ReactDOM from 'react-dom';
import { Root } from './components';
import store from './store';
import 'semantic-ui-css/components/reset.min.css';
import 'semantic-ui-css/components/site.min.css';

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root'),
);
