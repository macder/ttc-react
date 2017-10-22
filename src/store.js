import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './rootReducer';
import { PredictionsSagas } from './modules/predictions';
import { entitySagas } from './data/entities';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), // eslint-disable-line
  applyMiddleware(sagaMiddleware),
);

// sagaMiddleware.run(SearchSagas);
// sagaMiddleware.run(PredictionsSagas);
sagaMiddleware.run(entitySagas);

export default store;
