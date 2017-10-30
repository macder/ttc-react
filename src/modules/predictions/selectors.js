import { Map, List, Record, OrderedSet } from 'immutable';
import { createSelector } from 'reselect';
import { getSelectedDirection, getSelectedRoute, getSelectedStop } from '../search';

const searchState = state => state.get('search');
const predictionEntity = state => state.getIn(['entities', 'prediction']);
const directionEntity = state => state.getIn(['entities', 'direction']);

const ListItemRecord = new Record({
  key: '',
  header: '',
  icon: '',
  value: '',
});

const makeListItemSet = data => new OrderedSet(
  data.map(item =>
    new ListItemRecord({
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

export const getPrediction = createSelector(
  [predictionEntity],
  prediction => !!(prediction.get('byId').size) &&
    prediction.get('allIds').map(id => prediction.getIn(['byId', id]))
);

const multiDirPredictionList = (prediction, direction) =>
  prediction.get('allDirIds').map(dirId => new Map({
    title: direction.getIn(['byId', dirId ]).title,
    prediction: makeListItemSet(
      prediction.getIn(['byDirId', dirId]).map(
        id => prediction.getIn(['byId', id])
      )
    ),
    key: dirId,
  }))

export const getPredictionForList = createSelector(
  predictionEntity,
  directionEntity,
  getSelectedDirection,
  (prediction, direction, selectedDir) => {
    if (selectedDir && !!(prediction.get('byId').size && direction.get('byId').size)) {
      return (prediction.has('byDirId'))
        ? multiDirPredictionList(prediction, direction)
        : new List([new Map({
            title: direction.getIn(['byId', selectedDir]).title,
            prediction: makeListItemSet(
              prediction.get('allIds').map(id => prediction.getIn(['byId', id]))
            ),
            key: '01',
          })])
    }
    return null;
  }
);
