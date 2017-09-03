import React from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { withStyles, createStyleSheet, MuiThemeProvider } from 'material-ui/styles'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import reducer from './rootReducer'
import search from './modules/search';

const sagaMiddleware = createSagaMiddleware();
const SearchForm = search.containers.default.SearchFormContainer;
// const initialState = Immutable.Map();

let store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(search.sagas.default);

ReactDOM.render(
  <Provider store={store} key="provider">
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <div>
        <h1>TTC NextBus</h1>
        <SearchForm />
      </div>
    </MuiThemeProvider>
  </Provider>, document.getElementById('root')
);
