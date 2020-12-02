import {
  call, put, getContext, takeLatest, delay,
} from 'redux-saga/effects';
import * as actions from './constants';
import { logInSuccess } from './actions';
import { getUser } from '../../services/api';
import { setLoadingStatus, setErrorMessage } from '../system';

function* login({ name, password }) {
  yield put(setLoadingStatus(true));
  try {
    const ajax = yield getContext('ajax');
    const responseUserData = yield call(
      ajax,
      ...getUser(name, password),
    );
    const { data } = responseUserData;
    yield delay(200);
    if (!data.length) {
      yield put(setErrorMessage('Пользователь не найден. Проверьте правильность введенных данных.'));
    } else yield put(logInSuccess(data[0].id, data[0].login));
  } catch (e) {
    yield put(setErrorMessage('Ajax Error'));
  } finally {
    yield put(setLoadingStatus(false));
  }
}

export default function* userSaga() {
  yield takeLatest(actions.LOG_IN, login);
}
