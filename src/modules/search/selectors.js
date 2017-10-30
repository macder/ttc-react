import { Record, OrderedSet } from 'immutable';
import { createSelector } from 'reselect';

const searchState = state => state.get('search');
const routeEntity = state => state.getIn(['entities', 'route']);
const directionEntity = state => state.getIn(['entities', 'direction']);
const stopEntity = state => state.getIn(['entities', 'stop']);

const DropdownRecord = Record({
  key: '',
  value: '',
  text: '',
});

/**
 * Creates an ordered set of records for a dropdown field
 * @param {Immutable.List} data
 * @return {Immutable.OrderedSet}
 */
const makeDropdownSet = data => OrderedSet(
  data.map(item =>
    new DropdownRecord({
      key: item.get('id'),
      value: item.get('id'),
      text: item.get('title'),
    }),
  ),
);

const isValid = state => (selected, validIds) => {
  return validIds.includes(selected);
}

export const getSelectedRoute = createSelector(
  routeEntity,
  searchState,
  isValid,
  (route, search, isValid) =>
    (isValid(search.get('selectedRoute'), route.get('allIds'))) &&
      search.get('selectedRoute')
);

export const getSelectedDirection = createSelector(
  directionEntity,
  searchState,
  isValid,
  (direction, search, isValid) =>
    (isValid(search.get('selectedDirection'), direction.get('allIds'))) &&
      search.get('selectedDirection')
);

export const getSelectedStop = createSelector(
  stopEntity,
  searchState,
  isValid,
  (stop, search, isValid) =>
    (isValid(search.get('selectedStop'), stop.get('allIds'))) &&
      search.get('selectedStop')
);

export const isRouteListFetching = createSelector(
  [routeEntity],
  route => route.get('isFetching'),
);

export const isDirectionListFetching = createSelector(
  [directionEntity],
  direction => direction.get('isFetching'),
);

export const getRouteList = createSelector(
  [routeEntity],
  route => (route.get('allIds').size) &&
    route.get('allIds').map(id => route.getIn(['byId', id])),
);

const getStopList = createSelector(
  stopEntity,
  stop => (stop.get('byId').size) ? stop : null
);

export const getRouteListForDropdown = createSelector(
  [getRouteList],
  list => (list.size) ? makeDropdownSet(list) : null
);

export const getDirectionListForDropdown = createSelector(
  directionEntity,
  getSelectedRoute,
  (direction, routeId) => (direction.hasIn(['byRouteId', routeId])) &&
    makeDropdownSet(
      direction.getIn(['byRouteId', routeId])
        .map(id => direction.getIn(['byId', id]))
        .filter(item => item.useForUI)
    )
);

export const getStopListForDropdown = createSelector(
  getStopList,
  directionEntity,
  getSelectedDirection,
  (stop, directionList, directionId) =>
    !!(stop && directionId && directionList.getIn(['byId', directionId, 'stop'])) &&
      makeDropdownSet(
        directionList.getIn(['byId', directionId, 'stop'])
          .map(id => stop.getIn(['byId', id])),
      )
);
