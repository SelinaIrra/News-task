import {
  call, put, getContext, takeLatest, select, all, delay,
} from 'redux-saga/effects';
import * as actions from './constants';
import { getAllNewSuccess, getNewsByUserSuccess } from './actions';
import { getAllNews, getUserNews, createNews as createNewsRequest } from '../../services/api';
import { setLoadingStatus, setErrorMessage } from '../system';
import { userId } from '../user';

function* getNews({ searchStr }) {
  yield put(setLoadingStatus(true));
  try {
    const ajax = yield getContext('ajax');
    const user = yield select(userId);
    const newsReqParams = getAllNews(searchStr);
    const requests = [
      call(ajax, ...newsReqParams),
    ];
    if (user) {
      requests.push(
        call(ajax, ...getUserNews(user, searchStr)),
      );
    }
    const response = yield all(requests);
    yield delay(300);
    yield* response.map((responseObj) => {
      const { data } = responseObj;
      if (responseObj.config.url === newsReqParams[1]) {
        return put(getAllNewSuccess(data));
      }
      return put(getNewsByUserSuccess(data));
    });
  } catch (e) {
    yield put(setErrorMessage('Ошибка получения данных'));
  } finally {
    yield put(setLoadingStatus(false));
  }
}

function* createNews({ title, text }) {
  yield put(setLoadingStatus(true));
  try {
    const ajax = yield getContext('ajax');
    const user = yield select(userId);
    yield call(ajax,
      ...createNewsRequest(title, text, user));
    yield delay(300);
    yield getNews({});
  } catch (e) {
    yield put(setErrorMessage('При сохранении произошла ошибка. '));
    yield put(setLoadingStatus(false));
  }
}

export default function* newsSaga() {
  yield takeLatest(actions.GET_NEWS, getNews);
  yield takeLatest(actions.FILTER_NEWS, ({ searchStr }) => getNews({ searchStr }));
  yield takeLatest(actions.CREATE_NEWS, createNews);
}
