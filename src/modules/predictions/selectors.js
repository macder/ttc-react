import { createSelector } from 'reselect'

const searchState = state => state.searchState
const payload = state => state.predictionState.payload
const visible = state => state.predictionState.visible


// Get prediction payload
export const getPredictions = createSelector(
  [payload],
  (payload) => {
    // console.dir(payload);
    if(payload && payload.hasOwnProperty('direction')){

      // multiple prediction - eg 12a and 12b
      if(Array.isArray(payload.direction)){
        // console.log('------------------------------------------');
        console.log('payload.direction is array');
        // console.dir(payload);
        // console.dir(payload.direction);
        // console.log('------------------------------------------');
        return payload.direction;
      }

      // stop has single set of predictions for route
      if(Array.isArray(payload.direction.prediction)) {
        // console.log('------------------------------------------');
        console.log('payload.direction.prediction is array');
        // console.dir(payload);
        // console.dir([payload.direction]);
        // console.log('------------------------------------------');
        return [payload.direction];
      }

      // only 1 prediction - last vehicle?
      else {
        // console.log('------------------------------------------');
        console.log('payload.direction.prediction NOT array');
        // console.dir(payload);
        // const direction = [payload.direction];
        // const prediction = [payload.direction.prediction];
        // console.log('------[payload.direction]----------');
        // console.dir(direction);
        // console.log('------[payload.direction.prediction]----------');
        // console.dir(prediction);

        // console.log('------[result]----------');
        const result = [
          {
            title: payload.direction.title,
            prediction: [
              payload.direction.prediction
            ]
          }
        ];
        // console.dir(result);
        // console.log('------------------------------------------');
        return result;
      }

      /*return (Array.isArray(payload.direction.prediction))
        ? payload.direction.prediction
        : [payload.direction.prediction];*/
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
