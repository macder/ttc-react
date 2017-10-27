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

export const selectedRoute = createSelector(
  [searchState],
  search => search.get('selectedRoute'),
);

const selectedDirection = createSelector(
  [searchState],
  search => search.get('selectedDirection'),
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
  selectedRoute,
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
  selectedDirection,
  (stop, directionList, directionId) =>
    !!(stop && directionId && directionList.getIn(['byId', directionId, 'stop'])) &&
      makeDropdownSet(
        directionList.getIn(['byId', directionId, 'stop'])
          .map(id => stop.getIn(['byId', id])),
      )
);
