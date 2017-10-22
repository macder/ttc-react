import * as t from './actionTypes';

/**
 *
 * @param {object} route.
 * @return {object}
 */
export const selectedRoute = routeTag => ({
  type: t.SELECTED_ROUTE,
  selected: routeTag,
});

/**
 *
 * @param {object} route.
 * @return {object}
 */
export const selectedDirection = directionTag => ({
  type: t.SELECTED_DIRECTION,
  selected: directionTag,
});

/**
 *
 * @param {object} route.
 * @return {object}
 */
export const selectedStop = stop => ({
  type: t.SELECTED_STOP,
  selected: stop,
});
