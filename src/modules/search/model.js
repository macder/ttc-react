import { fromJS, Map, OrderedSet, Record } from 'immutable';

const routeRecord = Record({
  id: '',
  title: '',
});

const stopRecord = Record({
  id: '',
  title: '',
  lat: '',
  lon: '',
});

const directionRecord = Record({
  id: '',
  routeId: '',
  title: '',
  name: '',
  stops: new Map(),
});

/**
 * Creates a route record from map
 * @param {Immutable.Map}
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
    new Map(fromJS(data).map(item =>
      [item.get('tag'), createRouteRecord(item)],
    )),
  ],
]).set('allIds', new OrderedSet(data.map(item => item.tag)));
