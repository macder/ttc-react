import { combineReducers } from 'redux';
import search from './modules/search';

export default combineReducers({
  searchState: search.reducer.default
});
