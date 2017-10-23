import { Record, OrderedSet } from 'immutable';
import { createSelector } from 'reselect';

const searchState = state => state.get('search');
const routeEntity = state => state.getIn(['entities', 'route']);
const directionEntity = state => state.getIn(['entities', 'direction']);

const dropdownRecord = new Record({
  key: '',
  value: '',
  text: '',
});

/**
 * Creates an ordered set of records for a dropdown field
 * @param {Immutable.List} data
 * @return {Immutable.OrderedSet}
 */
const makeDropdownSet = data => new OrderedSet(
  data.map(item =>
    new dropdownRecord({
      key: item.get('id'),
      value: item.get('id'),
      text: item.get('title'),
    })
  )
);

const selectedRoute = createSelector(
  [searchState],
  search => search.get('selectedRoute')
);

export const isRouteListFetching = createSelector(
  [routeEntity],
  route => route.get('isFetching')
);

export const getRouteList = createSelector(
  [routeEntity],
  route => (route.get('allIds')) &&
    route.get('allIds').map(id => route.getIn(['byId', id]))
);

export const getRouteListForDropdown = createSelector(
  [getRouteList],
  list => (list) && makeDropdownSet(list)
);

export const getDirectionListForDropdown = createSelector(
  directionEntity,
  routeEntity,
  selectedRoute,
  (direction, routeList, routeId) =>
    (routeId && routeList.getIn(['byId', routeId, 'direction']).size) &&
      makeDropdownSet(
        routeList.getIn(['byId', routeId, 'direction'])
          .map(id => direction.getIn(['byId', id]))
      )
);
