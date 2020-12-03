import {
  call, put, getContext, takeLatest, select, all, delay,
} from 'redux-saga/effects';
import * as actions from './constants';
import { getAllNewSuccess, getNewsByUserSuccess, setLastPage } from './actions';
import {
  getAllApprovedNews, getUserNews,
  createNews as createNewsRequest,
  getAllNews, deleteNews as deleteNewsRequest,
  updateNews as updateNewsRequest,
} from '../../services/api';
import { setLoadingStatus, setErrorMessage } from '../system';
import { userId, userRole } from '../user';
import { ROLES } from '../../constants';

function* getNews({ offset, searchStr }) {
  yield put(setLoadingStatus(true));
  try {
    const ajax = yield getContext('ajax');
    const user = yield select(userId);
    const role = yield select(userRole);
    const items = [];
    if (role === ROLES.ADMIN) {
      const response = yield call(ajax,
        ...getAllNews(searchStr, offset));
      yield put(getAllNewSuccess(response.data, offset));
      items.push(...response.data);
    } else {
      const newsReqParams = getAllApprovedNews(searchStr, offset);
      const requests = [
        call(ajax, ...newsReqParams),
      ];
      if (user) {
        requests.push(
          call(ajax, ...getUserNews(user, searchStr, offset)),
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
    yield put(setLastPage(!items.length));
  } catch (e) {
    yield put(setErrorMessage('Ошибка получения данных'));
  } finally {
    yield put(setLoadingStatus(false));
  }
}

function* crudForNews({
  news, id, title, text, type,
}) {
  yield put(setLoadingStatus(true));
  const user = yield select(userId);
  try {
    const ajax = yield getContext('ajax');
    switch (type) {
      case actions.CREATE_NEWS:
        yield call(ajax,
          ...createNewsRequest(title, text, user));
        break;
      case actions.DELETE_NEWS:
        yield call(ajax,
          ...deleteNewsRequest(id));
        break;
      case actions.UPDATE_NEWS:
        yield call(ajax,
          ...updateNewsRequest(news));
        break;
      default: break;
    }
    yield delay(300);
    yield getNews({});
  } catch (e) {
    if (type === actions.CREATE_NEWS) {
      yield put(setErrorMessage('При сохранении произошла ошибка. '));
    }
    console.error(e);
    yield put(setLoadingStatus(false));
  }
}

export default function* newsSaga() {
  yield takeLatest(actions.GET_NEWS, getNews);
  yield takeLatest(actions.FILTER_NEWS, getNews);
  yield takeLatest(actions.CREATE_NEWS, crudForNews);
  yield takeLatest(actions.DELETE_NEWS, crudForNews);
  yield takeLatest(actions.UPDATE_NEWS, crudForNews);
}
