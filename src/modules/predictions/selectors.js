import { createSelector } from 'reselect';

const searchState = state => state.searchState;
const payload = state => state.predictionState.payload;
const visible = state => state.predictionState.visible;

// Get prediction payload
const predictions = createSelector(
  [payload],
  (data) => {
    console.log('*------createSelector--------');
    console.dir(data);
    console.log('------createSelector------*');
    if (data && Object.prototype.hasOwnProperty.call(data, 'direction')) {
      // multi direction predictions - eg 12a and 12b
      if (Array.isArray(data.direction)) {
        return data.direction.map((value) => {
          const result = (Array.isArray(value.prediction))
            ? value.prediction
            : [value.prediction];
          return {
            prediction: result,
            title: value.title,
          };
        });
      }

      // stop has single set of predictions for route
      if (Array.isArray(data.direction.prediction)) {
        return [data.direction];
      }

      // only 1 prediction - last vehicle?
      return [
        {
          title: data.direction.title,
          prediction: [
            data.direction.prediction,
          ],
        },
      ];
      // return [];
    }
    else if (data && Object.prototype.hasOwnProperty.call(data, 'dirTitleBecauseNoPredictions')) {
      return [];
    }
    return null;
  },
);

export const getPredictions = createSelector(
  [predictions],
  data => data,
);

export const getPredictionsInMinutes = createSelector(
  [predictions],
  data => (
    data ? data.map(value => value.prediction.map(row => row.minutes)) : null
  ),
);

// Check if the route stop has predictions
export const hasPredictions = createSelector(
  [payload],
  data => (
    data
      ? !(Object.prototype.hasOwnProperty.call(data, 'dirTitleBecauseNoPredictions'))
      : false
  ),
);

// Get selected route and stop ID's, or return null
export const getRouteStopId = createSelector(
  [searchState],
  (search) => {
    if (search.routeField.selected && search.stopField.selected) {
      return {
        routeId: search.routeField.selected,
        stopId: search.stopField.selected,
      };
    }
    return null;
  },
);

// Check if visible
export const isVisible = createSelector(
  [visible],
  result => result,
);
