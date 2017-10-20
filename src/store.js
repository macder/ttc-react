import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './rootReducer';
import { SearchSagas } from './modules/search';

const sagaMiddleware = createSagaMiddleware();
// const Predictions = PredictionsContainer;

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), // eslint-disable-line
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(SearchSagas);
// sagaMiddleware.run(PredictionsSagas);

export default store;
