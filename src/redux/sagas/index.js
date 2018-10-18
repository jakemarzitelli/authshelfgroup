import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import shelfViewSaga from './shelfViewSaga';
import shelfAddSaga from './shelfAddSaga';
import totalsSaga from './totalsSaga';

export default function* rootSaga() {
  yield all([
    shelfViewSaga(),
    userSaga(),
    loginSaga(),
    // watchIncrementAsync()
    shelfAddSaga(),
    totalsSaga()
  ]);
}
