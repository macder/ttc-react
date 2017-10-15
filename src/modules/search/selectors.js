import Immutable from 'immutable';
import { createSelector } from 'reselect';

const searchState = state => state.get('searchState');

const routeList = createSelector(
  [searchState],
  search => search.getIn(['data', 'routeList', 'payload']),
);

const routeConfig = createSelector(
  [searchState],
  search => search.getIn(['data', 'routeConfig', 'payload']),
);

const selectedDirection = createSelector(
  [searchState],
  search => search.getIn(['directionField', 'selected']),
);

const stopList = createSelector(
  [routeConfig],
  config => (config) && config.get('stop'),
);

export const isRouteFieldVisible = createSelector(
  [searchState],
  search => search.getIn(['routeField', 'visible']),
);

export const isDirectionFieldVisible = createSelector(
  [searchState],
  search => search.getIn(['directionField', 'visible']),
);

export const isStopFieldVisible = createSelector(
  [searchState],
  search => search.getIn(['stopField', 'visible']),
);

export const isRouteListFetching = createSelector(
  [searchState],
  search => search.getIn(['data', 'routeList', 'fetching']),
);

export const isRouteConfigFetching = createSelector(
  [searchState],
  search => search.getIn(['data', 'routeConfig', 'fetching']),
);

export const isStopFieldFetching = createSelector(
  selectedDirection,
  isRouteConfigFetching,
  (selectedDirection, isRouteConfigFetching) => {
    const isDirectionSelected = (selectedDirection) && true;
    return (isRouteConfigFetching && isDirectionSelected);
  },
);

// Get selected route
export const getSelectedRoute = createSelector(
  [searchState],
  search => search.getIn(['routeField', 'selected']),
);

// Get route list array for 'Route' autocomplete field
export const getRouteList = createSelector(
  [routeList],
  (list) => {
    const Record = new Immutable.Record({
      key: '',
      value: '',
      text: '',
    });

    return (list) && new Immutable.OrderedSet(list.map((item, index) =>
      new Record({
        key: item.get('tag'),
        value: item.get('tag'),
        text: item.get('title'),
      }),
    ));
  },
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
      key: '',
      value: '',
      text: '',
    });
    return (config) && new Immutable.OrderedSet(config.get('direction').map((item, index) =>
      new Record({
        key: item.get('tag'),
        value: item.get('tag'),
        text: item.get('title'),
      }),
    ));
  },
);

const getDirectionConfig = createSelector(
  routeConfig,
  selectedDirection,
  (config, directionTag) => {
    if (directionTag) {
      return config.get('direction').find(row =>
        (directionTag == row.get('tag')),
      );
    }
    return null;
  },
);

// Get stop list for a routes direction
export const getDirectionStopList = createSelector(
  getDirectionConfig,
  stopList,
  (direction, stopList) => {
    if (direction) {
      if (direction.get('stop')) {
        const stopTags = direction.get('stop');
        const list = stopTags.map(
          (item, index) => {
            const tag = item.get('tag');
            return stopList
              .find(row => (tag === row.get('tag')));
          },
        );
        const Record = new Immutable.Record({
          key: '',
          value: '',
          text: '',
        });
        return new Immutable.OrderedSet(list.map((item, index) =>
          new Record({
            key: item.get('tag'),
            value: item.get('tag'),
            text: item.get('title'),
          }),
        ));
      }
    }
    return null;
  },
);
