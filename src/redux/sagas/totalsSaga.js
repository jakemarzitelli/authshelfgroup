import {  takeLatest, call, put } from 'redux-saga/effects';
import { TOTAL_ACTION, setTotals } from '../actions/totalAction';
import axios from 'axios';

function* fetchTotals(action) {
    
    try {
        const totals = yield call(axios, {
            method: 'GET',
            url: '/api/total',
        })

        yield put (setTotals(totals.data));
    
} catch (error) {
      console.log(error);
    }
}

function* addSaga() {
  yield takeLatest(TOTAL_ACTION.FETCH_TOTAL, fetchTotals);
}

export default addSaga;
