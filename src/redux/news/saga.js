import {
  call, put, getContext, takeLatest, select, all, delay,
} from 'redux-saga/effects';
import * as actions from './constants';
import { getAllNewSuccess, getNewsByUserSuccess, setTotalCountOnPage } from './actions';
import {
  getAllApprovedNews, getUserNews,
  createNews as createNewsRequest,
  getAllNews, deleteNews as deleteNewsRequest,
  updateNews as updateNewsRequest,
} from '../../services/api';
import { setLoadingStatus, setErrorMessage } from '../system';
import { userId, userRole } from '../user';

function* getNews({ offset, searchStr }) {
  yield put(setLoadingStatus(true));
  try {
    const ajax = yield getContext('ajax');
    const user = yield select(userId);
    const role = yield select(userRole);
    const items = [];
    if (role === 'admin') {
      const response = yield call(ajax,
        ...getAllNews(offset || 0, searchStr));
      yield put(getAllNewSuccess(response.data, offset));
      items.push(...response.data);
    } else {
      const newsReqParams = getAllApprovedNews(offset || 0, searchStr);
      const requests = [
        call(ajax, ...newsReqParams),
      ];
      if (user) {
        requests.push(
          call(ajax, ...getUserNews(offset || 0, user, searchStr)),
        );
      }
      const response = yield all(requests);
      yield delay(300);
      yield* response.map((responseObj) => {
        const { data } = responseObj;
        items.push(...data);
        if (responseObj.config.url === newsReqParams[1]) {
          return put(getAllNewSuccess(data, offset));
        }
        return put(getNewsByUserSuccess(data, offset));
      });
    }
    yield put(setTotalCountOnPage(!items.length));
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

function* deleteNews({ id }) {
  yield put(setLoadingStatus(true));
  try {
    const ajax = yield getContext('ajax');
    yield call(ajax,
      ...deleteNewsRequest(id));
    yield delay(300);
    yield getNews({});
  } catch (e) {
    yield put(setLoadingStatus(false));
  }
}

function* updateNews({ news }) {
  yield put(setLoadingStatus(true));
  try {
    const ajax = yield getContext('ajax');
    yield call(ajax,
      ...updateNewsRequest(news));
    yield delay(300);
    yield getNews({});
  } catch (e) {
    yield put(setLoadingStatus(false));
  }
}

export default function* newsSaga() {
  yield takeLatest(actions.GET_NEWS, getNews);
  yield takeLatest(actions.FILTER_NEWS, ({ searchStr, offset }) => getNews({ offset, searchStr }));
  yield takeLatest(actions.CREATE_NEWS, createNews);
  yield takeLatest(actions.DELETE_NEWS, deleteNews);
  yield takeLatest(actions.UPDATE_NEWS, updateNews);
}
