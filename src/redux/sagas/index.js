import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import fetchUser from './shelfViewSaga';

export default function* rootSaga() {
  yield all([
    fetchUser(),
    userSaga(),
    loginSaga(),
    // watchIncrementAsync()
  ]);
}
