import { createSelector } from 'reselect'

const routeList = state => state.searchState.data.routeList.payload
const routeConfig = state => state.searchState.data.routeConfig.payload
const selectedDirection = state => state.searchState.directionField.selected

// Get route list array for 'Route' autocomplete field
export const getRouteList = createSelector(
  [routeList],
  (list) => {
    return list.map(function(obj) {
      return {
        id: obj.tag,
        title: obj.title,
      }
    });
  }
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

// Get stop list array for 'Stop' autocomplete field
export const getStopList = createSelector(
  routeConfig,
  selectedDirection,
  (config, directionId) => {
    if(directionId){

      const stopTags = config.direction.filter( (item) =>  {
        return item.tag === directionId;
      })[0].stop.map( (item) => {
        return item.tag;
      });

      console.dir(stopTags);
      console.dir(config.stop);

    }

    return ['test', 'test']
  }
);
