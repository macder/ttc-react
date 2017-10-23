import { Map } from 'immutable';
import { SELECT_ROUTE, SELECT_DIRECTION, SELECT_STOP } from './actions'

const initialState = new Map({
  selectedRoute: null,
  selectedDirection: null,
  selectedStop: null,
});

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SELECT_ROUTE:
      return state.set('selectedRoute', action.payload.selected);

    case SELECT_DIRECTION:
      return state.set('selectedDirection', action.payload.selected);

    default:
      return state;
  }
};

export default reducer;
