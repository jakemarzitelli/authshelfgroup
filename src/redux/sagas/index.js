import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import shelfViewSaga from './shelfViewSaga';
import totalPageSaga from './totalPageSaga';

export default function* rootSaga() {
  yield all([
    shelfViewSaga(),
    userSaga(),
    loginSaga(),
    totalPageSaga()
  ]);
}
