import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import reducer from './rootReducer'
import search from './modules/search';

const sagaMiddleware = createSagaMiddleware();
const SearchForm = search.containers.default.SearchFormContainer;

let store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(search.sagas.default.loadRouteList);

ReactDOM.render(
  <Provider store={store} key="provider">
    <div>
      <h1>TTC NextBus</h1>
      <SearchForm />
    </div>
  </Provider>, document.getElementById('root')
);
