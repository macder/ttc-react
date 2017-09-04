import { createSelector } from 'reselect'

const predictionList = state => state.predictionState.payload

// Get prediction payload
export const getPredictions = createSelector(
  [predictionList],
  (list) => list
);
