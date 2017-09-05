import { createSelector } from 'reselect'

const searchState = state => state.searchState
const payload = state => state.predictionState.payload
const visible = state => state.predictionState.visible

// Get prediction payload
export const getPredictions = createSelector(
  [payload],
  (payload) => {
    if(payload){
      if(!payload.hasOwnProperty('dirTitleBecauseNoPredictions')){
        return payload.direction.prediction;
      }
    }
    return null;
  }
);

// Check if the route stop has predictions
export const hasPredictions = createSelector(
  [payload],
  (payload) => {
    if(payload) {
      return (payload.hasOwnProperty('dirTitleBecauseNoPredictions')) ? false : true;
    }
  }
);



// Get selected route and stop ID's, or return null
export const getRouteStopId = createSelector(
  [searchState],
  (search) => {
    if(search.routeField.selected && search.stopField.selected){
      return {
        routeId: search.routeField.selected,
        stopId: search.stopField.selected
      };
    }
    return null;
  }
);

// Check if visible
export const isVisible = createSelector(
  [visible],
  (visible) => visible
);
