import * as t from './actionTypes.js';
//import Route from './models';
//import Immutable from 'immutable';

import { combineReducers } from 'redux';
// import { combineReducers } from 'redux-immutable';
import * as reducer from './reducers';

export default combineReducers({
  data: reducer.default.dataReducer,
  routeField: reducer.default.routeFieldReducer,
  directionField: reducer.default.directionFieldReducer
});
