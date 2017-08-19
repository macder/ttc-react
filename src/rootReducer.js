import { combineReducers } from 'redux';
import searchReducer from './modules/search/reducer';

export default combineReducers({
  searchState: searchReducer
});
