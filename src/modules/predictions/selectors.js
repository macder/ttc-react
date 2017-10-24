import { Record, OrderedSet } from 'immutable';
import { createSelector } from 'reselect';

const searchState = state => state.get('search');
const predictionEntity = state => state.getIn(['entities', 'prediction']);

const listItemRecord = new Record({
  key: '',
  header: '',
  icon: '',
  value: '',
});

const makeListItemSet = data => new OrderedSet(
  data.map(item =>
    new listItemRecord({
      key: item.get('id'),
      header: `${item.get('minutes')} Minutes`,
      icon: 'marker',
      value: item.get('id'),
    }),
  ),
);

export const isPredictionFetching = createSelector(
  [predictionEntity],
  prediction => prediction.get('isFetching'),
);

export const getSelectedRoute = createSelector(
  [searchState],
  search => search.get('selectedRoute')
);

export const getSelectedStop = createSelector(
  [searchState],
  search => search.get('selectedStop')
);

export const getPrediction = createSelector(
  [predictionEntity],
  prediction => !!(prediction.get('byId').size) &&
    prediction.get('allIds').map(id => prediction.getIn(['byId', id]))
);

export const getPredictionForList = createSelector(
  [getPrediction],
  prediction => (prediction) && makeListItemSet(prediction)
);


