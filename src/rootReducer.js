import { combineReducers } from 'redux-immutable';
import searchReducer from './modules/search/reducer';
import predictionsReducer from './modules/predictions/reducer';

export default combineReducers({
  searchState: searchReducer,
  predictionState: predictionsReducer,
});
