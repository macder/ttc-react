import { createSelector } from 'reselect';

const searchState = state => state.get('searchState');
const predictionState = state => state.get('predictionState');

// Get prediction payload
export const getPrediction = createSelector(
  [predictionState],
  (prediction) => prediction.get('payload')
);

// Get selected route
export const getRoute = createSelector(
  [searchState],
  (search) => search.getIn(['routeField', 'selected'])
);

// Get selected stop
export const getStop = createSelector(
  [searchState],
  (search) => search.getIn(['stopField', 'selected'])
);

// Is prediction data fetching from remote api? bool
export const isFetching = createSelector(
  [predictionState],
  (prediction) => prediction.get('fetching')
);

// Error message, if any, from data fetch
export const getError = createSelector(
  [predictionState],
  (prediction) => prediction.get('error')
);
