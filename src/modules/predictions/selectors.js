import { Map, List, Record, OrderedSet } from 'immutable';
import { createSelector } from 'reselect';

const searchState = state => state.get('search');
const predictionEntity = state => state.getIn(['entities', 'prediction']);
const directionEntity = state => state.getIn(['entities', 'direction']);

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

export const isPredictionEmpty = createSelector(
  [predictionEntity],
  prediction => prediction.get('isEmpty')
);

export const getSelectedRoute = createSelector(
  [searchState],
  search => search.get('selectedRoute')
);

export const getSelectedDirection = createSelector(
  [searchState],
  search => search.get('selectedDirection')
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

const multiDirPredictionList = (prediction, direction) =>
  prediction.get('allDirIds').map(item => new Map({
    title: direction.getIn(['byId', item]).title,
    prediction: makeListItemSet(
      prediction.getIn(['byDirId', item]).map(
        id => prediction.getIn(['byId', id])
      )
    ),
  }))

export const getPredictionForList = createSelector(
  predictionEntity,
  directionEntity,
  getSelectedDirection,
  (prediction, direction, selectedDir) => {
    if (!!(prediction.get('byId').size)) {
      return (prediction.has('byDirId'))
        ? multiDirPredictionList(prediction, direction)

        : new List([new Map({
            title: direction.getIn(['byId', selectedDir]).title,
            prediction: makeListItemSet(
              prediction.get('allIds').map(id => prediction.getIn(['byId', id]))
            )
          })])
    }
  }
);
