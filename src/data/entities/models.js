import { fromJS, List, Map, OrderedSet, Record } from 'immutable';

export const RouteRecord = Record({
  id: '',
  title: '',
});

export const StopRecord = Record({
  id: '',
  title: '',
  lat: '',
  lon: '',
});

export const DirectionRecord = Record({
  id: '',
  routeId: '',
  title: '',
  name: '',
  useForUI: false,
  stop: new List(),
});

export const PredictionRecord = Record({
  id: '',
  dirId: '',
  affectedByLayover: false,
  epochTime: '',
  isDeparture: false,
  minutes: '',
  seconds: '',
  vehicle: '',
});

export const HttpErrorRecord = Record({
  url: '',
  status: '',
  statusText: '',
  message: '',
  stack: '',
});

/**
 *
 * @param {Immutable.Map} item
 * @return {Immutable.Record}
 */
const createPredictionRecord = item => new PredictionRecord({
  id: item.get('tripTag'),
  dirId: item.get('dirTag'),
  affectedByLayover: !!(item.get('affectedByLayover') === 'true') && true,
  epochTime: item.get('epochTime'),
  isDeparture: !!(item.get('isDeparture') === 'true') && true,
  minutes: item.get('minutes'),
  seconds: item.get('seconds'),
  vehicle: item.get('vehicle'),
});

/**
 *
 * @param {Immutable.Map} item
 * @return {Immutable.Record}
 */
const createRouteRecord = item => new RouteRecord({
  id: item.get('tag'),
  title: item.get('title'),
});

/**
 *
 * @param {Immutable.Map} item
 * @return {Immutable.Record}
 */
const createStopRecord = item => new StopRecord({
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
const createDirectionRecord = item => new DirectionRecord({
  id: item.get('tag'),
  title: item.get('title'),
  routeId: item.get('branch'),
  name: item.get('name'),
  useForUI: !!(item.get('useForUI') === 'true') && true,
  stop: new List(item.get('stop').map(stop => stop.get('tag'))),
});

/**
 *
 * @param {XMLHttpRequest} e
 * @return {Immutable.Record}
 */
const createHttpErrorRecord = e => new HttpErrorRecord({
  url: e.request.responseURL,
  status: e.request.status,
  statusText: e.request.statusText,
  message: e.message,
  stack: e.stack,
});

/**
 * Creates an error record from a XMLHttpRequest object
 * @param {XMLHttpRequest} e
 * @return {Immutable.Record}
 */
export const mapHttpError = e => createHttpErrorRecord(e);

/**
 * Normalizes and converts to Immutable an entity set
 *  eg. route, stop, direction
 * @param {array} data
 * @param {string} idKey Key name from data to use as UID
 * @param {function} recordCreator
 * @return {Immutable.Map}
 */
const mapEntity = (data, idKey, recordCreator) => new Map([
  ['byId',
    new Map(fromJS(data).map(item =>
      [item.get(idKey), recordCreator(item)],
    )),
  ],
]).set('allIds', new List(data.map(item => item[idKey])));

/**
 * Called immediately after successful API routeConfig fetch
 * @param {array} data Response payload from remote API
 * @return {Immutable.Map}
 */
export const mapEntitiesFromConfig = data => new Map({
  stop: mapEntity(data.route.stop, 'tag', createStopRecord),
  direction: mapEntity(data.route.direction, 'tag', createDirectionRecord),
});

/**
 * Called immediately after successful API routeList fetch
 * @param {array} data Response payload from remote API
 * @return {Immutable.Map}
 */
export const mapRouteEntity = data => mapEntity(data.route, 'tag', createRouteRecord);

/**
 *
 * @param {array || object} prediction
 * @return {Immutable.Map}
 */
const mapPredictionEntity = prediction => mapEntity(
  (Array.isArray(prediction)) ? prediction : [prediction], // multi : single
  'tripTag',
  createPredictionRecord,
);

/**
 *
 * @param {array} data
 * @return {array}
 */
const combineMultiDirPredictions = data => data.map(
  item => ((!Array.isArray(item.prediction))
    ? [item.prediction] // single prediction
    : item.prediction // multi predictions
  )).reduce((a, b) => a.concat(b));

/**
 *
 * @param {Immutable.Map} predictionsById
 * @return {Immutable.Map}
 */
const mapPredictionsByDirId = predictionsById =>
  predictionsById
    .map(item => item.dirId)
    .groupBy(item => item)
    .map(item => item.map((x, k) => k).toList())

/**
 * Normalize and make immutable multi dir predictions
 * @param {array} predictions
 * @return {Immutable.Map}
 */
const mapMultiDirPredictions = predictions => {
  const predictionsMap = mapPredictionEntity(
    combineMultiDirPredictions(predictions)
  );
  const withByDirId = predictionsMap.set(
    'byDirId',
    mapPredictionsByDirId(predictionsMap.get('byId'))
  );
  return withByDirId.set(
    'allDirIds',
    withByDirId.get('byDirId').map((item, id) => id).toList()
  );
}

/**
 * Called immediately after successful API predictions fetch
 * @param {array} data Response payload from remote API
 * @return {Immutable.Map || null}
 */
export const mapPredictions = (data) => {
  if (data.predictions.direction) {
    return (Array.isArray(data.predictions.direction))
      ? mapMultiDirPredictions(data.predictions.direction) // multi dir
      : mapPredictionEntity(data.predictions.direction.prediction); // single dir
  }
  return null; // no predictions
};
