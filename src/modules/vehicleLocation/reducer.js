import Immutable from 'immutable';
import * as t from './actionTypes';

const initialState = Immutable.fromJS({
  fetching: false,
  payload: null,
  error: null,
});

const vehicleLocationReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case t.LOAD_VEHICLE_LOCATION_REQUEST:
      return state
        .set('fetching', action.fetching);

    case t.LOAD_VEHICLE_LOCATION_SUCCESS:
      return state
        .set('payload', action.payload)
        .set('fetching', action.fetching);

    case t.LOAD_VEHICLE_LOCATION_FAILURE:
      return state
        .set('payload', action.payload)
        .set('fetching', action.fetching)
        .set('error', action.error);

    default:
      return state;
  }
};

export default (vehicleLocationReducer);
