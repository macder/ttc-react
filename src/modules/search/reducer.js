import { combineReducers } from 'redux';
import * as reducer from './reducers';
import * as t from './actionTypes.js';

export default combineReducers({
  data: reducer.default.dataReducer,
  routeField: reducer.default.routeFieldReducer,
  directionField: reducer.default.directionFieldReducer,
  stopField: reducer.default.stopFieldReducer,
  /*fields: combineReducers({
    route: reducer.default.routeFieldReducer,
    stop: reducer.default.stopFieldReducer,
    direction: reducer.default.directionFieldReducer,
  })*/
});
