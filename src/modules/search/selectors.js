import Immutable from 'immutable'
import { createSelector } from 'reselect';

const routeList = state => state.getIn(['searchState', 'data', 'routeList', 'payload']);

const routeConfig = state => state.searchState.data.routeConfig.payload;
const selectedDirection = state => state.searchState.directionField.selected;

// Get route list array for 'Route' autocomplete field
export const getRouteList = createSelector(
  [routeList],
  list => {
    const Record = new Immutable.Record({
      tag: '',
      title: '',
    });

    return new Immutable.OrderedSet(list.map(Record));
  }
);

// Get complete route config object
export const getRouteConfig = createSelector(
  [routeConfig],
  config => config,
);

// Get direction list array for 'Direction' autocomplete field
export const getDirectionList = createSelector(
  [routeConfig],
  (config) => {
    if (config.direction) {
      return config.direction.map(obj => ({
        id: obj.tag,
        title: obj.title,
      }));
    }
    return [];
  },
);

// Get stop list array for 'Stop' autocomplete field
export const getStopList = createSelector(
  routeConfig,
  selectedDirection,
  (config, directionId) => {
    if (directionId) {
      const stopTags =
        config.direction.filter(item => item.tag === directionId)[0].stop.map(item => item.tag);

      return config.stop
        .filter(item => stopTags.some(e => item.tag === e))
        .map(item => ({
          title: item.title,
          id: item.tag,
        }));
    }
    return [];
  },
);
