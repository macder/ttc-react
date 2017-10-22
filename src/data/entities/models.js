import { fromJS, List, Map, OrderedSet, Record } from 'immutable';

export const routeRecord = Record({
  id: '',
  title: '',
});

export const stopRecord = Record({
  id: '',
  title: '',
  lat: '',
  lon: '',
});

export const directionRecord = Record({
  id: '',
  routeId: '',
  title: '',
  name: '',
  stops: new Map(),
});

export const initialEntityState = new Map({
  direction: new Map(),
  route: new Map(),
  stop: new Map(),
});

/**
 * Converts a route entity from map to record
 * @param {Immutable.Map} item
 * @return {Immutable.Record}
 */
const createRouteRecord = item => new routeRecord({
  id: item.get('tag'),
  title: item.get('title'),
});

/**
 * Callback for successfull data fetch for route list
 * Normalizes and converts response data to immutable map
 * @param {array} data Array of route objects
 * @return {Immutable.Map}
 */
export const mapRouteEntities = data => new Map([
  ['byId',
    new Map(fromJS(data.route).map(item =>
      [item.get('tag'), createRouteRecord(item)],
    )),
  ],
]).set('allIds', new List(data.route.map(item => item.tag)));
