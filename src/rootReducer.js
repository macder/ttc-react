// import { combineReducers } from 'redux';
import { combineReducers } from 'redux-immutable';
import searchReducer from './modules/search/reducer';

export default combineReducers({
  searchState: searchReducer
});
