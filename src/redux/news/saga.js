import {
  call, put, getContext, takeLatest, select, all, delay,
} from 'redux-saga/effects';
import * as actions from './constants';
import { getAllNewSuccess, getNewsByUserSuccess } from './actions';
import { getAllNews, getUserNews } from '../../services/api';
import { setLoadingStatus, setErrorMessage } from '../system';
import { userId } from '../user';

function* getNews() {
  yield put(setLoadingStatus(true));
  try {
    const ajax = yield getContext('ajax');
    const user = yield select(userId);
    const newsReqParams = getAllNews();
    const requests = [
      call(ajax, ...newsReqParams),
    ];
    if (user) {
      requests.push(
        call(ajax, ...getUserNews(user)),
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
    yield put(setErrorMessage('Ajax Error'));
  } finally {
    yield put(setLoadingStatus(false));
  }
}

export default function* newsSaga() {
  yield takeLatest(actions.GET_NEWS, getNews);
}
