import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import ajax from '../services/axios';
import userSaga from './user/saga';
import newsSaga from './news/saga';
import { userReducer } from './user';
import { systemReducer } from './system';
import { newsReducer } from './news';

export function* rootSaga() {
  yield all([
    fork(userSaga),
    fork(newsSaga),
  ]);
}

export const reducers = combineReducers({
  user: userReducer,
  system: systemReducer,
  news: newsReducer,
});

const middleware = createSagaMiddleware({
  context: { ajax },
});

const store = createStore(reducers, composeWithDevTools(applyMiddleware(middleware)));

middleware.run(rootSaga);

export default store;
