import { createSelector } from 'reselect'

const routeList = state => state.searchState.data.routeList.payload
const routeConfig = state => state.searchState.data.routeConfig.payload

// Get route list array for 'Route' autocomplete field
export const getRouteList = createSelector(
  [routeList],
  (list) => list
);

// Get complete route config object
export const getRouteConfig = createSelector(
  [routeConfig],
  (config) => config
);

// Get direction list array for 'Direction' autocomplete field
export const getDirectionList = createSelector(
  [routeConfig],
  (config) => {
    if(config.direction) {
      return config.direction.map(function(obj) {
        return {
          id: obj.tag,
          title: obj.title,
        }
      });
    }
    return []
  }
);
