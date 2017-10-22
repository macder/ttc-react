import { Record, OrderedSet } from 'immutable';
import { createSelector } from 'reselect';

const dropdownRecord = new Record({
  key: '',
  value: '',
  text: '',
});

const routeEntity = state => state.getIn(['entity', 'route']);

export const isRouteListFetching = state => state.getIn(['entity', 'status', 'routeListFetching']);

export const getRouteList = createSelector(
  [routeEntity],
  route => (route.get('allIds'))
    ? route.get('allIds').map(id => route.getIn(['byId', id]))
    : null
);

export const getRouteListForDropdown = createSelector(
  [getRouteList],
  list => (list) && new OrderedSet(list.map(item =>
    new dropdownRecord({
      key: item.get('id'),
      value: item.get('id'),
      text: item.get('title'),
    })
  ))
);
