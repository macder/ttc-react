import { combineReducers } from 'redux-immutable';
// import searchReducer from './modules/search/reducer';
// import predictionsReducer from './modules/predictions/reducer';

import {entityReducer} from './data/entities';

export default combineReducers({
  entity: entityReducer,
  // searchState: searchReducer,
});
