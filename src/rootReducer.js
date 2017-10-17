import { combineReducers } from 'redux-immutable';
import searchReducer from './modules/search/reducer';
import predictionsReducer from './modules/predictions/reducer';
import vehicleLocationReducer from './modules/vehicleLocation/reducer';

export default combineReducers({
  searchState: searchReducer,
  predictionState: predictionsReducer,
  vehLocationState: vehicleLocationReducer,
});
