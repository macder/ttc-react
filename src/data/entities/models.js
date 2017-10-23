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
  stop: new List(),
});

/**
 *
 * @param {Immutable.Map} item
 * @return {Immutable.Record}
 */
const createRouteRecord = item => new routeRecord({
  id: item.get('tag'),
  title: item.get('title'),
});

/**
 *
 * @param {Immutable.Map} item
 * @return {Immutable.Record}
 */
const createStopRecord = item => new stopRecord({
  id: item.get('tag'),
  title: item.get('title'),
  lat: item.get('lat'),
  lon: item.get('lon'),
});

/**
 *
 * @param {Immutable.Map} item
 * @return {Immutable.Record}
 */
const createDirectionRecord = item => new directionRecord({
  id: item.get('tag'),
  title: item.get('title'),
  routeId: item.get('branch'),
  name: item.get('name'),
  stop: new List(item.get('stop').map(item => item.get('tag'))),
});

/**
 * Normalizes and converts to Immutable an entity set
 *  eg. route, stop, direction
 * @param {array} data
 * @param {function} recordCreator
 * @return {Immutable.Map}
 */
const mapEntity = (data, recordCreator) => new Map([
  ['byId',
    new Map(fromJS(data).map(item =>
      [item.get('tag'), recordCreator(item)],
    )),
  ],
]).set('allIds', new List(data.map(item => item.tag)));

/**
 * Called immediately after successful API routeConfig fetch
 * @param {array} data Response payload from remote API
 * @return {Immutable.Map}
 */
export const mapEntitiesFromConfig = data => new Map({
  stop: mapEntity(data.route.stop, createStopRecord),
  direction: mapEntity(data.route.direction, createDirectionRecord),
});

/**
 * Called immediately after successful API routeList fetch
 * @param {array} data Response payload from remote API
 * @return {Immutable.Map}
 */
export const mapRouteEntity = data => mapEntity(data.route, createRouteRecord);
