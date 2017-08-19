import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './rootReducer'
import search from './modules/search';

import {connect} from 'react-redux';

let store = createStore(reducer);

const SearchForm = search.containers.default.SearchFormContainer;

ReactDOM.render(
  <Provider store={store} key="provider">
    <div>
      <h1>TTC NextBus</h1>
      <SearchForm />
    </div>
  </Provider>, document.getElementById('root')
);
