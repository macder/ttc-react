import { combineReducers } from 'redux-immutable';
import * as reducer from './reducers';

export default combineReducers({
  data: reducer.default.dataReducer,
  routeField: reducer.default.routeFieldReducer,
  directionField: reducer.default.directionFieldReducer,
  stopField: reducer.default.stopFieldReducer,
});
