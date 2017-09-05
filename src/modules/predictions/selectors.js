import { createSelector } from 'reselect'

const searchState = state => state.searchState
const predictionList = state => state.predictionState.payload

// Get prediction payload
export const getPredictions = createSelector(
  [predictionList],
  (list) => list
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
