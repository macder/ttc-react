import Immutable from 'immutable'
import { createSelector } from 'reselect';

const routeList = state => state.getIn(['searchState', 'data', 'routeList', 'payload']);
const routeConfig = state => state.getIn(['searchState', 'data', 'routeConfig', 'payload']);
const selectedDirection = state => state.getIn(['searchState', 'directionField', 'selected']);
const stopList = state => state.getIn(['searchState', 'data', 'routeConfig', 'payload', 'stop']);

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

    /*return (directions)
      ? new Immutable.OrderedSet(directions.map(Record))
      : */
    if (directions) {
      // console.dir(new Immutable.OrderedSet(directions.map(Record)));
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
    return new Immutable.Map({});
  },
);
