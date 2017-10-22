// import { isFSA } from 'flux-standard-action';

export const SELECT_ROUTE = 'search/SELECT_ROUTE';
export const SELECT_DIRECTION = 'search/SELECT_DIRECTION';
export const SELECT_STOP = 'search/SELECT_STOP';

export const ADD_TODO = 'search/ADD_TODO';

// FSA compliant - https://github.com/acdlite/flux-standard-action

const makeActionCreator = (type, ...argNames) => (...args) => {
  let action = { type, payload: {} }
  argNames.forEach((arg, index) =>
    action.payload[argNames[index]] = args[index]
  )
  return action
}

export const selectRoute = makeActionCreator(SELECT_ROUTE, 'selected');
export const selectDirection = makeActionCreator(SELECT_DIRECTION, 'selected');
export const selectStop = makeActionCreator(SELECT_STOP, 'selected');


// console.log('selectRoute is FSA', isFSA(selectRoute()));
// console.log('selectDirection is FSA', isFSA(selectDirection()));
// console.log('selectStop is FSA', isFSA(selectStop()));
