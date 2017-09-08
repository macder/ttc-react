import { createSelector } from 'reselect'

const searchState = state => state.searchState
const payload = state => state.predictionState.payload
const visible = state => state.predictionState.visible

// Get prediction payload
const predictions = createSelector(
  [payload],
  (payload) => {
    if(payload && payload.hasOwnProperty('direction')){

      // multi direction predictions - eg 12a and 12b
      if(Array.isArray(payload.direction)) {
        return payload.direction.map(function(value, index) {
          const predictions = (Array.isArray(value.prediction))
            ? value.prediction
            : [value.prediction];
          return {
            prediction: predictions,
            title: value.title,
          }
        });
      }

      // stop has single set of predictions for route
      if(Array.isArray(payload.direction.prediction)) {
        return [payload.direction];
      }

      // only 1 prediction - last vehicle?
      return [
        {
          title: payload.direction.title,
          prediction: [
            payload.direction.prediction
          ]
        }
      ];
    }
    return null;
  }
);

export const getPredictions = createSelector(
  [predictions],
  (predictions) => predictions
);

export const getPredictionsInMinutes = createSelector(
  [predictions],
  (predictions) => {
    if(predictions) {
      const test = predictions.map((value, index) => {
        const minutes = value.prediction.map((row, index) => {
          return row.minutes;
        });
        return minutes;
      });
      return test;
    }
  }
);

// Check if the route stop has predictions
export const hasPredictions = createSelector(
  [payload],
  (payload) => {
    if(payload) {
      return (payload.hasOwnProperty('dirTitleBecauseNoPredictions')) ? false : true;
    }
    return false;
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
