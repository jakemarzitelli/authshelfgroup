import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import shelfAddSaga from './shelfAddSaga';


export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    // watchIncrementAsync()
    shelfAddSaga(),
  ]);
}
