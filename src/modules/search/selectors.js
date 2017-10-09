import Immutable from 'immutable'
import { createSelector } from 'reselect';

const searchState = state => state.get('searchState');

const routeList = createSelector(
  [searchState],
  (search) => search.getIn(['data', 'routeList', 'payload'])
);

const routeConfig = createSelector(
  [searchState],
  (search) => search.getIn(['data', 'routeConfig', 'payload'])
);

const selectedDirection = createSelector(
  [searchState],
  (search) => search.getIn(['directionField', 'selected'])
);

const stopList = createSelector(
  [searchState],
  (search) => search.getIn(['data', 'routeConfig', 'payload', 'stop'])
);

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
    const Record = new Immutable.Record({
      tag: '',
      title: '',
    });
    const directions = config.get('direction');
    if (directions) {
      return new Immutable.OrderedSet(directions.map(Record));
    }
    return new Immutable.OrderedSet();
  },
);

const getDirectionConfig = createSelector(
  routeConfig,
  selectedDirection,
  (config, directionTag) => {
    if (directionTag) {
      return config.get('direction').find(row =>
        (directionTag == row.get('tag'))
      );
    }
    return new Immutable.Map({});
  }
);

// Get stop list for a routes direction
export const getDirectionStopList = createSelector(
  getDirectionConfig,
  stopList,
  (direction, stopList) => {
    if (direction.get('stop')) {
      const stopTags = direction.get('stop');
      const list = stopTags.map(
        (item, index) => {
          const tag = item.get('tag');
          return stopList
            .find(row => (tag === row.get('tag')) );
        }
      );
      const Record = new Immutable.Record({
        tag: '',
        title: '',
      });
      return new Immutable.OrderedSet(list.map(Record));
    }
    return new Immutable.OrderedSet();
  },
);
