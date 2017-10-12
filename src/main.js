import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './rootReducer';
import { SearchForm, SearchSagas } from './modules/search';
import { PredictionsContainer, PredictionsSagas } from './modules/predictions';

const sagaMiddleware = createSagaMiddleware();
const Predictions = PredictionsContainer

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), // eslint-disable-line
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(SearchSagas);
sagaMiddleware.run(PredictionsSagas);

ReactDOM.render(
  <Provider store={store} key="provider">
    <div>
      <h1>TTC NextBus</h1>
      <SearchForm />
      <Predictions />
    </div>
  </Provider>, document.getElementById('root'),
);
