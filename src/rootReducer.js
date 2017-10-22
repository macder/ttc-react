import { combineReducers } from 'redux-immutable';
import { searchReducer } from './modules/search';
// import predictionsReducer from './modules/predictions/reducer';

import {entityReducer} from './data/entities';

export default combineReducers({
  entity: entityReducer,
  search: searchReducer,
});
