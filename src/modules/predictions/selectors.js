import { createSelector } from 'reselect'

const searchState = state => state.searchState
const payload = state => state.predictionState.payload
const visible = state => state.predictionState.visible


// Get prediction payload
export const getPredictions = createSelector(
  [payload],
  (payload) => {
    if(payload && payload.hasOwnProperty('direction')){

      // multiple prediction - eg 12a and 12b
      if(Array.isArray(payload.direction)){
        return payload.direction;
      }

      // stop has single set of predictions for route
      if(Array.isArray(payload.direction.prediction)) {
        return [payload.direction];
      }

      // only 1 prediction - last vehicle?
      else {
        const result = [
          {
            title: payload.direction.title,
            prediction: [
              payload.direction.prediction
            ]
          }
        ];
        return result;
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
