export const SELECT_ROUTE = 'search/SELECT_ROUTE';
export const SELECT_DIRECTION = 'search/SELECT_DIRECTION';
export const SELECT_STOP = 'search/SELECT_STOP';

export const ADD_TODO = 'search/ADD_TODO';

// TEMP
const makeActionCreator = (type, ...argNames) => (...args) => {
  const action = { type, payload: {} };
  argNames.forEach((arg, index) =>
    action.payload[argNames[index]] = args[index],
  );
  return action;
};

export const selectRoute = makeActionCreator(SELECT_ROUTE, 'selected');
export const selectDirection = makeActionCreator(SELECT_DIRECTION, 'selected');
export const selectStop = makeActionCreator(SELECT_STOP, 'selected');
