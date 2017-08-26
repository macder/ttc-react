import { createSelector } from 'reselect'

const routeList = state => state.searchState.data.routeList.payload
const routeConfig = state => state.searchState.data.routeConfig.payload

export const getRouteList = createSelector(
  [routeList],
  (list) => list
);

export const getRouteConfig = createSelector(
  [routeConfig],
  (config) => config
);
