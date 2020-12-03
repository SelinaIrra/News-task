import {
  call, put, getContext, takeLatest, select, all, delay,
} from 'redux-saga/effects';
import * as actions from './constants';
import { getAllNewSuccess, getNewsByUserSuccess } from './actions';
import {
  getAllApprovedNews, getUserNews,
  createNews as createNewsRequest,
  getAllNews, deleteNews as deleteNewsRequest,
  updateNews as updateNewsRequest,
} from '../../services/api';
import { setLoadingStatus, setErrorMessage } from '../system';
import { userId, userRole } from '../user';

function* getNews({ searchStr }) {
  yield put(setLoadingStatus(true));
  try {
    const ajax = yield getContext('ajax');
    const user = yield select(userId);
    const role = yield select(userRole);
    if (role === 'admin') {
      const response = yield call(ajax,
        ...getAllNews(searchStr));
      yield put(getAllNewSuccess(response.data));
    } else {
      const newsReqParams = getAllApprovedNews(searchStr);
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
    }
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
  yield takeLatest(actions.FILTER_NEWS, ({ searchStr }) => getNews({ searchStr }));
  yield takeLatest(actions.CREATE_NEWS, createNews);
  yield takeLatest(actions.DELETE_NEWS, deleteNews);
  yield takeLatest(actions.UPDATE_NEWS, updateNews);
}
